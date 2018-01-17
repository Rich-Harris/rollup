import { timeEnd, timeStart } from './utils/flushTime';
import first from './utils/first';
import { blank, keys } from './utils/object';
import Module, { IdMap, ModuleJSON } from './Module';
import ExternalModule from './ExternalModule';
import ensureArray from './utils/ensureArray';
import { load, makeOnwarn, resolveId, missingExport } from './utils/defaults';
import { mapSequence } from './utils/promise';
import transform from './utils/transform';
import relativeId from './utils/relativeId';
import error from './utils/error';
import { isRelative, resolve } from './utils/path';
import GlobalScope from './ast/scopes/GlobalScope';
import {
	InputOptions,
	IsExternalHook,
	Plugin,
	ResolveIdHook,
	RollupWarning,
	SourceDescription,
	TreeshakingOptions,
	WarningHandler,
	MissingExportHook
} from './rollup/index';
import { RawSourceMap } from 'source-map';
import Program from './ast/nodes/Program';
import { Node } from './ast/nodes/shared/Node';
import Bundle from './Bundle';
import firstSync from './utils/first-sync';

export type ResolveDynamicImportHandler = (specifier: string | Node, parentId: string) => Promise<string | void>;

export default class Graph {
	acornOptions: any;
	cachedModules: Map<string, ModuleJSON>;
	context: string;
	dynamicImport: boolean;
	externalModules: ExternalModule[];
	getModuleContext: (id: string) => string;
	hasLoaders: boolean;
	includeAllNamespacedInternal: boolean;
	includeNamespaceConflicts: boolean;
	isExternal: IsExternalHook;
	isPureExternalModule: (id: string) => boolean;
	legacy: boolean;
	load: (id: string) => Promise<SourceDescription | string | void>;
	missingExport: MissingExportHook;
	moduleById: Map<string, Module | ExternalModule>;
	modules: Module[];
	onwarn: WarningHandler;
	plugins: Plugin[];
	preserveSymlinks: boolean;
	resolveDynamicImport: ResolveDynamicImportHandler;
	resolveId: (id: string, parent: string) => Promise<string | boolean | void>;
	scope: GlobalScope;
	treeshakingOptions: TreeshakingOptions;
	varOrConst: 'var' | 'const';

	dependsOn: { [id: string]: { [id: string]: boolean } };
	stronglyDependsOn: { [id: string]: { [id: string]: boolean } };

	// deprecated
	treeshake: boolean;

	constructor (options: InputOptions) {
		this.cachedModules = new Map();
		if (options.cache) {
			options.cache.modules.forEach(module => {
				this.cachedModules.set(module.id, module);
			});
		}
		delete options.cache; // TODO not deleting it here causes a memory leak; needs further investigation

		this.plugins = ensureArray(options.plugins);

		options = this.plugins.reduce((acc, plugin) => {
			if (plugin.options) return plugin.options(acc) || acc;
			return acc;
		}, options);

		if (!options.input) {
			throw new Error('You must supply options.input to rollup');
		}

		this.treeshake = options.treeshake !== false;
		if (this.treeshake) {
			this.treeshakingOptions = {
				propertyReadSideEffects: options.treeshake
					? (<TreeshakingOptions>options.treeshake).propertyReadSideEffects !== false
					: true,
				pureExternalModules: options.treeshake
					? (<TreeshakingOptions>options.treeshake).pureExternalModules
					: false
			};
			if (this.treeshakingOptions.pureExternalModules === true) {
				this.isPureExternalModule = () => true;
			} else if (
				typeof this.treeshakingOptions.pureExternalModules === 'function'
			) {
				this.isPureExternalModule = this.treeshakingOptions.pureExternalModules;
			} else if (Array.isArray(this.treeshakingOptions.pureExternalModules)) {
				const pureExternalModules = new Set(
					this.treeshakingOptions.pureExternalModules
				);
				this.isPureExternalModule = id => pureExternalModules.has(id);
			} else {
				this.isPureExternalModule = () => false;
			}
		} else {
			this.isPureExternalModule = () => false;
		}

		this.resolveId = first(
			[((id: string, parentId: string) => (this.isExternal(id, parentId, false) ? false : null)) as ResolveIdHook]
				.concat(this.plugins.map(plugin => plugin.resolveId).filter(Boolean))
				.concat(resolveId)
		);

		const loaders = this.plugins.map(plugin => plugin.load).filter(Boolean);
		this.hasLoaders = loaders.length !== 0;
		this.load = first(loaders.concat(load));

		this.missingExport = firstSync(
			this.plugins.map(plugin => plugin.missingExport).filter(Boolean)
				.concat(missingExport)
		);

		this.scope = new GlobalScope();

		// TODO strictly speaking, this only applies with non-ES6, non-default-only bundles
		['module', 'exports', '_interopDefault'].forEach(name => {
			this.scope.findVariable(name); // creates global variable as side-effect
		});

		this.moduleById = new Map();
		this.modules = [];
		this.externalModules = [];

		this.context = String(options.context);

		const optionsModuleContext = options.moduleContext;
		if (typeof optionsModuleContext === 'function') {
			this.getModuleContext = id => optionsModuleContext(id) || this.context;
		} else if (typeof optionsModuleContext === 'object') {
			const moduleContext = new Map();
			Object.keys(optionsModuleContext).forEach(key => moduleContext.set(resolve(key), optionsModuleContext[key]));
			this.getModuleContext = id => moduleContext.get(id) || this.context;
		} else {
			this.getModuleContext = () => this.context;
		}

		if (typeof options.external === 'function') {
			this.isExternal = options.external;
		} else {
			const ids = ensureArray(options.external);
			this.isExternal = id => ids.indexOf(id) !== -1;
		}

		this.onwarn = options.onwarn || makeOnwarn();

		this.varOrConst = options.preferConst ? 'const' : 'var';
		this.legacy = options.legacy;
		this.acornOptions = options.acorn || {};
		this.dynamicImport = typeof options.experimentalDynamicImport === 'boolean' ? options.experimentalDynamicImport : false;

		if (this.dynamicImport) {
			this.resolveDynamicImport = first([
				...this.plugins.map(plugin => plugin.resolveDynamicImport).filter(Boolean),
				<ResolveDynamicImportHandler> ((specifier, parentId) => typeof specifier === 'string' && this.resolveId(specifier, parentId))
			]);
			this.acornOptions.plugins = this.acornOptions.plugins || {};
			this.acornOptions.plugins.dynamicImport = true;
		}

		this.preserveSymlinks = options.preserveSymlinks;
		this.includeAllNamespacedInternal = options.includeAllNamespacedInternal;
		this.includeNamespaceConflicts = options.includeNamespaceConflicts;
	}

	private loadModule (entryName: string) {
		return this.resolveId(entryName, undefined)
			.then(id => {
				if (id === false) {
					error({
						code: 'UNRESOLVED_ENTRY',
						message: `Entry module cannot be external`
					});
				}

				if (id == null) {
					error({
						code: 'UNRESOLVED_ENTRY',
						message: `Could not resolve entry (${entryName})`
					});
				}

				return this.fetchModule(<string>id, undefined);
			});
	}

	private link () {
		this.stronglyDependsOn = blank();
		this.dependsOn = blank();

		this.modules.forEach(module => {
			module.linkDependencies();
			this.stronglyDependsOn[module.id] = blank();
			this.dependsOn[module.id] = blank();
		});

		this.modules.forEach(module => {
			const processStrongDependency = (dependency: Module) => {
				if (
					dependency === module ||
					this.stronglyDependsOn[module.id][dependency.id]
				)
					return;

				this.stronglyDependsOn[module.id][dependency.id] = true;
				dependency.strongDependencies.forEach(processStrongDependency);
			};

			const processDependency = (dependency: Module) => {
				if (dependency === module || this.dependsOn[module.id][dependency.id])
					return;

				this.dependsOn[module.id][dependency.id] = true;
				dependency.dependencies.forEach(processDependency);
			};

			module.strongDependencies.forEach(processStrongDependency);
			module.dependencies.forEach(processDependency);
		});
	}

	buildSingle (entryModuleId: string): Promise<Bundle> {
		// Phase 1 – discovery. We load the entry module and find which
		// modules it imports, and import those, until we have all
		// of the entry module's dependencies
		timeStart('phase 1');
		return this.loadModule(entryModuleId)
			.then(entryModule => {
				timeEnd('phase 1');

				// Phase 2 - linking. We populate the module dependency links
				// including linking binding references between modules. We also
				// determine the topological execution order for the bundle
				timeStart('phase 2');

				this.link();
				const { orderedModules, dynamicImports } = this.analyseExecution(entryModule);
				dynamicImports.forEach(dynamicImportModule => {
					if (orderedModules.indexOf(dynamicImportModule) === -1)
						orderedModules.push(dynamicImportModule);
				});
				const bundle = new Bundle(this, orderedModules);

				timeEnd('phase 2');

				// Phase 3 – marking. We include all statements that should be included
				timeStart('phase 3');

				// mark all export statements for the entry module and dynamic import modules
				bundle.bind();

				entryModule.markExports();
				dynamicImports.forEach(dynamicImportModule => {
					dynamicImportModule.markExports();
					dynamicImportModule.namespace().includeVariable();
				});

				// only include statements that should appear in the bundle
				bundle.includeMarked(this.treeshake);

				// check for unused external imports
				this.externalModules.forEach(module => module.warnUnusedImports());

				timeEnd('phase 3');

				// Phase 4 – we ensure that names are deconflicted throughout the bundle

				timeStart('phase 4');

				bundle.setOutputFacade(entryModule);
				bundle.processExternals();
				bundle.deconflict();

				timeEnd('phase 4');

				return bundle;
			});
	}

	private analyseExecution (entryModule: Module) {
		let hasCycles = false, curEntry: Module;
		const seen: { [id: string]: Module } = {};
		const ordered: Module[] = [];

		const dynamicImports: Module[] = [];

		const visit = (module: Module) => {
			const seenEntry = seen[module.id];
			if (seenEntry) {
				if (seenEntry === curEntry)
					hasCycles = true;
				return;
			}

			seen[module.id] = curEntry;

			module.dependencies.forEach(visit);
			if (this.dynamicImport) {
				module.dynamicImportResolutions.forEach(module => {
					if (module instanceof Module)
						dynamicImports.push(module);
				});
			}

			ordered.push(module);
		};

		curEntry = entryModule;
		visit(entryModule);

		for (let i = 0; i < dynamicImports.length; i++) {
			curEntry = dynamicImports[i];
			visit(curEntry);
		}

		if (hasCycles) {
			this.warnCycle(ordered, [entryModule]);
		}

		return { orderedModules: ordered, dynamicImports };
	}

	private warnCycle (ordered: Module[], entryModules: Module[]) {
		ordered.forEach((a, i) => {
			for (i += 1; i < ordered.length; i += 1) {
				const b = ordered[i];

				// TODO reinstate this! it no longer works
				if (this.stronglyDependsOn[a.id][b.id]) {
					// somewhere, there is a module that imports b before a. Because
					// b imports a, a is placed before b. We need to find the module
					// in question, so we can provide a useful error message
					let parent = '[[unknown]]';
					const visited: { [id: string]: boolean } = {};

					const findParent = (module: Module) => {
						if (this.dependsOn[module.id][a.id] && this.dependsOn[module.id][b.id]) {
							parent = module.id;
							return true;
						}
						visited[module.id] = true;
						for (let i = 0; i < module.dependencies.length; i += 1) {
							const dependency = module.dependencies[i];
							if (!visited[dependency.id] && findParent(<Module>dependency))
								return true;
						}
					};

					for (let entryModule of entryModules)
						findParent(entryModule);

					this.onwarn(
						<any>`Module ${a.id} may be unable to evaluate without ${
							b.id
							}, but is included first due to a cyclical dependency. Consider swapping the import statements in ${parent} to ensure correct ordering`
					);
				}
			}
		});
	}

	private fetchModule (id: string, importer: string): Promise<Module> {
		// short-circuit cycles
		const existingModule = this.moduleById.get(id);
		if (existingModule) {
			if (existingModule.isExternal)
				throw new Error(`Cannot fetch external module ${id}`);
			return Promise.resolve(<Module>existingModule);
		}
		this.moduleById.set(id, null);

		return this.load(id)
			.catch((err: Error) => {
				let msg = `Could not load ${id}`;
				if (importer) msg += ` (imported by ${importer})`;

				msg += `: ${err.message}`;
				throw new Error(msg);
			})
			.then(source => {
				if (typeof source === 'string') return source;
				if (source && typeof source === 'object' && source.code) return source;

				// TODO report which plugin failed
				error({
					code: 'BAD_LOADER',
					message: `Error loading ${relativeId(
						id
					)}: plugin load hook should return a string, a { code, map } object, or nothing/null`
				});
			})
			.then(source => {
				const sourceDescription: SourceDescription = typeof source === 'string' ? {
					code: source,
					ast: null
				} : source;

				if (
					this.cachedModules.has(id) &&
					this.cachedModules.get(id).originalCode === sourceDescription.code
				) {
					return this.cachedModules.get(id);
				}

				return transform(this, sourceDescription, id, this.plugins);
			})
			.then((source: {
				code: string,
				originalCode: string,
				originalSourcemap: RawSourceMap,
				ast: Program,
				sourcemapChain: RawSourceMap[],
				resolvedIds?: IdMap
			}) => {
				const {
					code,
					originalCode,
					originalSourcemap,
					ast,
					sourcemapChain,
					resolvedIds
				} = source;

				const module: Module = new Module({
					id,
					code,
					originalCode,
					originalSourcemap,
					ast,
					sourcemapChain,
					resolvedIds,
					graph: this
				});

				this.modules.push(module);
				this.moduleById.set(id, module);

				return this.fetchAllDependencies(module).then(() => {
					keys(module.exports).forEach(name => {
						if (name !== 'default') {
							module.exportsAll[name] = module.id;
						}
					});
					module.exportAllSources.forEach(source => {
						const id =
							module.resolvedIds[source] || module.resolvedExternalIds[source];
						const exportAllModule = this.moduleById.get(id);
						if (exportAllModule.isExternal) return;

						keys((<Module>exportAllModule).exportsAll).forEach(name => {
							if (!this.includeNamespaceConflicts && name in module.exportsAll) {
								this.warn({
									code: 'NAMESPACE_CONFLICT',
									reexporter: module.id,
									name,
									sources: [
										module.exportsAll[name],
										(<Module>exportAllModule).exportsAll[name]
									],
									message: `Conflicting namespaces: ${relativeId(
										module.id
									)} re-exports '${name}' from both ${relativeId(
										module.exportsAll[name]
									)} and ${relativeId(
										(<Module>exportAllModule).exportsAll[name]
									)} (will be ignored)`
								});
							} else {
								module.exportsAll[name] = (<Module>exportAllModule).exportsAll[name];
							}
						});
					});
					return module;
				});
			});
	}

	private fetchAllDependencies (module: Module) {
		// resolve and fetch dynamic imports where possible
		const fetchDynamicImportsPromise = !this.dynamicImport ? Promise.resolve() : Promise.all(
			module.getDynamicImportExpressions()
			.map((dynamicImportExpression, index) => {
				return Promise.resolve(this.resolveDynamicImport(dynamicImportExpression, module.id))
				.then(replacement => {
					if (!replacement) {
						module.dynamicImportResolutions[index] = null;
					} else if (typeof dynamicImportExpression !== 'string') {
						module.dynamicImportResolutions[index] = replacement;
					} else if (this.isExternal(replacement, module.id, true)) {
						if (!this.moduleById.has(replacement)) {
							const module = new ExternalModule({ graph: this, id: replacement });
							this.externalModules.push(module);
							this.moduleById.set(replacement, module);
						}

						const externalModule = <ExternalModule>this.moduleById.get(replacement);
						module.dynamicImportResolutions[index] = externalModule;
						externalModule.exportsNamespace = true;
					} else {
						return this.fetchModule(replacement, module.id)
						.then(depModule => {
							module.dynamicImportResolutions[index] = depModule;
						});
					}
				})
			})
		)
		.then(() => {});
		fetchDynamicImportsPromise.catch(() => {});

		return mapSequence(module.sources, source => {
			const resolvedId = module.resolvedIds[source];
			return (resolvedId
					? Promise.resolve(resolvedId)
					: this.resolveId(source, module.id)
			).then(resolvedId => {
				// TODO types of `resolvedId` are not compatable with 'externalId'.
				// `this.resolveId` returns `string`, `void`, and `boolean`
				const externalId = <string>resolvedId || (isRelative(source) ? resolve(module.id, '..', source) : source);
				let isExternal = this.isExternal(externalId, module.id, true);

				if (!resolvedId && !isExternal) {
					if (isRelative(source)) {
						error({
							code: 'UNRESOLVED_IMPORT',
							message: `Could not resolve '${source}' from ${relativeId(
								module.id
							)}`
						});
					}

					if (resolvedId !== false) {
						this.warn({
							code: 'UNRESOLVED_IMPORT',
							source,
							importer: relativeId(module.id),
							message: `'${source}' is imported by ${relativeId(
								module.id
							)}, but could not be resolved – treating it as an external dependency`,
							url:
								'https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency'
						});
					}
					isExternal = true;
				}

				if (isExternal) {
					module.resolvedExternalIds[source] = externalId;

					if (!this.moduleById.has(externalId)) {
						const module = new ExternalModule({ graph: this, id: externalId });
						this.externalModules.push(module);
						this.moduleById.set(externalId, module);
					}

					const externalModule = this.moduleById.get(externalId);

					// add external declarations so we can detect which are never used
					Object.keys(module.imports).forEach(name => {
						const importDeclaration = module.imports[name];
						if (importDeclaration.source !== source) return;

						externalModule.traceExport(importDeclaration.name);
					});
				} else {
					module.resolvedIds[source] = <string>resolvedId;
					return this.fetchModule(<string>resolvedId, module.id);
				}
			});
		})
		.then(() => fetchDynamicImportsPromise);
	}

	warn (warning: RollupWarning) {
		warning.toString = () => {
			let str = '';

			if (warning.plugin) str += `(${warning.plugin} plugin) `;
			if (warning.loc)
				str += `${relativeId(warning.loc.file)} (${warning.loc.line}:${
					warning.loc.column
					}) `;
			str += warning.message;

			return str;
		};

		this.onwarn(warning);
	}
}
