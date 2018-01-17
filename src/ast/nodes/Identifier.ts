import { Node, NodeBase } from './shared/Node';
import isReference from 'is-reference';
import { UNKNOWN_EXPRESSION } from '../values';
import Scope from '../scopes/Scope';
import ExecutionPathOptions from '../ExecutionPathOptions';
import Variable from '../variables/Variable';
import CallOptions from '../CallOptions';
import FunctionScope from '../scopes/FunctionScope';
import MagicString from 'magic-string';
import Property from './Property';
import { ObjectPath } from '../variables/VariableReassignmentTracker';
import { ExpressionEntity, ForEachReturnExpressionCallback, SomeReturnExpressionCallback } from './shared/Expression';
import { NodeType } from './index';
import ExportNamedDeclaration from './ExportNamedDeclaration';
import ExternalModule from '../../ExternalModule';
import { RenderOptions } from '../../rollup';

export function isIdentifier (node: Node): node is Identifier {
	return node.type === NodeType.Identifier;
}

export default class Identifier extends NodeBase {
	type: NodeType.Identifier;
	name: string;

	variable: Variable;
	private isBound: boolean;

	bindNode () {
		if (isReference(this, this.parent)) {
			this.variable = this.scope.findVariable(this.name);
			this.variable.addReference(this);
		}
	}

	forEachReturnExpressionWhenCalledAtPath (
		path: ObjectPath,
		callOptions: CallOptions,
		callback: ForEachReturnExpressionCallback,
		options: ExecutionPathOptions
	) {
		if (!this.isBound) this.bind();
		this.variable &&
		this.variable.forEachReturnExpressionWhenCalledAtPath(
			path,
			callOptions,
			callback,
			options
		);
	}

	hasEffectsWhenAccessedAtPath (path: ObjectPath, options: ExecutionPathOptions): boolean {
		return (
			this.variable && this.variable.hasEffectsWhenAccessedAtPath(path, options)
		);
	}

	hasEffectsWhenAssignedAtPath (path: ObjectPath, options: ExecutionPathOptions): boolean {
		return (
			!this.variable ||
			this.variable.hasEffectsWhenAssignedAtPath(path, options)
		);
	}

	hasEffectsWhenCalledAtPath (path: ObjectPath, callOptions: CallOptions, options: ExecutionPathOptions) {
		return (
			!this.variable ||
			this.variable.hasEffectsWhenCalledAtPath(path, callOptions, options)
		);
	}

	includeInBundle () {
		if (this.included) return false;
		this.included = true;
		const x = this.module.imports[this.name];
		if (x) {
			if (x.name === '*' && x.module instanceof ExternalModule && !this.variable && x.specifier.parent instanceof NodeBase) {
				x.specifier.parent.includeInBundle();
			} else {
				x.specifier.includeInBundle();
			}
		}
		const y = this.module.reexports[this.name];
		if (y && !y.module.isExternal) {
			y.module.ast.body.forEach(node => {
				if (node instanceof ExportNamedDeclaration) {
					node.specifiers.forEach(specifier => {
						if (specifier.exported.name === y.localName) {
							specifier.includeInBundle();
						}
					});
				} else if (y.localName === 'default' && node.type === 'ExportDefaultDeclaration') {
					node.includeInBundle();
				}
			});
		}
		this.variable && this.variable.includeVariable();
		return true;
	}

	initialiseAndDeclare (parentScope: Scope, kind: string, init: ExpressionEntity | null) {
		this.initialiseScope(parentScope);
		switch (kind) {
			case 'var':
			case 'function':
				this.variable = this.scope.addDeclaration(this, {
					isHoisted: true,
					init
				});
				break;
			case 'let':
			case 'const':
			case 'class':
				this.variable = this.scope.addDeclaration(this, { init });
				break;
			case 'parameter':
				this.variable = (<FunctionScope>this.scope).addParameterDeclaration(this);
				break;
			default:
				throw new Error(`Unexpected identifier kind ${kind}.`);
		}
	}

	reassignPath (path: ObjectPath, options: ExecutionPathOptions) {
		if (!this.isBound) this.bind();
		if (this.variable) {
			if (path.length === 0) this.disallowImportReassignment();
			this.variable.reassignPath(path, options);
		}
	}

	private disallowImportReassignment () {
		if (this.module.imports[this.name] && !this.scope.contains(this.name)) {
			this.module.error(
				{
					code: 'ILLEGAL_REASSIGNMENT',
					message: `Illegal reassignment to import '${this.name}'`
				},
				this.start
			);
		}
	}

	render (code: MagicString, es: boolean, options: RenderOptions) {
		if (options.preserveModules) {
			return;
		}

		if (this.variable) {
			const name = this.variable.getName(es);
			if (name !== this.name) {
				code.overwrite(this.start, this.end, name, {
					storeName: true,
					contentOnly: false
				});

				// special case
				if (this.parent.type === NodeType.Property && (<Property>this.parent).shorthand) {
					code.appendLeft(this.start, `${this.name}: `);
				}
			}
		}
	}

	someReturnExpressionWhenCalledAtPath (
		path: ObjectPath,
		callOptions: CallOptions,
		predicateFunction: SomeReturnExpressionCallback,
		options: ExecutionPathOptions
	) {
		if (this.variable) {
			return this.variable.someReturnExpressionWhenCalledAtPath(
				path,
				callOptions,
				predicateFunction,
				options
			);
		}
		return predicateFunction(options)(UNKNOWN_EXPRESSION);
	}
}
