System.register(['./_createBaseFor.js'], function (exports, module) {
	'use strict';
	var createBaseFor;
	return {
		setters: [function (module) {
			createBaseFor = module.default;
		}],
		execute: function () {

			/**
			 * This function is like `baseFor` except that it iterates over properties
			 * in the opposite order.
			 *
			 * @private
			 * @param {Object} object The object to iterate over.
			 * @param {Function} iteratee The function invoked per iteration.
			 * @param {Function} keysFunc The function to get the keys of `object`.
			 * @returns {Object} Returns `object`.
			 */
			var baseForRight = createBaseFor(true);
			exports('default', baseForRight);

		}
	};
});
