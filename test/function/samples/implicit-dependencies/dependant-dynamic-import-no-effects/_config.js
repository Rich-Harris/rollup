const path = require('path');

module.exports = {
	solo: true,
	description: 'throws when a module that is loaded before an emitted chunk is fully tree-shaken',
	options: {
		plugins: {
			name: 'test-plugin',
			buildStart() {
				this.emitFile({
					type: 'chunk',
					id: 'dep.js',
					implicitlyLoadedAfterOneOf: ['dependant']
				});
			}
		}
	},
	error: {
		code: 'UNRESOLVED_ENTRY',
		message:
			'Module "dependant.js" that should be implicitly loaded before "dep.js" is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.',
		watchFiles: [
			path.resolve(__dirname, 'dep.js'),
			path.resolve(__dirname, 'main.js'),
			path.resolve(__dirname, 'dependant.js')
		]
	}
};
