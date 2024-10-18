import isReference, { type NodeWithFieldDefinition } from 'is-reference';
import type MagicString from 'magic-string';
import { BLANK } from '../../utils/blank';
import type { NodeRenderOptions, RenderOptions } from '../../utils/renderHelpers';
import type FunctionScope from '../scopes/FunctionScope';
import type { ObjectPath } from '../utils/PathTracker';
import type LocalVariable from '../variables/LocalVariable';
import type Variable from '../variables/Variable';
import * as NodeType from './NodeType';
import { type ExpressionEntity } from './shared/Expression';
import IdentifierBase from './shared/IdentifierBase';
import type { PatternNode } from './shared/Pattern';
import type { VariableKind } from './shared/VariableKinds';

export type IdentifierWithVariable = Identifier & { variable: Variable };

export default class Identifier extends IdentifierBase implements PatternNode {
	name!: string;
	type!: NodeType.tIdentifier;
	variable: Variable | null = null;

	addExportedVariables(
		variables: Variable[],
		exportNamesByVariable: ReadonlyMap<Variable, readonly string[]>
	): void {
		if (exportNamesByVariable.has(this.variable!)) {
			variables.push(this.variable!);
		}
	}

	bind(): void {
		if (!this.variable && isReference(this, this.parent as NodeWithFieldDefinition)) {
			this.variable = this.scope.findVariable(this.name);
			this.variable.addReference(this);
			this.isVariableReference = true;
		}
	}

	declare(
		kind: VariableKind,
		includedInitPath: ObjectPath,
		init: ExpressionEntity
	): LocalVariable[] {
		let variable: LocalVariable;
		const { treeshake } = this.scope.context.options;
		if (kind === 'parameter') {
			variable = (this.scope as FunctionScope).addParameterDeclaration(this, includedInitPath);
		} else {
			variable = this.scope.addDeclaration(this, this.scope.context, init, includedInitPath, kind);
			if (kind === 'var' && treeshake && treeshake.correctVarValueBeforeDeclaration) {
				// Necessary to make sure the init is deoptimized. We cannot call deoptimizePath here.
				variable.markInitializersForDeoptimization();
			}
		}
		return [(this.variable = variable)];
	}

	markDeclarationReached(): void {
		this.variable!.initReached = true;
	}

	render(
		code: MagicString,
		{ snippets: { getPropertyAccess }, useOriginalName }: RenderOptions,
		{ renderedParentType, isCalleeOfRenderedParent, isShorthandProperty }: NodeRenderOptions = BLANK
	): void {
		if (this.variable) {
			const name = this.variable.getName(getPropertyAccess, useOriginalName);

			if (name !== this.name) {
				code.overwrite(this.start, this.end, name, {
					contentOnly: true,
					storeName: true
				});
				if (isShorthandProperty) {
					code.prependRight(this.start, `${this.name}: `);
				}
			}
			// In strict mode, any variable named "eval" must be the actual "eval" function
			if (
				name === 'eval' &&
				renderedParentType === NodeType.CallExpression &&
				isCalleeOfRenderedParent
			) {
				code.appendRight(this.start, '0, ');
			}
		}
	}
}
