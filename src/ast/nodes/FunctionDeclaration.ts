import type ChildScope from '../scopes/ChildScope';
import type Variable from '../variables/Variable';
import Identifier, { type IdentifierWithVariable } from './Identifier';
import type * as NodeType from './NodeType';
import FunctionNode from './shared/FunctionNode';
import type { GenericEsTreeNode } from './shared/Node';

export default class FunctionDeclaration extends FunctionNode {
	declare type: NodeType.tFunctionDeclaration;

	initialise(): void {
		super.initialise();
		if (this.id !== null) {
			this.id.variable.isId = true;
		}
	}

	getDeclarationVariable(): Variable | null {
		return super.getDeclarationVariable() ?? this.id?.variable ?? null;
	}

	parseNode(esTreeNode: GenericEsTreeNode): this {
		if (esTreeNode.id !== null) {
			this.id = new Identifier(this, this.scope.parent as ChildScope).parseNode(
				esTreeNode.id
			) as IdentifierWithVariable;
		}
		return super.parseNode(esTreeNode);
	}
}
