function getDefaultExportFromCjs (x) {
	return x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

export { getDefaultExportFromCjs };
