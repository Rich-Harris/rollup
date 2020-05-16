const path = require('path');

module.exports = {
	description:
		'throw descriptive error if sourcemapPathTransform-function does not return a string (#3484)',
	options: {
		output: {
			name: 'myModule',
			sourcemap: true,
			file: path.resolve(__dirname, 'main.js'),
			sourcemapPathTransform: () => {}
		}
	},
	generateError: {
		message: 'sourcemapPathTransform function must return a string.'
	}
};
