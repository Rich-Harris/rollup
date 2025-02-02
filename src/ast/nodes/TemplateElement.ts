import type { ast } from '../../rollup/types';
import type { TemplateElementParent } from './node-unions';
import type * as NodeType from './NodeType';
import { Flag, isFlagSet, setFlag } from './shared/BitFlags';
import { NodeBase, onlyIncludeSelf } from './shared/Node';

export default class TemplateElement extends NodeBase<ast.TemplateElement> {
	parent!: TemplateElementParent;
	type!: NodeType.tTemplateElement;
	value!: {
		cooked?: string;
		raw: string;
	};

	get tail(): boolean {
		return isFlagSet(this.flags, Flag.tail);
	}
	set tail(value: boolean) {
		this.flags = setFlag(this.flags, Flag.tail, value);
	}

	// Do not try to bind value
	bind(): void {}

	hasEffects(): boolean {
		return false;
	}

	parseNode(esTreeNode: ast.TemplateElement): this {
		this.value = esTreeNode.value;
		return super.parseNode(esTreeNode);
	}

	render(): void {}
}

TemplateElement.prototype.includeNode = onlyIncludeSelf;
