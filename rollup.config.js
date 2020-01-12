import fs from 'fs';
import path from 'path';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import license from 'rollup-plugin-license';
import resolve from 'rollup-plugin-node-resolve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript';
import addBinShebang from './build-plugins/add-bin-shebang';
import conditionalFsEventsImport from './build-plugins/conditional-fsevents-import';
import fixAcornEsmImport from './build-plugins/fix-acorn-esm-import';
import generateLicenseFile from './build-plugins/generate-license-file';
import pkg from './package.json';

const commitHash = (function() {
	try {
		return fs.readFileSync('.commithash', 'utf-8');
	} catch (err) {
		return 'unknown';
	}
})();

const now = new Date(
	process.env.SOURCE_DATE_EPOCH ? process.env.SOURCE_DATE_EPOCH * 1000 : new Date().getTime()
).toUTCString();

const banner = `/*
  @license
	Rollup.js v${pkg.version}
	${now} - commit ${commitHash}

	https://github.com/rollup/rollup

	Released under the MIT License.
*/`;

const onwarn = warning => {
	// eslint-disable-next-line no-console
	console.error(
		'Building Rollup produced warnings that need to be resolved. ' +
			'Please keep in mind that the browser build may never have external dependencies!'
	);
	throw new Error(warning.message);
};

const moduleAliases = {
	resolve: ['.js', '.json', '.md'],
	entries: [
		{ find: 'help.md', replacement: path.resolve('cli/help.md') },
		{ find: 'package.json', replacement: path.resolve('package.json') }
	]
};

const treeshake = {
	moduleSideEffects: false,
	propertyReadSideEffects: false,
	tryCatchDeoptimization: false
};

const nodePlugins = [
	alias(moduleAliases),
	resolve(),
	json(),
	conditionalFsEventsImport(),
	string({ include: '**/*.md' }),
	commonjs({ include: 'node_modules/**' }),
	typescript({ include: '**/*.{ts,js}' })
];

export default command => {
	const commonJSBuild = {
		input: {
			'rollup.js': 'src/node-entry.ts',
			'bin/rollup': 'cli/index.ts'
		},
		onwarn,
		plugins: [
			...nodePlugins,
			addBinShebang(),
			!command.configTest && license({ thirdParty: generateLicenseFile })
		],
		// acorn needs to be external as some plugins rely on a shared acorn instance
		// fsevents is a dependency of chokidar that cannot be bundled as it contains binary code
		external: [
			'acorn',
			'assert',
			'crypto',
			'events',
			'fs',
			'fsevents',
			'module',
			'path',
			'os',
			'stream',
			'util'
		],
		treeshake,
		output: {
			banner,
			chunkFileNames: 'shared-cjs/[name].js',
			dir: 'dist',
			entryFileNames: '[name]',
			externalLiveBindings: false,
			format: 'cjs',
			freeze: false,
			interop: false,
			sourcemap: true
		}
	};

	if (command.configTest) {
		return commonJSBuild;
	}

	const esmBuild = Object.assign({}, commonJSBuild, {
		input: { 'rollup.es.js': 'src/node-entry.ts' },
		plugins: [...nodePlugins, fixAcornEsmImport()],
		output: Object.assign({}, commonJSBuild.output, {
			chunkFileNames: 'shared-es/[name].js',
			format: 'esm',
			sourcemap: false
		})
	});

	const browserBuilds = {
		input: 'src/browser-entry.ts',
		onwarn,
		plugins: [
			alias(moduleAliases),
			resolve({ browser: true }),
			json(),
			{
				load: id => {
					if (~id.indexOf('crypto.ts')) return fs.readFileSync('browser/crypto.ts', 'utf-8');
					if (~id.indexOf('fs.ts')) return fs.readFileSync('browser/fs.ts', 'utf-8');
					if (~id.indexOf('path.ts')) return fs.readFileSync('browser/path.ts', 'utf-8');
				}
			},
			commonjs(),
			typescript({ include: '**/*.{ts,js}' }),
			terser({ module: true, output: { comments: 'some' } })
		],
		treeshake,
		output: [
			{ file: 'dist/rollup.browser.js', format: 'umd', name: 'rollup', banner },
			{ file: 'dist/rollup.browser.es.js', format: 'esm', banner }
		]
	};

	return [commonJSBuild, esmBuild, browserBuilds];
};
