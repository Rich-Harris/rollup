(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

	var effect1 = () => console.log( 'effect' );
	var associated = () => {};
	for ( var associated of [ effect1 ] ) {}
	associated();

	var effect3 = () => console.log( 'effect' ); // Must not be removed!
	for ( const foo of [ effect3 ] ) {
		foo(); // Must not be removed!
	}

	for ( globalVar of [ 1 ] ) {}

}));
