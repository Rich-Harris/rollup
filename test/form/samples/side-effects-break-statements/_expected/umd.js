(function (global, factory) {
	typeof module === 'object' && module.exports ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	for ( let i = 0; i < 2; i++ ) {
		console.log( 'effect' );
		break;
	}

	for ( const val in { x: 1, y: 2 } ) {
		console.log( 'effect' );
		break;
	}

	for ( const val of { x: 1, y: 2 } ) {
		console.log( 'effect' );
		break;
	}

	while ( true ) {
		console.log( 'effect' );
		break;
	}

	do {
		console.log( 'effect' );
		break;
	} while ( true );

})));
