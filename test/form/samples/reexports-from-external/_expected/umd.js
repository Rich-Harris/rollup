(function (global, factory) {
	typeof module === 'object' && module.exports ? factory(exports, require('external')) :
	typeof define === 'function' && define.amd ? define(['exports', 'external'], factory) :
	(factory((global.myBundle = {}),global.external));
}(this, (function (exports,external) { 'use strict';

	Object.keys(external).forEach(function (key) { exports[key] = external[key]; });

	Object.defineProperty(exports, '__esModule', { value: true });

})));
