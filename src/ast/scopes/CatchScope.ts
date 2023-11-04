import type { AstContext } from '../../Module';
import type Identifier from '../nodes/Identifier';
import type { ExpressionEntity } from '../nodes/shared/Expression';
import type { VariableKind } from '../nodes/shared/VariableKinds';
import { UNDEFINED_EXPRESSION } from '../values';
import type LocalVariable from '../variables/LocalVariable';
import ParameterScope from './ParameterScope';

export default class CatchScope extends ParameterScope {
	addDeclaration(
		identifier: Identifier,
		context: AstContext,
		init: ExpressionEntity,
		kind: VariableKind
	): LocalVariable {
		const existingParameter = this.variables.get(identifier.name) as LocalVariable;
		if (existingParameter) {
			// TODO Lukas also re-use the variable here
			// While we still create a hoisted declaration, the initializer goes to
			// the parameter. Note that technically, the declaration now belongs to
			// two variables, which is not correct but should not cause issues.
			this.parent.addDeclaration(identifier, context, UNDEFINED_EXPRESSION, kind);
			existingParameter.addDeclaration(identifier, init);
			return existingParameter;
		}
		return this.parent.addDeclaration(identifier, context, init, kind);
	}
}
