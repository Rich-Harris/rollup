(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

	(() => () => console.log( 'effect' ))()();
	(() => () => () => console.log( 'effect' ))()()();
	const retained1 = () => () => console.log( 'effect' );
	retained1()();

	(() => {
		return () => console.log( 'effect' );
	})()();
	(() => ({ foo: () => console.log( 'effect' ) }))().foo();
	(() => ({ foo: () => ({ bar: () => console.log( 'effect' ) }) }))().foo().bar();

}));
