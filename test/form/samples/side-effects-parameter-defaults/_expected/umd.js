(function (global, factory) {
	typeof module === 'object' && module.exports ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	const effect = () => console.log( 'effect' );

	function aDecl ( x = effect() ) {}
	aDecl();

	const aExp = function ( x = effect() ) {};
	aExp();

	const aArr = ( x = effect() ) => {};
	aArr();

	function bDecl ( x = effect ) {
		x();
	}
	bDecl();

	const bExp = function ( x = effect ) {
		x();
	};
	bExp();

	const bArr = ( x = effect ) => {
		x();
	};
	bArr();

})));
