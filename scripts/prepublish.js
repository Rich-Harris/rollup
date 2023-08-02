#!/usr/bin/env node

import { writeFile } from 'node:fs/promises';
import { readJson, runWithEcho } from './helpers.js';
import { MAIN_PACKAGE } from './release-constants.js';

const { optionalDependencies } = await readJson(MAIN_PACKAGE);
await runWithEcho('npm', ['run', 'prepublish:napi']);
const mainPackage = await readJson(MAIN_PACKAGE);
await writeFile(
	MAIN_PACKAGE,
	JSON.stringify(
		{
			...mainPackage,
			optionalDependencies: { ...optionalDependencies, ...mainPackage.optionalDependencies }
		},
		null,
		2
	)
);
