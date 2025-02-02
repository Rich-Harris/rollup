import type { ast } from '../../rollup/types';
import type Identifier from './Identifier';
import type Literal from './Literal';
import type { ExportSpecifierParent } from './node-unions';
import type * as NodeType from './NodeType';
import { doNotDeoptimize, NodeBase, onlyIncludeSelfNoDeoptimize } from './shared/Node';

export default class ExportSpecifier extends NodeBase<ast.ExportSpecifier> {
	parent!: ExportSpecifierParent;
	exported!: Identifier | Literal<string>;
	local!: Identifier | Literal<string>;
	type!: NodeType.tExportSpecifier;
}

ExportSpecifier.prototype.includeNode = onlyIncludeSelfNoDeoptimize;
ExportSpecifier.prototype.applyDeoptimizations = doNotDeoptimize;
