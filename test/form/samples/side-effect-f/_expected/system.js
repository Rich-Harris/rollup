System.register('myBundle', [], function (exports) {
	'use strict';
	return {
		execute: function () {

			var main = exports('default', 42);

		}
	};
});
