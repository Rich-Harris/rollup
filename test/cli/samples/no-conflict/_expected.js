(function (global, factory) {
	typeof module === 'object' && module.exports ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(function() {
		var current = global.conflictyName;
		var exports = factory();
		global.conflictyName = exports;
		exports.noConflict = function() { global.conflictyName = current; return exports; };
	})();
}(this, (function () { 'use strict';

	var main = {};

	return main;

})));
