(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('foo')) :
	typeof define === 'function' && define.amd ? define(['foo'], factory) :
	factory(global.foo);
}(typeof self !== 'undefined' ? self : this, function (foo) { 'use strict';

	console.log(foo);
	console.log(foo.blah);
	console.log(foo.bar);

}));
