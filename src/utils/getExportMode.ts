import Chunk from '../Chunk';
import { NormalizedOutputOptions } from '../rollup/types';
import { errIncompatibleExportOptionValue, errMixedExport, error } from './error';

export default function getExportMode(
	chunk: Chunk,
	{ exports: exportMode, name, format }: NormalizedOutputOptions,
	facadeModuleId: string
) {
	const exportKeys = chunk.getExportNames();

	if (exportMode === 'default') {
		if (exportKeys.length !== 1 || exportKeys[0] !== 'default') {
			return error(errIncompatibleExportOptionValue('default', exportKeys, facadeModuleId));
		}
	} else if (exportMode === 'none' && exportKeys.length) {
		return error(errIncompatibleExportOptionValue('none', exportKeys, facadeModuleId));
	}

	if (!exportMode || exportMode === 'auto') {
		if (exportKeys.length === 0) {
			exportMode = 'none';
		} else if (exportKeys.length === 1 && exportKeys[0] === 'default') {
			exportMode = 'default';
		} else {
			if (format !== 'es' && exportKeys.indexOf('default') !== -1) {
				chunk.graph.options.onwarn(errMixedExport(facadeModuleId, name));
			}
			exportMode = 'named';
		}
	}

	return exportMode;
}
