const path = require('path');

module.exports = {
	solo: true,
	description: 'throws when a module that is loaded before an emitted chunk does not exist',
	options: {
		plugins: {
			name: 'test-plugin',
			buildStart() {
				this.emitFile({
					type: 'chunk',
					id: 'dep.js',
					implicitlyLoadedAfterOneOf: ['does-not-exist']
				});
			}
		}
	},
	error: {
		code: 'UNRESOLVED_ENTRY',
		message:
			'Module "does-not-exist" that should be implicitly loaded before "dep.js" could not be resolved.',
		watchFiles: [path.resolve(__dirname, 'dep.js'), path.resolve(__dirname, 'main.js')]
	}
};
