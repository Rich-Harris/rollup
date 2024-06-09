// This file is generated by scripts/generate-buffer-to-ast.js.
// Do not edit this file directly.

import type * as estree from 'estree';
import { PanicError, ParseError } from '../ast/nodes/NodeType';
import type { RollupAstNode } from '../rollup/types';
import { EMPTY_ARRAY } from '../utils/blank';
import type { RollupAnnotation } from './astConverterHelpers';
import {
	ANNOTATION_KEY,
	convertAnnotations,
	convertString,
	INVALID_ANNOTATION_KEY
} from './astConverterHelpers';
import FIXED_STRINGS from './convert-ast-strings';
import type { ReadString } from './getReadStringFunction';
import { error, getRollupError, logParseError } from './logs';

export function convertProgram(buffer: ArrayBuffer, readString: ReadString): ProgramNode {
	const node = convertNode(0, new Uint32Array(buffer), readString);
	switch (node.type) {
		case PanicError: {
			return error(getRollupError(logParseError(node.message)));
		}
		case ParseError: {
			return error(getRollupError(logParseError(node.message, node.start)));
		}
		default: {
			return node;
		}
	}
}

/* eslint-disable sort-keys */
const nodeConverters: ((position: number, buffer: Uint32Array, readString: ReadString) => any)[] = [
	function panicError(position, buffer, readString): PanicErrorNode {
		const message = convertString(buffer[position + 2], buffer, readString);
		return {
			type: 'PanicError',
			start: buffer[position],
			end: buffer[position + 1],
			message
		};
	},
	function parseError(position, buffer, readString): ParseErrorNode {
		const message = convertString(buffer[position + 2], buffer, readString);
		return {
			type: 'ParseError',
			start: buffer[position],
			end: buffer[position + 1],
			message
		};
	},
	function arrayExpression(position, buffer, readString): ArrayExpressionNode {
		const elements = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'ArrayExpression',
			start: buffer[position],
			end: buffer[position + 1],
			elements
		};
	},
	function arrayPattern(position, buffer, readString): ArrayPatternNode {
		const elements = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'ArrayPattern',
			start: buffer[position],
			end: buffer[position + 1],
			elements
		};
	},
	function arrowFunctionExpression(position, buffer, readString): ArrowFunctionExpressionNode {
		const flags = buffer[position + 2];
		const async = (flags & 1) === 1;
		const expression = (flags & 2) === 2;
		const generator = (flags & 4) === 4;
		const annotations = convertAnnotations(buffer[position + 3], buffer);
		const parameters = convertNodeList(buffer[position + 4], buffer, readString);
		const body = convertNode(buffer[position + 5], buffer, readString);
		return {
			type: 'ArrowFunctionExpression',
			start: buffer[position],
			end: buffer[position + 1],
			async,
			expression,
			generator,
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			params: parameters,
			body,
			id: null
		};
	},
	function assignmentExpression(position, buffer, readString): AssignmentExpressionNode {
		const operator = FIXED_STRINGS[buffer[position + 2]] as estree.AssignmentOperator;
		const left = convertNode(buffer[position + 3], buffer, readString);
		const right = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'AssignmentExpression',
			start: buffer[position],
			end: buffer[position + 1],
			operator,
			left,
			right
		};
	},
	function assignmentPattern(position, buffer, readString): AssignmentPatternNode {
		const left = convertNode(buffer[position + 2], buffer, readString);
		const right = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'AssignmentPattern',
			start: buffer[position],
			end: buffer[position + 1],
			left,
			right
		};
	},
	function awaitExpression(position, buffer, readString): AwaitExpressionNode {
		const argument = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'AwaitExpression',
			start: buffer[position],
			end: buffer[position + 1],
			argument
		};
	},
	function binaryExpression(position, buffer, readString): BinaryExpressionNode {
		const operator = FIXED_STRINGS[buffer[position + 2]] as estree.BinaryOperator;
		const left = convertNode(buffer[position + 3], buffer, readString);
		const right = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'BinaryExpression',
			start: buffer[position],
			end: buffer[position + 1],
			operator,
			left,
			right
		};
	},
	function blockStatement(position, buffer, readString): BlockStatementNode {
		const body = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'BlockStatement',
			start: buffer[position],
			end: buffer[position + 1],
			body
		};
	},
	function breakStatement(position, buffer, readString): BreakStatementNode {
		const labelPosition = buffer[position + 2];
		const label = labelPosition === 0 ? null : convertNode(labelPosition, buffer, readString);
		return {
			type: 'BreakStatement',
			start: buffer[position],
			end: buffer[position + 1],
			label
		};
	},
	function callExpression(position, buffer, readString): CallExpressionNode {
		const flags = buffer[position + 2];
		const optional = (flags & 1) === 1;
		const annotations = convertAnnotations(buffer[position + 3], buffer);
		const callee = convertNode(buffer[position + 4], buffer, readString);
		const callArguments = convertNodeList(buffer[position + 5], buffer, readString);
		return {
			type: 'CallExpression',
			start: buffer[position],
			end: buffer[position + 1],
			optional,
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			callee,
			arguments: callArguments
		};
	},
	function catchClause(position, buffer, readString): CatchClauseNode {
		const parameterPosition = buffer[position + 2];
		const parameter =
			parameterPosition === 0 ? null : convertNode(parameterPosition, buffer, readString);
		const body = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'CatchClause',
			start: buffer[position],
			end: buffer[position + 1],
			param: parameter,
			body
		};
	},
	function chainExpression(position, buffer, readString): ChainExpressionNode {
		const expression = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'ChainExpression',
			start: buffer[position],
			end: buffer[position + 1],
			expression
		};
	},
	function classBody(position, buffer, readString): ClassBodyNode {
		const body = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'ClassBody',
			start: buffer[position],
			end: buffer[position + 1],
			body
		};
	},
	function classDeclaration(position, buffer, readString): ClassDeclarationNode {
		const idPosition = buffer[position + 2];
		const id = idPosition === 0 ? null : convertNode(idPosition, buffer, readString);
		const superClassPosition = buffer[position + 3];
		const superClass =
			superClassPosition === 0 ? null : convertNode(superClassPosition, buffer, readString);
		const body = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'ClassDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			id,
			superClass,
			body
		};
	},
	function classExpression(position, buffer, readString): ClassExpressionNode {
		const idPosition = buffer[position + 2];
		const id = idPosition === 0 ? null : convertNode(idPosition, buffer, readString);
		const superClassPosition = buffer[position + 3];
		const superClass =
			superClassPosition === 0 ? null : convertNode(superClassPosition, buffer, readString);
		const body = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'ClassExpression',
			start: buffer[position],
			end: buffer[position + 1],
			id,
			superClass,
			body
		};
	},
	function conditionalExpression(position, buffer, readString): ConditionalExpressionNode {
		const test = convertNode(buffer[position + 2], buffer, readString);
		const consequent = convertNode(buffer[position + 3], buffer, readString);
		const alternate = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'ConditionalExpression',
			start: buffer[position],
			end: buffer[position + 1],
			test,
			consequent,
			alternate
		};
	},
	function continueStatement(position, buffer, readString): ContinueStatementNode {
		const labelPosition = buffer[position + 2];
		const label = labelPosition === 0 ? null : convertNode(labelPosition, buffer, readString);
		return {
			type: 'ContinueStatement',
			start: buffer[position],
			end: buffer[position + 1],
			label
		};
	},
	function debuggerStatement(position, buffer): DebuggerStatementNode {
		return {
			type: 'DebuggerStatement',
			start: buffer[position],
			end: buffer[position + 1]
		};
	},
	function directive(position, buffer, readString): DirectiveNode {
		const directive = convertString(buffer[position + 2], buffer, readString);
		const expression = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'ExpressionStatement',
			start: buffer[position],
			end: buffer[position + 1],
			directive,
			expression
		};
	},
	function doWhileStatement(position, buffer, readString): DoWhileStatementNode {
		const body = convertNode(buffer[position + 2], buffer, readString);
		const test = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'DoWhileStatement',
			start: buffer[position],
			end: buffer[position + 1],
			body,
			test
		};
	},
	function emptyStatement(position, buffer): EmptyStatementNode {
		return {
			type: 'EmptyStatement',
			start: buffer[position],
			end: buffer[position + 1]
		};
	},
	function exportAllDeclaration(position, buffer, readString): ExportAllDeclarationNode {
		const exportedPosition = buffer[position + 2];
		const exported =
			exportedPosition === 0 ? null : convertNode(exportedPosition, buffer, readString);
		const source = convertNode(buffer[position + 3], buffer, readString);
		const attributes = convertNodeList(buffer[position + 4], buffer, readString);
		return {
			type: 'ExportAllDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			exported,
			source,
			attributes
		};
	},
	function exportDefaultDeclaration(position, buffer, readString): ExportDefaultDeclarationNode {
		const declaration = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'ExportDefaultDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			declaration
		};
	},
	function exportNamedDeclaration(position, buffer, readString): ExportNamedDeclarationNode {
		const specifiers = convertNodeList(buffer[position + 2], buffer, readString);
		const sourcePosition = buffer[position + 3];
		const source = sourcePosition === 0 ? null : convertNode(sourcePosition, buffer, readString);
		const attributes = convertNodeList(buffer[position + 4], buffer, readString);
		const declarationPosition = buffer[position + 5];
		const declaration =
			declarationPosition === 0 ? null : convertNode(declarationPosition, buffer, readString);
		return {
			type: 'ExportNamedDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			specifiers,
			source,
			attributes,
			declaration
		};
	},
	function exportSpecifier(position, buffer, readString): ExportSpecifierNode {
		const local = convertNode(buffer[position + 2], buffer, readString);
		const exportedPosition = buffer[position + 3];
		return {
			type: 'ExportSpecifier',
			start: buffer[position],
			end: buffer[position + 1],
			local,
			exported:
				exportedPosition === 0 ? { ...local } : convertNode(exportedPosition, buffer, readString)
		};
	},
	function expressionStatement(position, buffer, readString): ExpressionStatementNode {
		const expression = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'ExpressionStatement',
			start: buffer[position],
			end: buffer[position + 1],
			expression
		};
	},
	function forInStatement(position, buffer, readString): ForInStatementNode {
		const left = convertNode(buffer[position + 2], buffer, readString);
		const right = convertNode(buffer[position + 3], buffer, readString);
		const body = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'ForInStatement',
			start: buffer[position],
			end: buffer[position + 1],
			left,
			right,
			body
		};
	},
	function forOfStatement(position, buffer, readString): ForOfStatementNode {
		const flags = buffer[position + 2];
		const awaited = (flags & 1) === 1;
		const left = convertNode(buffer[position + 3], buffer, readString);
		const right = convertNode(buffer[position + 4], buffer, readString);
		const body = convertNode(buffer[position + 5], buffer, readString);
		return {
			type: 'ForOfStatement',
			start: buffer[position],
			end: buffer[position + 1],
			await: awaited,
			left,
			right,
			body
		};
	},
	function forStatement(position, buffer, readString): ForStatementNode {
		const initPosition = buffer[position + 2];
		const init = initPosition === 0 ? null : convertNode(initPosition, buffer, readString);
		const testPosition = buffer[position + 3];
		const test = testPosition === 0 ? null : convertNode(testPosition, buffer, readString);
		const updatePosition = buffer[position + 4];
		const update = updatePosition === 0 ? null : convertNode(updatePosition, buffer, readString);
		const body = convertNode(buffer[position + 5], buffer, readString);
		return {
			type: 'ForStatement',
			start: buffer[position],
			end: buffer[position + 1],
			init,
			test,
			update,
			body
		};
	},
	function functionDeclaration(position, buffer, readString): FunctionDeclarationNode {
		const flags = buffer[position + 2];
		const async = (flags & 1) === 1;
		const generator = (flags & 2) === 2;
		const annotations = convertAnnotations(buffer[position + 3], buffer);
		const idPosition = buffer[position + 4];
		const id = idPosition === 0 ? null : convertNode(idPosition, buffer, readString);
		const parameters = convertNodeList(buffer[position + 5], buffer, readString);
		const body = convertNode(buffer[position + 6], buffer, readString);
		return {
			type: 'FunctionDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			async,
			generator,
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			id,
			params: parameters,
			body,
			expression: false
		};
	},
	function functionExpression(position, buffer, readString): FunctionExpressionNode {
		const flags = buffer[position + 2];
		const async = (flags & 1) === 1;
		const generator = (flags & 2) === 2;
		const annotations = convertAnnotations(buffer[position + 3], buffer);
		const idPosition = buffer[position + 4];
		const id = idPosition === 0 ? null : convertNode(idPosition, buffer, readString);
		const parameters = convertNodeList(buffer[position + 5], buffer, readString);
		const body = convertNode(buffer[position + 6], buffer, readString);
		return {
			type: 'FunctionExpression',
			start: buffer[position],
			end: buffer[position + 1],
			async,
			generator,
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			id,
			params: parameters,
			body,
			expression: false
		};
	},
	function identifier(position, buffer, readString): IdentifierNode {
		const name = convertString(buffer[position + 2], buffer, readString);
		return {
			type: 'Identifier',
			start: buffer[position],
			end: buffer[position + 1],
			name
		};
	},
	function ifStatement(position, buffer, readString): IfStatementNode {
		const test = convertNode(buffer[position + 2], buffer, readString);
		const consequent = convertNode(buffer[position + 3], buffer, readString);
		const alternatePosition = buffer[position + 4];
		const alternate =
			alternatePosition === 0 ? null : convertNode(alternatePosition, buffer, readString);
		return {
			type: 'IfStatement',
			start: buffer[position],
			end: buffer[position + 1],
			test,
			consequent,
			alternate
		};
	},
	function importAttribute(position, buffer, readString): ImportAttributeNode {
		const key = convertNode(buffer[position + 2], buffer, readString);
		const value = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'ImportAttribute',
			start: buffer[position],
			end: buffer[position + 1],
			key,
			value
		};
	},
	function importDeclaration(position, buffer, readString): ImportDeclarationNode {
		const specifiers = convertNodeList(buffer[position + 2], buffer, readString);
		const source = convertNode(buffer[position + 3], buffer, readString);
		const attributes = convertNodeList(buffer[position + 4], buffer, readString);
		return {
			type: 'ImportDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			specifiers,
			source,
			attributes
		};
	},
	function importDefaultSpecifier(position, buffer, readString): ImportDefaultSpecifierNode {
		const local = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'ImportDefaultSpecifier',
			start: buffer[position],
			end: buffer[position + 1],
			local
		};
	},
	function importExpression(position, buffer, readString): ImportExpressionNode {
		const source = convertNode(buffer[position + 2], buffer, readString);
		const optionsPosition = buffer[position + 3];
		const options = optionsPosition === 0 ? null : convertNode(optionsPosition, buffer, readString);
		return {
			type: 'ImportExpression',
			start: buffer[position],
			end: buffer[position + 1],
			source,
			options
		};
	},
	function importNamespaceSpecifier(position, buffer, readString): ImportNamespaceSpecifierNode {
		const local = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'ImportNamespaceSpecifier',
			start: buffer[position],
			end: buffer[position + 1],
			local
		};
	},
	function importSpecifier(position, buffer, readString): ImportSpecifierNode {
		const importedPosition = buffer[position + 2];
		const local = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'ImportSpecifier',
			start: buffer[position],
			end: buffer[position + 1],
			imported:
				importedPosition === 0 ? { ...local } : convertNode(importedPosition, buffer, readString),
			local
		};
	},
	function labeledStatement(position, buffer, readString): LabeledStatementNode {
		const label = convertNode(buffer[position + 2], buffer, readString);
		const body = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'LabeledStatement',
			start: buffer[position],
			end: buffer[position + 1],
			label,
			body
		};
	},
	function literalBigInt(position, buffer, readString): LiteralBigIntNode {
		const bigint = convertString(buffer[position + 2], buffer, readString);
		const raw = convertString(buffer[position + 3], buffer, readString);
		return {
			type: 'Literal',
			start: buffer[position],
			end: buffer[position + 1],
			bigint,
			raw,
			value: BigInt(bigint)
		};
	},
	function literalBoolean(position, buffer): LiteralBooleanNode {
		const flags = buffer[position + 2];
		const value = (flags & 1) === 1;
		return {
			type: 'Literal',
			start: buffer[position],
			end: buffer[position + 1],
			value,
			raw: value ? 'true' : 'false'
		};
	},
	function literalNull(position, buffer): LiteralNullNode {
		return {
			type: 'Literal',
			start: buffer[position],
			end: buffer[position + 1],
			raw: 'null',
			value: null
		};
	},
	function literalNumber(position, buffer, readString): LiteralNumberNode {
		const rawPosition = buffer[position + 2];
		const raw = rawPosition === 0 ? undefined : convertString(rawPosition, buffer, readString);
		const value = new DataView(buffer.buffer).getFloat64((position + 3) << 2, true);
		return {
			type: 'Literal',
			start: buffer[position],
			end: buffer[position + 1],
			raw,
			value
		};
	},
	function literalRegExp(position, buffer, readString): LiteralRegExpNode {
		const flags = convertString(buffer[position + 2], buffer, readString);
		const pattern = convertString(buffer[position + 3], buffer, readString);
		return {
			type: 'Literal',
			start: buffer[position],
			end: buffer[position + 1],
			raw: `/${pattern}/${flags}`,
			regex: { flags, pattern },
			value: new RegExp(pattern, flags)
		};
	},
	function literalString(position, buffer, readString): LiteralStringNode {
		const value = convertString(buffer[position + 2], buffer, readString);
		const rawPosition = buffer[position + 3];
		const raw = rawPosition === 0 ? undefined : convertString(rawPosition, buffer, readString);
		return {
			type: 'Literal',
			start: buffer[position],
			end: buffer[position + 1],
			value,
			raw
		};
	},
	function logicalExpression(position, buffer, readString): LogicalExpressionNode {
		const operator = FIXED_STRINGS[buffer[position + 2]] as estree.LogicalOperator;
		const left = convertNode(buffer[position + 3], buffer, readString);
		const right = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'LogicalExpression',
			start: buffer[position],
			end: buffer[position + 1],
			operator,
			left,
			right
		};
	},
	function memberExpression(position, buffer, readString): MemberExpressionNode {
		const flags = buffer[position + 2];
		const computed = (flags & 1) === 1;
		const optional = (flags & 2) === 2;
		const object = convertNode(buffer[position + 3], buffer, readString);
		const property = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'MemberExpression',
			start: buffer[position],
			end: buffer[position + 1],
			computed,
			optional,
			object,
			property
		};
	},
	function metaProperty(position, buffer, readString): MetaPropertyNode {
		const meta = convertNode(buffer[position + 2], buffer, readString);
		const property = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'MetaProperty',
			start: buffer[position],
			end: buffer[position + 1],
			meta,
			property
		};
	},
	function methodDefinition(position, buffer, readString): MethodDefinitionNode {
		const flags = buffer[position + 2];
		const isStatic = (flags & 1) === 1;
		const computed = (flags & 2) === 2;
		const key = convertNode(buffer[position + 3], buffer, readString);
		const value = convertNode(buffer[position + 4], buffer, readString);
		const kind = FIXED_STRINGS[buffer[position + 5]] as estree.MethodDefinition['kind'];
		return {
			type: 'MethodDefinition',
			start: buffer[position],
			end: buffer[position + 1],
			static: isStatic,
			computed,
			key,
			value,
			kind
		};
	},
	function newExpression(position, buffer, readString): NewExpressionNode {
		const annotations = convertAnnotations(buffer[position + 2], buffer);
		const callee = convertNode(buffer[position + 3], buffer, readString);
		const callArguments = convertNodeList(buffer[position + 4], buffer, readString);
		return {
			type: 'NewExpression',
			start: buffer[position],
			end: buffer[position + 1],
			...(annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {}),
			callee,
			arguments: callArguments
		};
	},
	function objectExpression(position, buffer, readString): ObjectExpressionNode {
		const properties = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'ObjectExpression',
			start: buffer[position],
			end: buffer[position + 1],
			properties
		};
	},
	function objectPattern(position, buffer, readString): ObjectPatternNode {
		const properties = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'ObjectPattern',
			start: buffer[position],
			end: buffer[position + 1],
			properties
		};
	},
	function privateIdentifier(position, buffer, readString): PrivateIdentifierNode {
		const name = convertString(buffer[position + 2], buffer, readString);
		return {
			type: 'PrivateIdentifier',
			start: buffer[position],
			end: buffer[position + 1],
			name
		};
	},
	function program(position, buffer, readString): ProgramNode {
		const body = convertNodeList(buffer[position + 2], buffer, readString);
		const invalidAnnotations = convertAnnotations(buffer[position + 3], buffer);
		return {
			type: 'Program',
			start: buffer[position],
			end: buffer[position + 1],
			body,
			...(invalidAnnotations.length > 0 ? { [INVALID_ANNOTATION_KEY]: invalidAnnotations } : {}),
			sourceType: 'module'
		};
	},
	function property(position, buffer, readString): PropertyNode {
		const flags = buffer[position + 2];
		const method = (flags & 1) === 1;
		const shorthand = (flags & 2) === 2;
		const computed = (flags & 4) === 4;
		const keyPosition = buffer[position + 3];
		const value = convertNode(buffer[position + 4], buffer, readString);
		const kind = FIXED_STRINGS[buffer[position + 5]] as estree.Property['kind'];
		return {
			type: 'Property',
			start: buffer[position],
			end: buffer[position + 1],
			method,
			shorthand,
			computed,
			key: keyPosition === 0 ? { ...value } : convertNode(keyPosition, buffer, readString),
			value,
			kind
		};
	},
	function propertyDefinition(position, buffer, readString): PropertyDefinitionNode {
		const flags = buffer[position + 2];
		const isStatic = (flags & 1) === 1;
		const computed = (flags & 2) === 2;
		const key = convertNode(buffer[position + 3], buffer, readString);
		const valuePosition = buffer[position + 4];
		const value = valuePosition === 0 ? null : convertNode(valuePosition, buffer, readString);
		return {
			type: 'PropertyDefinition',
			start: buffer[position],
			end: buffer[position + 1],
			static: isStatic,
			computed,
			key,
			value
		};
	},
	function restElement(position, buffer, readString): RestElementNode {
		const argument = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'RestElement',
			start: buffer[position],
			end: buffer[position + 1],
			argument
		};
	},
	function returnStatement(position, buffer, readString): ReturnStatementNode {
		const argumentPosition = buffer[position + 2];
		const argument =
			argumentPosition === 0 ? null : convertNode(argumentPosition, buffer, readString);
		return {
			type: 'ReturnStatement',
			start: buffer[position],
			end: buffer[position + 1],
			argument
		};
	},
	function sequenceExpression(position, buffer, readString): SequenceExpressionNode {
		const expressions = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'SequenceExpression',
			start: buffer[position],
			end: buffer[position + 1],
			expressions
		};
	},
	function spreadElement(position, buffer, readString): SpreadElementNode {
		const argument = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'SpreadElement',
			start: buffer[position],
			end: buffer[position + 1],
			argument
		};
	},
	function staticBlock(position, buffer, readString): StaticBlockNode {
		const body = convertNodeList(buffer[position + 2], buffer, readString);
		return {
			type: 'StaticBlock',
			start: buffer[position],
			end: buffer[position + 1],
			body
		};
	},
	function superElement(position, buffer): SuperElementNode {
		return {
			type: 'Super',
			start: buffer[position],
			end: buffer[position + 1]
		};
	},
	function switchCase(position, buffer, readString): SwitchCaseNode {
		const testPosition = buffer[position + 2];
		const test = testPosition === 0 ? null : convertNode(testPosition, buffer, readString);
		const consequent = convertNodeList(buffer[position + 3], buffer, readString);
		return {
			type: 'SwitchCase',
			start: buffer[position],
			end: buffer[position + 1],
			test,
			consequent
		};
	},
	function switchStatement(position, buffer, readString): SwitchStatementNode {
		const discriminant = convertNode(buffer[position + 2], buffer, readString);
		const cases = convertNodeList(buffer[position + 3], buffer, readString);
		return {
			type: 'SwitchStatement',
			start: buffer[position],
			end: buffer[position + 1],
			discriminant,
			cases
		};
	},
	function taggedTemplateExpression(position, buffer, readString): TaggedTemplateExpressionNode {
		const tag = convertNode(buffer[position + 2], buffer, readString);
		const quasi = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'TaggedTemplateExpression',
			start: buffer[position],
			end: buffer[position + 1],
			tag,
			quasi
		};
	},
	function templateElement(position, buffer, readString): TemplateElementNode {
		const flags = buffer[position + 2];
		const tail = (flags & 1) === 1;
		const cookedPosition = buffer[position + 3];
		const cooked =
			cookedPosition === 0 ? undefined : convertString(cookedPosition, buffer, readString);
		const raw = convertString(buffer[position + 4], buffer, readString);
		return {
			type: 'TemplateElement',
			start: buffer[position],
			end: buffer[position + 1],
			tail,
			value: { cooked, raw }
		};
	},
	function templateLiteral(position, buffer, readString): TemplateLiteralNode {
		const quasis = convertNodeList(buffer[position + 2], buffer, readString);
		const expressions = convertNodeList(buffer[position + 3], buffer, readString);
		return {
			type: 'TemplateLiteral',
			start: buffer[position],
			end: buffer[position + 1],
			quasis,
			expressions
		};
	},
	function thisExpression(position, buffer): ThisExpressionNode {
		return {
			type: 'ThisExpression',
			start: buffer[position],
			end: buffer[position + 1]
		};
	},
	function throwStatement(position, buffer, readString): ThrowStatementNode {
		const argument = convertNode(buffer[position + 2], buffer, readString);
		return {
			type: 'ThrowStatement',
			start: buffer[position],
			end: buffer[position + 1],
			argument
		};
	},
	function tryStatement(position, buffer, readString): TryStatementNode {
		const block = convertNode(buffer[position + 2], buffer, readString);
		const handlerPosition = buffer[position + 3];
		const handler = handlerPosition === 0 ? null : convertNode(handlerPosition, buffer, readString);
		const finalizerPosition = buffer[position + 4];
		const finalizer =
			finalizerPosition === 0 ? null : convertNode(finalizerPosition, buffer, readString);
		return {
			type: 'TryStatement',
			start: buffer[position],
			end: buffer[position + 1],
			block,
			handler,
			finalizer
		};
	},
	function unaryExpression(position, buffer, readString): UnaryExpressionNode {
		const operator = FIXED_STRINGS[buffer[position + 2]] as estree.UnaryOperator;
		const argument = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'UnaryExpression',
			start: buffer[position],
			end: buffer[position + 1],
			operator,
			argument,
			prefix: true
		};
	},
	function updateExpression(position, buffer, readString): UpdateExpressionNode {
		const flags = buffer[position + 2];
		const prefix = (flags & 1) === 1;
		const operator = FIXED_STRINGS[buffer[position + 3]] as estree.UpdateOperator;
		const argument = convertNode(buffer[position + 4], buffer, readString);
		return {
			type: 'UpdateExpression',
			start: buffer[position],
			end: buffer[position + 1],
			prefix,
			operator,
			argument
		};
	},
	function variableDeclaration(position, buffer, readString): VariableDeclarationNode {
		const kind = FIXED_STRINGS[buffer[position + 2]] as estree.VariableDeclaration['kind'];
		const declarations = convertNodeList(buffer[position + 3], buffer, readString);
		return {
			type: 'VariableDeclaration',
			start: buffer[position],
			end: buffer[position + 1],
			kind,
			declarations
		};
	},
	function variableDeclarator(position, buffer, readString): VariableDeclaratorNode {
		const id = convertNode(buffer[position + 2], buffer, readString);
		const initPosition = buffer[position + 3];
		const init = initPosition === 0 ? null : convertNode(initPosition, buffer, readString);
		return {
			type: 'VariableDeclarator',
			start: buffer[position],
			end: buffer[position + 1],
			id,
			init
		};
	},
	function whileStatement(position, buffer, readString): WhileStatementNode {
		const test = convertNode(buffer[position + 2], buffer, readString);
		const body = convertNode(buffer[position + 3], buffer, readString);
		return {
			type: 'WhileStatement',
			start: buffer[position],
			end: buffer[position + 1],
			test,
			body
		};
	},
	function yieldExpression(position, buffer, readString): YieldExpressionNode {
		const flags = buffer[position + 2];
		const delegate = (flags & 1) === 1;
		const argumentPosition = buffer[position + 3];
		const argument =
			argumentPosition === 0 ? null : convertNode(argumentPosition, buffer, readString);
		return {
			type: 'YieldExpression',
			start: buffer[position],
			end: buffer[position + 1],
			delegate,
			argument
		};
	}
];

export type PanicErrorNode = RollupAstNode<{ type: 'PanicError'; message: string }>;
export type ParseErrorNode = RollupAstNode<{ type: 'ParseError'; message: string }>;
export type ArrayExpressionNode = RollupAstNode<estree.ArrayExpression>;
export type ArrayPatternNode = RollupAstNode<estree.ArrayPattern>;
export type ArrowFunctionExpressionNode = RollupAstNode<estree.ArrowFunctionExpression> & {
	[ANNOTATION_KEY]?: readonly RollupAnnotation[];
	id: null;
};
export type AssignmentExpressionNode = RollupAstNode<estree.AssignmentExpression>;
export type AssignmentPatternNode = RollupAstNode<estree.AssignmentPattern>;
export type AwaitExpressionNode = RollupAstNode<estree.AwaitExpression>;
export type BinaryExpressionNode = RollupAstNode<estree.BinaryExpression>;
export type BlockStatementNode = RollupAstNode<estree.BlockStatement>;
export type BreakStatementNode = RollupAstNode<estree.BreakStatement>;
export type CallExpressionNode = RollupAstNode<estree.SimpleCallExpression> & {
	[ANNOTATION_KEY]?: readonly RollupAnnotation[];
};
export type CatchClauseNode = RollupAstNode<estree.CatchClause>;
export type ChainExpressionNode = RollupAstNode<estree.ChainExpression>;
export type ClassBodyNode = RollupAstNode<estree.ClassBody>;
export type ClassDeclarationNode = RollupAstNode<estree.ClassDeclaration>;
export type ClassExpressionNode = RollupAstNode<estree.ClassExpression>;
export type ConditionalExpressionNode = RollupAstNode<estree.ConditionalExpression>;
export type ContinueStatementNode = RollupAstNode<estree.ContinueStatement>;
export type DebuggerStatementNode = RollupAstNode<estree.DebuggerStatement>;
export type DirectiveNode = RollupAstNode<estree.Directive>;
export type DoWhileStatementNode = RollupAstNode<estree.DoWhileStatement>;
export type EmptyStatementNode = RollupAstNode<estree.EmptyStatement>;
export type ExportAllDeclarationNode = RollupAstNode<
	estree.ExportAllDeclaration & { attributes: ImportAttributeNode[] }
>;
export type ExportDefaultDeclarationNode = RollupAstNode<estree.ExportDefaultDeclaration>;
export type ExportNamedDeclarationNode = RollupAstNode<
	estree.ExportNamedDeclaration & { attributes: ImportAttributeNode[] }
>;
export type ExportSpecifierNode = RollupAstNode<estree.ExportSpecifier>;
export type ExpressionStatementNode = RollupAstNode<estree.ExpressionStatement>;
export type ForInStatementNode = RollupAstNode<estree.ForInStatement>;
export type ForOfStatementNode = RollupAstNode<estree.ForOfStatement>;
export type ForStatementNode = RollupAstNode<estree.ForStatement>;
export type FunctionDeclarationNode = RollupAstNode<estree.FunctionDeclaration> & {
	[ANNOTATION_KEY]?: readonly RollupAnnotation[];
	expression: false;
};
export type FunctionExpressionNode = RollupAstNode<estree.FunctionExpression> & {
	[ANNOTATION_KEY]?: readonly RollupAnnotation[];
	expression: false;
};
export type IdentifierNode = RollupAstNode<estree.Identifier>;
export type IfStatementNode = RollupAstNode<estree.IfStatement>;
export type ImportAttributeNode = RollupAstNode<{
	key: estree.Identifier | estree.Literal;
	type: 'ImportAttribute';
	value: estree.Literal;
}>;
export type ImportDeclarationNode = RollupAstNode<
	estree.ImportDeclaration & { attributes: ImportAttributeNode[] }
>;
export type ImportDefaultSpecifierNode = RollupAstNode<estree.ImportDefaultSpecifier>;
export type ImportExpressionNode = RollupAstNode<
	estree.ImportExpression & { options: estree.Expression | null }
>;
export type ImportNamespaceSpecifierNode = RollupAstNode<estree.ImportNamespaceSpecifier>;
export type ImportSpecifierNode = RollupAstNode<estree.ImportSpecifier>;
export type LabeledStatementNode = RollupAstNode<estree.LabeledStatement>;
export type LiteralBigIntNode = RollupAstNode<estree.BigIntLiteral>;
export type LiteralBooleanNode = RollupAstNode<estree.SimpleLiteral & { value: boolean }>;
export type LiteralNullNode = RollupAstNode<estree.SimpleLiteral & { value: null }> & {
	raw: 'null';
};
export type LiteralNumberNode = RollupAstNode<estree.SimpleLiteral & { value: number }>;
export type LiteralRegExpNode = RollupAstNode<estree.RegExpLiteral>;
export type LiteralStringNode = RollupAstNode<estree.SimpleLiteral & { value: string }>;
export type LogicalExpressionNode = RollupAstNode<estree.LogicalExpression>;
export type MemberExpressionNode = RollupAstNode<estree.MemberExpression>;
export type MetaPropertyNode = RollupAstNode<estree.MetaProperty>;
export type MethodDefinitionNode = RollupAstNode<estree.MethodDefinition>;
export type NewExpressionNode = RollupAstNode<estree.NewExpression> & {
	[ANNOTATION_KEY]?: readonly RollupAnnotation[];
};
export type ObjectExpressionNode = RollupAstNode<estree.ObjectExpression>;
export type ObjectPatternNode = RollupAstNode<estree.ObjectPattern>;
export type PrivateIdentifierNode = RollupAstNode<estree.PrivateIdentifier>;
export type ProgramNode = RollupAstNode<estree.Program> & {
	[INVALID_ANNOTATION_KEY]?: readonly RollupAnnotation[];
	sourceType: 'module';
};
export type PropertyNode = RollupAstNode<estree.Property>;
export type PropertyDefinitionNode = RollupAstNode<estree.PropertyDefinition>;
export type RestElementNode = RollupAstNode<estree.RestElement>;
export type ReturnStatementNode = RollupAstNode<estree.ReturnStatement>;
export type SequenceExpressionNode = RollupAstNode<estree.SequenceExpression>;
export type SpreadElementNode = RollupAstNode<estree.SpreadElement>;
export type StaticBlockNode = RollupAstNode<estree.StaticBlock>;
export type SuperElementNode = RollupAstNode<estree.Super>;
export type SwitchCaseNode = RollupAstNode<estree.SwitchCase>;
export type SwitchStatementNode = RollupAstNode<estree.SwitchStatement>;
export type TaggedTemplateExpressionNode = RollupAstNode<estree.TaggedTemplateExpression>;
export type TemplateElementNode = RollupAstNode<estree.TemplateElement>;
export type TemplateLiteralNode = RollupAstNode<estree.TemplateLiteral>;
export type ThisExpressionNode = RollupAstNode<estree.ThisExpression>;
export type ThrowStatementNode = RollupAstNode<estree.ThrowStatement>;
export type TryStatementNode = RollupAstNode<estree.TryStatement>;
export type UnaryExpressionNode = RollupAstNode<estree.UnaryExpression> & { prefix: true };
export type UpdateExpressionNode = RollupAstNode<estree.UpdateExpression>;
export type VariableDeclarationNode = RollupAstNode<estree.VariableDeclaration>;
export type VariableDeclaratorNode = RollupAstNode<estree.VariableDeclarator>;
export type WhileStatementNode = RollupAstNode<estree.WhileStatement>;
export type YieldExpressionNode = RollupAstNode<estree.YieldExpression>;

export function convertNode(position: number, buffer: Uint32Array, readString: ReadString): any {
	const nodeType = buffer[position];
	const converter = nodeConverters[nodeType];
	/* istanbul ignore if: This should never be executed but is a safeguard against faulty buffers */
	if (!converter) {
		console.trace();
		throw new Error(`Unknown node type: ${nodeType}`);
	}
	return converter(position + 1, buffer, readString);
}

function convertNodeList(position: number, buffer: Uint32Array, readString: ReadString): any[] {
	if (position === 0) return EMPTY_ARRAY as never[];
	const length = buffer[position++];
	const list: any[] = [];
	for (let index = 0; index < length; index++) {
		const nodePosition = buffer[position++];
		list.push(nodePosition ? convertNode(nodePosition, buffer, readString) : null);
	}
	return list;
}
