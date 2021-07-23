(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('external')) :
	typeof define === 'function' && define.amd ? define(['external'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.bundle = factory(global.external));
}(this, (function (external) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var external__default = /*#__PURE__*/_interopDefaultLegacy(external);

	console.log(external__default['default']);

	const _interopDefault$1 = 1;
	const _interopNamespace$1 = 1;
	const module = 1;
	const require$1 = 1;
	const exports$1 = 1;
	const document$1 = 1;
	const URL$1 = 1;
	console.log(_interopDefault$1, _interopNamespace$1, module, require$1, exports$1, document$1, URL$1);

	import('external').then(console.log);
	exports['default'] = 0;
	console.log((typeof document === 'undefined' ? (typeof location !== 'undefined' ? location.href : new (require('u' + 'rl').URL)('file:' + __filename).href) : (document.currentScript && document.currentScript.src || new URL('umd.js', document.baseURI).href)));

	function nested1() {
		const _interopDefault = 1;
		const _interopNamespace = 1;
		const module = 1;
		const require$1 = 1;
		const exports$1 = 1;
		const document$1 = 1;
		const URL$1 = 1;
		console.log(_interopDefault, _interopNamespace, module, require$1, exports$1, document$1, URL$1);

		import('external').then(console.log);
		exports['default'] = 1;
		console.log((typeof document === 'undefined' ? (typeof location !== 'undefined' ? location.href : new (require('u' + 'rl').URL)('file:' + __filename).href) : (document.currentScript && document.currentScript.src || new URL('umd.js', document.baseURI).href)));
	}

	nested1();

	function nested2() {
		const _interopDefault = 1;
		const _interopNamespace = 1;
		const module = 1;
		const require = 1;
		const exports = 1;
		const document = 1;
		const URL = 1;
		console.log(_interopDefault, _interopNamespace, module, require, exports, document, URL);
	}

	nested2();

	return exports['default'];

})));
