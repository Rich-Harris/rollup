import MagicString from 'magic-string';
import { dirname, normalize, relative } from '../../utils/path';
import { PluginDriver } from '../../utils/pluginDriver';
import { RenderOptions } from '../../utils/renderHelpers';
import Identifier from './Identifier';
import Literal from './Literal';
import MemberExpression from './MemberExpression';
import * as NodeType from './NodeType';
import { NodeBase } from './shared/Node';

const getResolveUrl = (path: string, URL: string = 'URL') => `new ${URL}(${path}).href`;

const amdModuleUrl = `(typeof process !== 'undefined' && process.versions && process.versions.node ? 'file:' : '') + module.uri`;

const globalRelUrlMechanism = (relPath: string) => {
	return getResolveUrl(
		`(typeof document !== 'undefined' ? document.currentScript && document.currentScript.src || document.baseURI : 'file:' + __filename) + '/../${relPath}'`,
		`(typeof URL !== 'undefined' ? URL : require('ur'+'l').URL)`
	);
};

const relUrlMechanisms: Record<string, (relPath: string) => string> = {
	amd: (relPath: string) => getResolveUrl(`${amdModuleUrl} + '/../${relPath}'`),
	cjs: (relPath: string) =>
		getResolveUrl(
			`(process.browser ? '' : 'file:') + __dirname + '/${relPath}', process.browser && document.baseURI`,
			`(typeof URL !== 'undefined' ? URL : require('ur'+'l').URL)`
		),
	es: (relPath: string) => getResolveUrl(`'../${relPath}', import.meta.url`),
	iife: globalRelUrlMechanism,
	system: (relPath: string) => getResolveUrl(`'../${relPath}', module.url`),
	umd: globalRelUrlMechanism
};

export default class MetaProperty extends NodeBase {
	meta: Identifier;
	property: Identifier;
	rendered: boolean;
	type: NodeType.tMetaProperty;

	initialise() {
		if (this.meta.name === 'import') {
			this.rendered = false;
			this.context.addImportMeta(this);
		}
		this.included = false;
	}

	render(code: MagicString, options: RenderOptions) {
		if (this.meta.name === 'import') this.rendered = true;
		super.render(code, options);
	}

	renderFinalMechanism(
		code: MagicString,
		chunkId: string,
		format: string,
		pluginDriver: PluginDriver
	): boolean {
		if (!this.included || !(this.parent instanceof MemberExpression)) return false;

		const parent = this.parent;

		let importMetaProperty: string;
		if (parent.property instanceof Identifier) importMetaProperty = parent.property.name;
		else if (parent.property instanceof Literal && typeof parent.property.value === 'string')
			importMetaProperty = parent.property.value;
		else return false;

		// support import.meta.ROLLUP_ASSET_URL_[ID]
		if (importMetaProperty.startsWith('ROLLUP_ASSET_URL_')) {
			const assetFileName = this.context.getAssetFileName(importMetaProperty.substr(17));
			const relPath = normalize(relative(dirname(chunkId), assetFileName));
			code.overwrite(parent.start, parent.end, relUrlMechanisms[format](relPath));
			return true;
		}

		if (importMetaProperty === 'url') {
			const replacement = pluginDriver.hookFirstSync<string | void>('resolveImportMetaUrl', [
				{
					chunkId,
					format,
					moduleId: this.context.module.id
				}
			]);
			if (typeof replacement === 'string') {
				code.overwrite(parent.start, parent.end, replacement);
			}
			return true;
		}

		return false;
	}
}
