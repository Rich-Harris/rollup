(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	factory(global.bundle = {});
}(typeof self !== 'undefined' ? self : this, function (exports) { 'use strict';

	var buffer = new ArrayBuffer( 8 );

	var view8 = new Int8Array( buffer );
	var view16 = new Int16Array( buffer );

	view16[ 0 ] = 3;

	exports.view8 = view8;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
