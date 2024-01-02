#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { AST_NODES, astNodeNamesWithFieldOrder } from './ast-types.js';
import { runWithEcho, toScreamingSnakeCase } from './helpers.js';

const BYTES_PER_U32 = 4;

const astConstantsFile = new URL(
	'../rust/parse_ast/src/convert_ast/converter/ast_constants.rs',
	import.meta.url
);

// Nodes with suffix _SIMPLE have at most one variable child that does not need
// an indirect reference (e.g. one non-optional AST Node or a list of AST Nodes)
// and can use "add_type_and_start_simple"
const nodeTypes = [
	'pub const TYPE_PARSE_ERROR: [u8; 4] = 0u32.to_ne_bytes();',
	...astNodeNamesWithFieldOrder.map(
		({ name, isSimple }, index) =>
			`pub const TYPE_${toScreamingSnakeCase(name)}${isSimple ? '_SIMPLE' : ''}${
				AST_NODES[name].flags ? '_FLAGS' : ''
			}: [u8; 4] = ${index + 1}u32.to_ne_bytes();`
	)
].join('\n');

const reservedBytesAndOffsets = astNodeNamesWithFieldOrder
	.map(({ name, fieldNames, isSimple }) => {
		if (isSimple) {
			return '';
		}
		/** @type {string[]} */
		const lines = [];
		const { flags } = AST_NODES[name];
		// reservedBytes is the number of bytes reserved for
		// - end position
		// - flags if present
		// - non-inlined fields
		let reservedBytes = BYTES_PER_U32;
		if (flags) {
			reservedBytes += BYTES_PER_U32;
			for (const [index, flag] of flags.entries()) {
				lines.push(
					`pub const ${toScreamingSnakeCase(name)}_${toScreamingSnakeCase(flag)}_FLAG: u32 = ${
						1 << index
					};`
				);
			}
		}
		for (const fieldName of fieldNames) {
			lines.push(
				`pub const ${toScreamingSnakeCase(name)}_${toScreamingSnakeCase(
					fieldName
				)}_OFFSET: usize = ${reservedBytes};`
			);
			reservedBytes += BYTES_PER_U32;
		}
		lines.unshift(
			`pub const ${toScreamingSnakeCase(name)}_RESERVED_BYTES: usize = ${reservedBytes};`
		);
		return `${lines.join('\n')}\n`;
	})
	.join('\n');

const astConstants = `// This file is generated by scripts/generate-ast-converters.js.
// Do not edit this file directly.

${nodeTypes}

${reservedBytesAndOffsets}
`;

await writeFile(astConstantsFile, astConstants);
await runWithEcho('rustfmt', [fileURLToPath(astConstantsFile)]);
