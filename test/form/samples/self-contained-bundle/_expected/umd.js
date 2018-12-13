(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

	function foo () {
		console.log( bar() );
	}

	function bar () {
		return 42;
	}

	// comment before 1

	console.log( 1 );
	console.log( 2 ); // comment alongside 2
	foo();
	console.log( 3 );

}));
