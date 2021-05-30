import { NormalizedTreeshakingOptions } from '../../rollup/types';
import { NO_ARGS } from '../CallOptions';
import { HasEffectsContext, InclusionContext } from '../ExecutionContext';
import ArrowFunctionExpression from './ArrowFunctionExpression';
import * as NodeType from './NodeType';
import FunctionNode from './shared/FunctionNode';
import { ExpressionNode, IncludeChildren, Node, NodeBase } from './shared/Node';

export default class AwaitExpression extends NodeBase {
	argument!: ExpressionNode;
	type!: NodeType.tAwaitExpression;

	hasEffects(context: HasEffectsContext): boolean {
		const { propertyReadSideEffects } = this.context.options
			.treeshake as NormalizedTreeshakingOptions;
		return (
			!context.ignore.returnAwaitYield ||
			this.argument.hasEffects(context) ||
			this.argument.hasEffectsWhenCalledAtPath(
				['then'],
				{ args: NO_ARGS, thisParam: null, withNew: false },
				context
			) ||
			(propertyReadSideEffects &&
				(propertyReadSideEffects === 'always' ||
					this.argument.hasEffectsWhenAccessedAtPath(['then'], context)))
		);
	}

	include(context: InclusionContext, includeChildrenRecursively: IncludeChildren): void {
		if (!this.included) {
			this.included = true;
			checkTopLevelAwait: if (!this.context.usesTopLevelAwait) {
				let parent = this.parent;
				do {
					if (parent instanceof FunctionNode || parent instanceof ArrowFunctionExpression)
						break checkTopLevelAwait;
				} while ((parent = (parent as Node).parent as Node));
				this.context.usesTopLevelAwait = true;
			}
		}
		this.argument.include(context, includeChildrenRecursively);
	}
}
