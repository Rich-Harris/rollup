// This file is generated by scripts/generate-ast-converters.js.
// Do not edit this file directly.

import type * as estree from 'estree';
import type { AstContext } from '../Module';
import { convertAnnotations, convertString } from '../utils/astConverterHelpers';
import { convertNode as convertJsonNode } from '../utils/bufferToAst';
import { FIXED_STRINGS } from '../utils/convert-ast-strings';
import type { ReadString } from '../utils/getReadStringFunction';
import getReadStringFunction from '../utils/getReadStringFunction';
import ArrayExpression from './nodes/ArrayExpression';
import ArrayPattern from './nodes/ArrayPattern';
import ArrowFunctionExpression from './nodes/ArrowFunctionExpression';
import AssignmentExpression from './nodes/AssignmentExpression';
import AssignmentPattern from './nodes/AssignmentPattern';
import AwaitExpression from './nodes/AwaitExpression';
import BinaryExpression from './nodes/BinaryExpression';
import BlockStatement from './nodes/BlockStatement';
import BreakStatement from './nodes/BreakStatement';
import CallExpression from './nodes/CallExpression';
import CatchClause from './nodes/CatchClause';
import ChainExpression from './nodes/ChainExpression';
import ClassBody from './nodes/ClassBody';
import ClassDeclaration from './nodes/ClassDeclaration';
import ClassExpression from './nodes/ClassExpression';
import ConditionalExpression from './nodes/ConditionalExpression';
import ContinueStatement from './nodes/ContinueStatement';
import DebuggerStatement from './nodes/DebuggerStatement';
import DoWhileStatement from './nodes/DoWhileStatement';
import EmptyStatement from './nodes/EmptyStatement';
import ExportAllDeclaration from './nodes/ExportAllDeclaration';
import ExportDefaultDeclaration from './nodes/ExportDefaultDeclaration';
import ExportNamedDeclaration from './nodes/ExportNamedDeclaration';
import ExportSpecifier from './nodes/ExportSpecifier';
import ExpressionStatement from './nodes/ExpressionStatement';
import ForInStatement from './nodes/ForInStatement';
import ForOfStatement from './nodes/ForOfStatement';
import ForStatement from './nodes/ForStatement';
import FunctionDeclaration from './nodes/FunctionDeclaration';
import FunctionExpression from './nodes/FunctionExpression';
import Identifier from './nodes/Identifier';
import IfStatement from './nodes/IfStatement';
import ImportAttribute from './nodes/ImportAttribute';
import ImportDeclaration from './nodes/ImportDeclaration';
import ImportDefaultSpecifier from './nodes/ImportDefaultSpecifier';
import ImportExpression from './nodes/ImportExpression';
import ImportNamespaceSpecifier from './nodes/ImportNamespaceSpecifier';
import ImportSpecifier from './nodes/ImportSpecifier';
import LabeledStatement from './nodes/LabeledStatement';
import Literal from './nodes/Literal';
import LogicalExpression from './nodes/LogicalExpression';
import MemberExpression from './nodes/MemberExpression';
import MetaProperty from './nodes/MetaProperty';
import MethodDefinition from './nodes/MethodDefinition';
import NewExpression from './nodes/NewExpression';
import ObjectExpression from './nodes/ObjectExpression';
import ObjectPattern from './nodes/ObjectPattern';
import PanicError from './nodes/PanicError';
import ParseError from './nodes/ParseError';
import PrivateIdentifier from './nodes/PrivateIdentifier';
import Program from './nodes/Program';
import Property from './nodes/Property';
import PropertyDefinition from './nodes/PropertyDefinition';
import RestElement from './nodes/RestElement';
import ReturnStatement from './nodes/ReturnStatement';
import SequenceExpression from './nodes/SequenceExpression';
import SpreadElement from './nodes/SpreadElement';
import StaticBlock from './nodes/StaticBlock';
import Super from './nodes/Super';
import SwitchCase from './nodes/SwitchCase';
import SwitchStatement from './nodes/SwitchStatement';
import TaggedTemplateExpression from './nodes/TaggedTemplateExpression';
import TemplateElement from './nodes/TemplateElement';
import TemplateLiteral from './nodes/TemplateLiteral';
import ThisExpression from './nodes/ThisExpression';
import ThrowStatement from './nodes/ThrowStatement';
import TryStatement from './nodes/TryStatement';
import UnaryExpression from './nodes/UnaryExpression';
import UpdateExpression from './nodes/UpdateExpression';
import VariableDeclaration from './nodes/VariableDeclaration';
import VariableDeclarator from './nodes/VariableDeclarator';
import WhileStatement from './nodes/WhileStatement';
import YieldExpression from './nodes/YieldExpression';
import { UNKNOWN_EXPRESSION } from './nodes/shared/Expression';
import type { Node, NodeBase } from './nodes/shared/Node';
import type ChildScope from './scopes/ChildScope';
import type ModuleScope from './scopes/ModuleScope';
import TrackingScope from './scopes/TrackingScope';
import type ParameterVariable from './variables/ParameterVariable';

export function convertProgram(
	buffer: Buffer | Uint8Array,
	parent: Node | { context: AstContext; type: string },
	parentScope: ModuleScope
): Program {
	return convertNode(
		parent,
		parentScope,
		0,
		new Uint32Array(buffer.buffer),
		getReadStringFunction(buffer)
	);
}

const nodeTypeStrings = [
	'PanicError',
	'ParseError',
	'ArrayExpression',
	'ArrayPattern',
	'ArrowFunctionExpression',
	'AssignmentExpression',
	'AssignmentPattern',
	'AwaitExpression',
	'BinaryExpression',
	'BlockStatement',
	'BreakStatement',
	'CallExpression',
	'CatchClause',
	'ChainExpression',
	'ClassBody',
	'ClassDeclaration',
	'ClassExpression',
	'ConditionalExpression',
	'ContinueStatement',
	'DebuggerStatement',
	'ExpressionStatement',
	'DoWhileStatement',
	'EmptyStatement',
	'ExportAllDeclaration',
	'ExportDefaultDeclaration',
	'ExportNamedDeclaration',
	'ExportSpecifier',
	'ExpressionStatement',
	'ForInStatement',
	'ForOfStatement',
	'ForStatement',
	'FunctionDeclaration',
	'FunctionExpression',
	'Identifier',
	'IfStatement',
	'ImportAttribute',
	'ImportDeclaration',
	'ImportDefaultSpecifier',
	'ImportExpression',
	'ImportNamespaceSpecifier',
	'ImportSpecifier',
	'LabeledStatement',
	'Literal',
	'Literal',
	'Literal',
	'Literal',
	'Literal',
	'Literal',
	'LogicalExpression',
	'MemberExpression',
	'MetaProperty',
	'MethodDefinition',
	'NewExpression',
	'ObjectExpression',
	'ObjectPattern',
	'PrivateIdentifier',
	'Program',
	'Property',
	'PropertyDefinition',
	'RestElement',
	'ReturnStatement',
	'SequenceExpression',
	'SpreadElement',
	'StaticBlock',
	'Super',
	'SwitchCase',
	'SwitchStatement',
	'TaggedTemplateExpression',
	'TemplateElement',
	'TemplateLiteral',
	'ThisExpression',
	'ThrowStatement',
	'TryStatement',
	'UnaryExpression',
	'UpdateExpression',
	'VariableDeclaration',
	'VariableDeclarator',
	'WhileStatement',
	'YieldExpression'
] as const;

const nodeConstructors: (typeof NodeBase)[] = [
	PanicError,
	ParseError,
	ArrayExpression,
	ArrayPattern,
	ArrowFunctionExpression,
	AssignmentExpression,
	AssignmentPattern,
	AwaitExpression,
	BinaryExpression,
	BlockStatement,
	BreakStatement,
	CallExpression,
	CatchClause,
	ChainExpression,
	ClassBody,
	ClassDeclaration,
	ClassExpression,
	ConditionalExpression,
	ContinueStatement,
	DebuggerStatement,
	ExpressionStatement,
	DoWhileStatement,
	EmptyStatement,
	ExportAllDeclaration,
	ExportDefaultDeclaration,
	ExportNamedDeclaration,
	ExportSpecifier,
	ExpressionStatement,
	ForInStatement,
	ForOfStatement,
	ForStatement,
	FunctionDeclaration,
	FunctionExpression,
	Identifier,
	IfStatement,
	ImportAttribute,
	ImportDeclaration,
	ImportDefaultSpecifier,
	ImportExpression,
	ImportNamespaceSpecifier,
	ImportSpecifier,
	LabeledStatement,
	Literal,
	Literal,
	Literal,
	Literal,
	Literal,
	Literal,
	LogicalExpression,
	MemberExpression,
	MetaProperty,
	MethodDefinition,
	NewExpression,
	ObjectExpression,
	ObjectPattern,
	PrivateIdentifier,
	Program,
	Property,
	PropertyDefinition,
	RestElement,
	ReturnStatement,
	SequenceExpression,
	SpreadElement,
	StaticBlock,
	Super,
	SwitchCase,
	SwitchStatement,
	TaggedTemplateExpression,
	TemplateElement,
	TemplateLiteral,
	ThisExpression,
	ThrowStatement,
	TryStatement,
	UnaryExpression,
	UpdateExpression,
	VariableDeclaration,
	VariableDeclarator,
	WhileStatement,
	YieldExpression
];

const bufferParsers: ((
	node: any,
	position: number,
	buffer: Uint32Array,
	readString: ReadString
) => void)[] = [
	function panicError(node: PanicError, position, buffer, readString) {
		node.message = convertString(position, buffer, readString);
	},
	function parseError(node: ParseError, position, buffer, readString) {
		node.message = convertString(position, buffer, readString);
	},
	function arrayExpression(node: ArrayExpression, position, buffer, readString) {
		const { scope } = node;
		node.elements = convertNodeList(node, scope, position, buffer, readString);
	},
	function arrayPattern(node: ArrayPattern, position, buffer, readString) {
		const { scope } = node;
		node.elements = convertNodeList(node, scope, position, buffer, readString);
	},
	function arrowFunctionExpression(node: ArrowFunctionExpression, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.async = (flags & 1) === 1;
		node.expression = (flags & 2) === 2;
		node.generator = (flags & 4) === 4;
		// TODO Lukas extracted variable
		const parameters = (node.params = convertNodeList(
			node,
			scope,
			buffer[position + 1],
			buffer,
			readString
		));
		// TODO Lukas added in between
		scope.addParameterVariables(
			parameters.map(
				parameter => parameter.declare('parameter', UNKNOWN_EXPRESSION) as ParameterVariable[]
			),
			parameters[parameters.length - 1] instanceof RestElement
		);
		// TODO Lukas different scope
		node.body = convertNode(node, scope.bodyScope, buffer[position + 2], buffer, readString);
		// TODO Lukas extracted variable
		const annotations = (node.annotations = convertAnnotations(position + 3, buffer));
		// TODO Lukas added
		node.annotationNoSideEffects = annotations.some(comment => comment.type === 'noSideEffects');
	},
	function assignmentExpression(node: AssignmentExpression, position, buffer, readString) {
		const { scope } = node;
		node.operator = FIXED_STRINGS[buffer[position]] as estree.AssignmentOperator;
		node.right = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.left = convertNode(node, scope, position + 2, buffer, readString);
	},
	function assignmentPattern(node: AssignmentPattern, position, buffer, readString) {
		const { scope } = node;
		node.right = convertNode(node, scope, buffer[position], buffer, readString);
		node.left = convertNode(node, scope, position + 1, buffer, readString);
	},
	function awaitExpression(node: AwaitExpression, position, buffer, readString) {
		const { scope } = node;
		node.argument = convertNode(node, scope, position, buffer, readString);
	},
	function binaryExpression(node: BinaryExpression, position, buffer, readString) {
		const { scope } = node;
		node.operator = FIXED_STRINGS[buffer[position]] as estree.BinaryOperator;
		node.right = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.left = convertNode(node, scope, position + 2, buffer, readString);
	},
	function blockStatement(node: BlockStatement, position, buffer, readString) {
		const { scope } = node;
		node.body = convertNodeList(node, scope, position, buffer, readString);
	},
	function breakStatement(node: BreakStatement, position, buffer, readString) {
		const { scope } = node;
		const labelPosition = buffer[position];
		node.label =
			labelPosition === 0 ? null : convertNode(node, scope, labelPosition, buffer, readString);
	},
	function callExpression(node: CallExpression, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.optional = (flags & 1) === 1;
		node.callee = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.arguments = convertNodeList(node, scope, buffer[position + 2], buffer, readString);
		node.annotations = convertAnnotations(position + 3, buffer);
	},
	function catchClause(node: CatchClause, position, buffer, readString) {
		const { scope } = node;
		const parameterPosition = buffer[position];
		// TODO Lukas extracted parameter
		const parameter = (node.param =
			parameterPosition === 0
				? null
				: convertNode(node, scope, parameterPosition, buffer, readString));
		// TODO Lukas additional line
		parameter?.declare('parameter', UNKNOWN_EXPRESSION);
		// TODO Lukas different scope
		node.body = convertNode(node, scope.bodyScope, buffer[position + 1], buffer, readString);
	},
	function chainExpression(node: ChainExpression, position, buffer, readString) {
		const { scope } = node;
		node.expression = convertNode(node, scope, position, buffer, readString);
	},
	function classBody(node: ClassBody, position, buffer, readString) {
		const { scope } = node;
		// TODO Lukas provide different scope for static definitions
		const length = buffer[position++];
		const body: (MethodDefinition | PropertyDefinition)[] = (node.body = []);
		for (let index = 0; index < length; index++) {
			const nodePosition = buffer[position++];
			body.push(
				nodePosition
					? convertNode(
							node,
							// TODO Lukas ensure that the static flag is always at the same position, first would be better
							(buffer[nodePosition + 3] & 2) === 0 ? scope.instanceScope : scope,
							nodePosition,
							buffer,
							readString
						)
					: null
			);
		}
	},
	function classDeclaration(node: ClassDeclaration, position, buffer, readString) {
		const { scope } = node;
		const idPosition = buffer[position];
		// TODO Lukas different scope
		node.id =
			idPosition === 0
				? null
				: convertNode(node, scope.parent as ChildScope, idPosition, buffer, readString);
		const superClassPosition = buffer[position + 1];
		node.superClass =
			superClassPosition === 0
				? null
				: convertNode(node, scope, superClassPosition, buffer, readString);
		node.body = convertNode(node, scope, buffer[position + 2], buffer, readString);
	},
	function classExpression(node: ClassExpression, position, buffer, readString) {
		const { scope } = node;
		const idPosition = buffer[position];
		node.id = idPosition === 0 ? null : convertNode(node, scope, idPosition, buffer, readString);
		const superClassPosition = buffer[position + 1];
		node.superClass =
			superClassPosition === 0
				? null
				: convertNode(node, scope, superClassPosition, buffer, readString);
		node.body = convertNode(node, scope, buffer[position + 2], buffer, readString);
	},
	function conditionalExpression(node: ConditionalExpression, position, buffer, readString) {
		const { scope } = node;
		node.consequent = convertNode(node, scope, buffer[position], buffer, readString);
		node.alternate = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.test = convertNode(node, scope, position + 2, buffer, readString);
	},
	function continueStatement(node: ContinueStatement, position, buffer, readString) {
		const { scope } = node;
		const labelPosition = buffer[position];
		node.label =
			labelPosition === 0 ? null : convertNode(node, scope, labelPosition, buffer, readString);
	},
	function debuggerStatement() {},
	function directive(node: ExpressionStatement, position, buffer, readString) {
		const { scope } = node;
		node.expression = convertNode(node, scope, buffer[position], buffer, readString);
		node.directive = convertString(position + 1, buffer, readString);
	},
	function doWhileStatement(node: DoWhileStatement, position, buffer, readString) {
		const { scope } = node;
		node.test = convertNode(node, scope, buffer[position], buffer, readString);
		node.body = convertNode(node, scope, position + 1, buffer, readString);
	},
	function emptyStatement() {},
	function exportAllDeclaration(node: ExportAllDeclaration, position, buffer, readString) {
		const { scope } = node;
		const exportedPosition = buffer[position];
		node.exported =
			exportedPosition === 0
				? null
				: convertNode(node, scope, exportedPosition, buffer, readString);
		node.source = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.attributes = convertNodeList(node, scope, buffer[position + 2], buffer, readString);
	},
	function exportDefaultDeclaration(node: ExportDefaultDeclaration, position, buffer, readString) {
		const { scope } = node;
		node.declaration = convertNode(node, scope, position, buffer, readString);
	},
	function exportNamedDeclaration(node: ExportNamedDeclaration, position, buffer, readString) {
		const { scope } = node;
		const sourcePosition = buffer[position];
		node.source =
			sourcePosition === 0 ? null : convertNode(node, scope, sourcePosition, buffer, readString);
		node.attributes = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
		const declarationPosition = buffer[position + 2];
		node.declaration =
			declarationPosition === 0
				? null
				: convertNode(node, scope, declarationPosition, buffer, readString);
		node.specifiers = convertNodeList(node, scope, position + 3, buffer, readString);
	},
	function exportSpecifier(node: ExportSpecifier, position, buffer, readString) {
		const { scope } = node;
		const exportedPosition = buffer[position];
		node.local = convertNode(node, scope, position + 1, buffer, readString);
		node.exported =
			exportedPosition === 0
				? node.local
				: convertNode(node, scope, exportedPosition, buffer, readString);
	},
	function expressionStatement(node: ExpressionStatement, position, buffer, readString) {
		const { scope } = node;
		node.expression = convertNode(node, scope, position, buffer, readString);
	},
	function forInStatement(node: ForInStatement, position, buffer, readString) {
		const { scope } = node;
		node.right = convertNode(node, scope, buffer[position], buffer, readString);
		node.body = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.left = convertNode(node, scope, position + 2, buffer, readString);
	},
	function forOfStatement(node: ForOfStatement, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.await = (flags & 1) === 1;
		node.right = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.body = convertNode(node, scope, buffer[position + 2], buffer, readString);
		node.left = convertNode(node, scope, position + 3, buffer, readString);
	},
	function forStatement(node: ForStatement, position, buffer, readString) {
		const { scope } = node;
		const initPosition = buffer[position];
		node.init =
			initPosition === 0 ? null : convertNode(node, scope, initPosition, buffer, readString);
		const testPosition = buffer[position + 1];
		node.test =
			testPosition === 0 ? null : convertNode(node, scope, testPosition, buffer, readString);
		const updatePosition = buffer[position + 2];
		node.update =
			updatePosition === 0 ? null : convertNode(node, scope, updatePosition, buffer, readString);
		node.body = convertNode(node, scope, buffer[position + 3], buffer, readString);
	},
	function functionDeclaration(node: FunctionDeclaration, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.async = (flags & 1) === 1;
		node.generator = (flags & 2) === 2;
		const idPosition = buffer[position + 1];
		// TODO Lukas different scope
		node.id =
			idPosition === 0
				? null
				: convertNode(node, scope.parent as ChildScope, idPosition, buffer, readString);
		// TODO Lukas extracted variable
		const parameters = (node.params = convertNodeList(
			node,
			scope,
			buffer[position + 2],
			buffer,
			readString
		));
		// TODO Lukas added in between
		scope.addParameterVariables(
			parameters.map(
				parameter => parameter.declare('parameter', UNKNOWN_EXPRESSION) as ParameterVariable[]
			),
			parameters[parameters.length - 1] instanceof RestElement
		);
		// TODO Lukas different scope
		node.body = convertNode(node, scope.bodyScope, buffer[position + 3], buffer, readString);
		// TODO Lukas extracted variable
		const annotations = (node.annotations = convertAnnotations(position + 4, buffer));
		// TODO Lukas added
		node.annotationNoSideEffects = annotations.some(comment => comment.type === 'noSideEffects');
	},
	function functionExpression(node: FunctionExpression, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.async = (flags & 1) === 1;
		node.generator = (flags & 2) === 2;
		const idPosition = buffer[position + 1];
		// TODO Lukas different scope
		node.id =
			idPosition === 0 ? null : convertNode(node, node.idScope, idPosition, buffer, readString);
		// TODO Lukas extracted variable
		const parameters = (node.params = convertNodeList(
			node,
			scope,
			buffer[position + 2],
			buffer,
			readString
		));
		// TODO Lukas added in between
		scope.addParameterVariables(
			parameters.map(
				parameter => parameter.declare('parameter', UNKNOWN_EXPRESSION) as ParameterVariable[]
			),
			parameters[parameters.length - 1] instanceof RestElement
		);
		// TODO Lukas different scope
		node.body = convertNode(node, scope.bodyScope, buffer[position + 3], buffer, readString);
		// TODO Lukas extracted variable
		const annotations = (node.annotations = convertAnnotations(position + 4, buffer));
		// TODO Lukas added
		node.annotationNoSideEffects = annotations.some(comment => comment.type === 'noSideEffects');
	},
	function identifier(node: Identifier, position, buffer, readString) {
		node.name = convertString(position, buffer, readString);
	},
	function ifStatement(node: IfStatement, position, buffer, readString) {
		const { scope } = node;
		// TODO Lukas different scope
		node.consequent = convertNode(
			node,
			(node.consequentScope = new TrackingScope(scope)),
			buffer[position],
			buffer,
			readString
		);
		// TODO Lukas different scope
		const alternatePosition = buffer[position + 1];
		node.alternate =
			alternatePosition === 0
				? null
				: convertNode(
						node,
						(node.alternateScope = new TrackingScope(scope)),
						alternatePosition,
						buffer,
						readString
					);
		node.test = convertNode(node, scope, position + 2, buffer, readString);
	},
	function importAttribute(node: ImportAttribute, position, buffer, readString) {
		const { scope } = node;
		node.value = convertNode(node, scope, buffer[position], buffer, readString);
		node.key = convertNode(node, scope, position + 1, buffer, readString);
	},
	function importDeclaration(node: ImportDeclaration, position, buffer, readString) {
		const { scope } = node;
		// TODO Lukas inject estree-parser here for node.sourceAstNode
		node.source = convertNode(node, scope, buffer[position], buffer, readString);
		node.attributes = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
		node.specifiers = convertNodeList(node, scope, position + 2, buffer, readString);
	},
	function importDefaultSpecifier(node: ImportDefaultSpecifier, position, buffer, readString) {
		const { scope } = node;
		node.local = convertNode(node, scope, position, buffer, readString);
	},
	function importExpression(node: ImportExpression, position, buffer, readString) {
		const { scope } = node;
		const optionsPosition = buffer[position];
		node.options =
			optionsPosition === 0 ? null : convertNode(node, scope, optionsPosition, buffer, readString);
		node.source = convertNode(node, scope, position + 1, buffer, readString);
		// TODO Lukas additional line for source
		node.sourceAstNode = convertJsonNode(position + 1, buffer, readString);
	},
	function importNamespaceSpecifier(node: ImportNamespaceSpecifier, position, buffer, readString) {
		const { scope } = node;
		node.local = convertNode(node, scope, position, buffer, readString);
	},
	function importSpecifier(node: ImportSpecifier, position, buffer, readString) {
		const { scope } = node;
		const importedPosition = buffer[position];
		node.local = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.imported =
			importedPosition === 0
				? node.local
				: convertNode(node, scope, importedPosition, buffer, readString);
	},
	function labeledStatement(node: LabeledStatement, position, buffer, readString) {
		const { scope } = node;
		node.body = convertNode(node, scope, buffer[position], buffer, readString);
		node.label = convertNode(node, scope, position + 1, buffer, readString);
	},
	function literalBigInt(node: Literal, position, buffer, readString) {
		node.raw = convertString(buffer[position], buffer, readString);
		const bigint = (node.bigint = convertString(position + 1, buffer, readString));
		node.value = BigInt(bigint);
	},
	function literalBoolean(node: Literal, position, buffer) {
		const flags = buffer[position];
		const value = (node.value = (flags & 1) === 1);
		node.raw = value ? 'true' : 'false';
	},
	function literalNull(node: Literal) {
		// TODO Lukas missing fixed value to distinguish literal
		node.value = null;
	},
	function literalNumber(node: Literal, position, buffer, readString) {
		const rawPosition = buffer[position];
		node.raw = rawPosition === 0 ? undefined : convertString(rawPosition, buffer, readString);
		node.value = new DataView(buffer.buffer).getFloat64((position + 1) << 2, true);
	},
	function literalRegExp(node: Literal, position, buffer, readString) {
		const pattern = convertString(buffer[position], buffer, readString);
		const flags = convertString(position + 1, buffer, readString);
		node.raw = `/${pattern}/${flags}`;
		node.regex = { flags, pattern };
		node.value = new RegExp(pattern, flags);
	},
	function literalString(node: Literal, position, buffer, readString) {
		const rawPosition = buffer[position];
		node.raw = rawPosition === 0 ? undefined : convertString(rawPosition, buffer, readString);
		node.value = convertString(position + 1, buffer, readString);
	},
	function logicalExpression(node: LogicalExpression, position, buffer, readString) {
		const { scope } = node;
		node.operator = FIXED_STRINGS[buffer[position]] as estree.LogicalOperator;
		node.right = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.left = convertNode(node, scope, position + 2, buffer, readString);
	},
	function memberExpression(node: MemberExpression, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.computed = (flags & 1) === 1;
		node.optional = (flags & 2) === 2;
		node.property = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.object = convertNode(node, scope, position + 2, buffer, readString);
	},
	function metaProperty(node: MetaProperty, position, buffer, readString) {
		const { scope } = node;
		node.property = convertNode(node, scope, buffer[position], buffer, readString);
		node.meta = convertNode(node, scope, position + 1, buffer, readString);
	},
	function methodDefinition(node: MethodDefinition, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.computed = (flags & 1) === 1;
		node.static = (flags & 2) === 2;
		node.value = convertNode(node, scope, buffer[position + 1], buffer, readString);
		node.kind = FIXED_STRINGS[buffer[position + 2]] as estree.MethodDefinition['kind'];
		node.key = convertNode(node, scope, position + 3, buffer, readString);
	},
	function newExpression(node: NewExpression, position, buffer, readString) {
		const { scope } = node;
		node.callee = convertNode(node, scope, buffer[position], buffer, readString);
		node.arguments = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
		node.annotations = convertAnnotations(position + 2, buffer);
	},
	function objectExpression(node: ObjectExpression, position, buffer, readString) {
		const { scope } = node;
		node.properties = convertNodeList(node, scope, position, buffer, readString);
	},
	function objectPattern(node: ObjectPattern, position, buffer, readString) {
		const { scope } = node;
		node.properties = convertNodeList(node, scope, position, buffer, readString);
	},
	function privateIdentifier(node: PrivateIdentifier, position, buffer, readString) {
		node.name = convertString(position, buffer, readString);
	},
	function program(node: Program, position, buffer, readString) {
		const { scope } = node;
		node.invalidAnnotations = convertAnnotations(buffer[position], buffer);
		node.body = convertNodeList(node, scope, position + 1, buffer, readString);
	},
	function property(node: Property, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.method = (flags & 1) === 1;
		node.shorthand = (flags & 2) === 2;
		node.computed = (flags & 4) === 4;
		const keyPosition = buffer[position + 1];
		node.value = convertNode(node, scope, buffer[position + 2], buffer, readString);
		node.kind = FIXED_STRINGS[buffer[position + 3]] as estree.Property['kind'];
		node.key =
			keyPosition === 0 ? node.value : convertNode(node, scope, keyPosition, buffer, readString);
	},
	function propertyDefinition(node: PropertyDefinition, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.computed = (flags & 1) === 1;
		node.static = (flags & 2) === 2;
		const valuePosition = buffer[position + 1];
		node.value =
			valuePosition === 0 ? null : convertNode(node, scope, valuePosition, buffer, readString);
		node.key = convertNode(node, scope, position + 2, buffer, readString);
	},
	function restElement(node: RestElement, position, buffer, readString) {
		const { scope } = node;
		node.argument = convertNode(node, scope, position, buffer, readString);
	},
	function returnStatement(node: ReturnStatement, position, buffer, readString) {
		const { scope } = node;
		const argumentPosition = buffer[position];
		node.argument =
			argumentPosition === 0
				? null
				: convertNode(node, scope, argumentPosition, buffer, readString);
	},
	function sequenceExpression(node: SequenceExpression, position, buffer, readString) {
		const { scope } = node;
		node.expressions = convertNodeList(node, scope, position, buffer, readString);
	},
	function spreadElement(node: SpreadElement, position, buffer, readString) {
		const { scope } = node;
		node.argument = convertNode(node, scope, position, buffer, readString);
	},
	function staticBlock(node: StaticBlock, position, buffer, readString) {
		const { scope } = node;
		node.body = convertNodeList(node, scope, position, buffer, readString);
	},
	function superElement() {},
	function switchCase(node: SwitchCase, position, buffer, readString) {
		const { scope } = node;
		const testPosition = buffer[position];
		node.test =
			testPosition === 0 ? null : convertNode(node, scope, testPosition, buffer, readString);
		node.consequent = convertNodeList(node, scope, buffer[position + 1], buffer, readString);
	},
	function switchStatement(node: SwitchStatement, position, buffer, readString) {
		const { scope } = node;
		node.cases = convertNodeList(node, scope, buffer[position], buffer, readString);
		// TODO Lukas different scope
		node.discriminant = convertNode(node, node.parentScope, position + 1, buffer, readString);
	},
	function taggedTemplateExpression(node: TaggedTemplateExpression, position, buffer, readString) {
		const { scope } = node;
		node.quasi = convertNode(node, scope, buffer[position], buffer, readString);
		node.tag = convertNode(node, scope, position + 1, buffer, readString);
	},
	function templateElement(node: TemplateElement, position, buffer, readString) {
		const flags = buffer[position];
		node.tail = (flags & 1) === 1;
		const cookedPosition = buffer[position + 1];
		const cooked =
			cookedPosition === 0 ? undefined : convertString(cookedPosition, buffer, readString);
		const raw = convertString(position + 2, buffer, readString);
		node.value = { cooked, raw };
	},
	function templateLiteral(node: TemplateLiteral, position, buffer, readString) {
		const { scope } = node;
		node.expressions = convertNodeList(node, scope, buffer[position], buffer, readString);
		node.quasis = convertNodeList(node, scope, position + 1, buffer, readString);
	},
	function thisExpression() {},
	function throwStatement(node: ThrowStatement, position, buffer, readString) {
		const { scope } = node;
		node.argument = convertNode(node, scope, position, buffer, readString);
	},
	function tryStatement(node: TryStatement, position, buffer, readString) {
		const { scope } = node;
		const handlerPosition = buffer[position];
		node.handler =
			handlerPosition === 0 ? null : convertNode(node, scope, handlerPosition, buffer, readString);
		const finalizerPosition = buffer[position + 1];
		node.finalizer =
			finalizerPosition === 0
				? null
				: convertNode(node, scope, finalizerPosition, buffer, readString);
		node.block = convertNode(node, scope, position + 2, buffer, readString);
	},
	function unaryExpression(node: UnaryExpression, position, buffer, readString) {
		const { scope } = node;
		node.operator = FIXED_STRINGS[buffer[position]] as estree.UnaryOperator;
		node.argument = convertNode(node, scope, position + 1, buffer, readString);
	},
	function updateExpression(node: UpdateExpression, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.prefix = (flags & 1) === 1;
		node.operator = FIXED_STRINGS[buffer[position + 1]] as estree.UpdateOperator;
		node.argument = convertNode(node, scope, position + 2, buffer, readString);
	},
	function variableDeclaration(node: VariableDeclaration, position, buffer, readString) {
		const { scope } = node;
		node.kind = FIXED_STRINGS[buffer[position]] as estree.VariableDeclaration['kind'];
		node.declarations = convertNodeList(node, scope, position + 1, buffer, readString);
	},
	function variableDeclarator(node: VariableDeclarator, position, buffer, readString) {
		const { scope } = node;
		const initPosition = buffer[position];
		node.init =
			initPosition === 0 ? null : convertNode(node, scope, initPosition, buffer, readString);
		node.id = convertNode(node, scope, position + 1, buffer, readString);
	},
	function whileStatement(node: WhileStatement, position, buffer, readString) {
		const { scope } = node;
		node.body = convertNode(node, scope, buffer[position], buffer, readString);
		node.test = convertNode(node, scope, position + 1, buffer, readString);
	},
	function yieldExpression(node: YieldExpression, position, buffer, readString) {
		const { scope } = node;
		const flags = buffer[position];
		node.delegate = (flags & 1) === 1;
		const argumentPosition = buffer[position + 1];
		node.argument =
			argumentPosition === 0
				? null
				: convertNode(node, scope, argumentPosition, buffer, readString);
	}
];

function convertNode(
	parent: Node | { context: AstContext; type: string },
	parentScope: ChildScope,
	position: number,
	buffer: Uint32Array,
	readString: ReadString
): any {
	const nodeType = buffer[position];
	const NodeConstructor = nodeConstructors[nodeType];
	/* istanbul ignore if: This should never be executed but is a safeguard against faulty buffers */
	if (!NodeConstructor) {
		console.trace();
		throw new Error(`Unknown node type: ${nodeType}`);
	}
	const node = new NodeConstructor(parent, parentScope);
	node.type = nodeTypeStrings[nodeType];
	node.start = buffer[position + 1];
	node.end = buffer[position + 2];
	bufferParsers[nodeType](node, position + 3, buffer, readString);
	node.initialise();
	return node;
}

function convertNodeList(
	parent: Node | { context: AstContext; type: string },
	parentScope: ChildScope,
	position: number,
	buffer: Uint32Array,
	readString: ReadString
): any[] {
	const length = buffer[position++];
	const list: any[] = [];
	for (let index = 0; index < length; index++) {
		const nodePosition = buffer[position++];
		list.push(
			nodePosition ? convertNode(parent, parentScope, nodePosition, buffer, readString) : null
		);
	}
	return list;
}
