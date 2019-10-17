import { HasEffectsContext, InclusionContext } from '../ExecutionContext';
import * as NodeType from './NodeType';
import { ExpressionNode, IncludeChildren, StatementBase, StatementNode } from './shared/Node';

export default class DoWhileStatement extends StatementBase {
	body!: StatementNode;
	test!: ExpressionNode;
	type!: NodeType.tDoWhileStatement;

	hasEffects(context: HasEffectsContext): boolean {
		if (this.test.hasEffects(context)) return true;
		const {
			breakFlow,
			ignore: { breakAndContinue }
		} = context;
		context.ignore.breakAndContinue = true;
		if (this.body.hasEffects(context)) return true;
		context.ignore.breakAndContinue = breakAndContinue;
		if (context.breakFlow instanceof Set && context.breakFlow.has(null)) {
			context.breakFlow = breakFlow;
		}
		return false;
	}

	include(context: InclusionContext, includeChildrenRecursively: IncludeChildren) {
		this.included = true;
		this.test.include(context, includeChildrenRecursively);
		const { breakFlow } = context;
		this.body.include(context, includeChildrenRecursively);
		if (context.breakFlow instanceof Set && context.breakFlow.has(null)) {
			context.breakFlow = breakFlow;
		}
	}
}
