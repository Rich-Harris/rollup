module.exports = defineTest({
	description: 'handles validate failure',
	options: {
		onLog(log) {
			throw log;
		},
		output: {
			outro: '/*',
			validate: true
		}
	},
	generateError: {
		code: 'CHUNK_INVALID',
		level: 'warn',
		message: 'Chunk "main.js" is not valid JavaScript: Unterminated comment (5:0).',
		frame: `
3: throw new Error('Not executed');
4:
5: /*
   ^`,
		loc: {
			column: 0,
			file: 'main.js',
			line: 5
		}
	}
});
