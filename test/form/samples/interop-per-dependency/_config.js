module.exports = {
	description: 'allows to configure the interop type per external dependency',
	options: {
		external: id => id.startsWith('external'),
		output: {
			interop(id) {
				return id.split('-')[1];
			},
			globals(id) {
				return id.replace('-', '');
			}
		}
	}
};
