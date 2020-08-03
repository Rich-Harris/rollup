import ChildScope from '../ast/scopes/ChildScope';
import ExportDefaultVariable from '../ast/variables/ExportDefaultVariable';
import SyntheticNamedExportVariable from '../ast/variables/SyntheticNamedExportVariable';
import Variable from '../ast/variables/Variable';
import Chunk from '../Chunk';
import ExternalModule from '../ExternalModule';
import Module from '../Module';
import { InternalModuleFormat } from '../rollup/types';
import { getSafeName } from './safeName';

export interface DependenciesToBeDeconflicted {
	deconflictedDefault: Set<ExternalModule>;
	deconflictedNamespace: Set<ExternalModule>;
	dependencies: Set<ExternalModule | Chunk>;
}

const DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT: {
	[format in InternalModuleFormat]: (
		usedNames: Set<string>,
		imports: Set<Variable>,
		dependenciesToBeDeconflicted: DependenciesToBeDeconflicted,
		interop: boolean,
		preserveModules: boolean,
		chunkByModule: Map<Module, Chunk>,
		syntheticExports: Set<SyntheticNamedExportVariable>
	) => void;
} = {
	amd: deconflictImportsOther,
	cjs: deconflictImportsOther,
	es: deconflictImportsEsmOrSystem,
	iife: deconflictImportsOther,
	system: deconflictImportsEsmOrSystem,
	umd: deconflictImportsOther
};

export function deconflictChunk(
	modules: Module[],
	dependenciesToBeDeconflicted: DependenciesToBeDeconflicted,
	imports: Set<Variable>,
	usedNames: Set<string>,
	format: InternalModuleFormat,
	interop: boolean,
	preserveModules: boolean,
	chunkByModule: Map<Module, Chunk>,
	syntheticExports: Set<SyntheticNamedExportVariable>,
	exportNamesByVariable: Map<Variable, string[]>,
	accessedGlobalsByScope: Map<ChildScope, Set<string>>
) {
	for (const module of modules) {
		module.scope.addUsedOutsideNames(
			usedNames,
			format,
			exportNamesByVariable,
			accessedGlobalsByScope
		);
	}
	deconflictTopLevelVariables(usedNames, modules);
	DECONFLICT_IMPORTED_VARIABLES_BY_FORMAT[format](
		usedNames,
		imports,
		dependenciesToBeDeconflicted,
		interop,
		preserveModules,
		chunkByModule,
		syntheticExports
	);

	for (const module of modules) {
		module.scope.deconflict(format, exportNamesByVariable, accessedGlobalsByScope);
	}
}

function deconflictImportsEsmOrSystem(
	usedNames: Set<string>,
	imports: Set<Variable>,
	dependenciesToBeDeconflicted: DependenciesToBeDeconflicted,
	_interop: boolean,
	_preserveModules: boolean,
	_chunkByModule: Map<Module, Chunk>,
	syntheticExports: Set<SyntheticNamedExportVariable>
) {
	// All namespace imports are contained here;
	// this is needed for synthetic exports and namespace reexports
	for (const dependency of dependenciesToBeDeconflicted.dependencies) {
		dependency.variableName = getSafeName(dependency.suggestedVariableName, usedNames);
	}
	for (const variable of imports) {
		const module = variable.module;
		const name = variable.name;
		if (module instanceof ExternalModule && name === '*') {
			variable.setRenderNames(null, module.variableName);
		} else if (module instanceof ExternalModule && name === 'default') {
			variable.setRenderNames(
				null,
				getSafeName(
					[...module.exportedVariables].some(
						([variable, name]) => name === '*' && variable.included
					)
						? module.suggestedVariableName + '__default'
						: module.suggestedVariableName,
					usedNames
				)
			);
		} else {
			variable.setRenderNames(null, getSafeName(name, usedNames));
		}
	}
	for (const variable of syntheticExports) {
		variable.setRenderNames(null, getSafeName(variable.name, usedNames));
	}
}

function deconflictImportsOther(
	usedNames: Set<string>,
	imports: Set<Variable>,
	{ deconflictedDefault, deconflictedNamespace, dependencies }: DependenciesToBeDeconflicted,
	interop: boolean,
	preserveModules: boolean,
	chunkByModule: Map<Module, Chunk>
) {
	for (const chunkOrExternalModule of dependencies) {
		chunkOrExternalModule.variableName = getSafeName(
			chunkOrExternalModule.suggestedVariableName,
			usedNames
		);
	}
	for (const externalModule of deconflictedDefault) {
		externalModule.defaultVariableName = getSafeName(
			`${externalModule.suggestedVariableName}__default`,
			usedNames
		);
	}
	for (const externalModule of deconflictedNamespace) {
		externalModule.namespaceVariableName = getSafeName(
			`${externalModule.suggestedVariableName}__ns`,
			usedNames
		);
	}
	for (const variable of imports) {
		const module = variable.module;
		if (module instanceof ExternalModule) {
			const name = variable.name;
			if (name === 'default' && interop) {
				variable.setRenderNames(module.defaultVariableName, 'default');
			} else if (name === '*' && interop) {
				variable.setRenderNames(null, module.namespaceVariableName);
			} else if (name === '*' || name === 'default') {
				variable.setRenderNames(null, module.variableName);
			} else {
				variable.setRenderNames(module.variableName, null);
			}
		} else {
			const chunk = chunkByModule.get(module!)!;
			if (chunk.exportMode === 'default' || (preserveModules && variable.isNamespace)) {
				variable.setRenderNames(null, chunk.variableName);
			} else {
				variable.setRenderNames(
					chunk.variableName,
					chunk.getVariableExportName(variable) as string | null
				);
			}
		}
	}
}

function deconflictTopLevelVariables(usedNames: Set<string>, modules: Module[]) {
	for (const module of modules) {
		for (const variable of module.scope.variables.values()) {
			if (
				variable.included &&
				// this will only happen for exports in some formats
				!(
					variable.renderBaseName ||
					(variable instanceof ExportDefaultVariable && variable.getOriginalVariable() !== variable)
				)
			) {
				variable.setRenderNames(null, getSafeName(variable.name, usedNames));
			}
		}
		const namespace = module.namespace;
		if (namespace.included) {
			namespace.setRenderNames(null, getSafeName(namespace.name, usedNames));
		}
	}
}
