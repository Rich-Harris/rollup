(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(typeof self !== 'undefined' ? self : this, function () { 'use strict';

	const retained1a = {
		get effect () {
			console.log( 'effect' );
		},
		get noEffect () {
			const x = 1;
			return x;
		}
	};
	const retained1b = retained1a.effect;
	const retained1c = retained1a[ 'eff' + 'ect' ];

	const retained3 = {
		set effect ( value ) {
			console.log( value );
		}
	};

	retained3.effect = 'retained';

	const retained4 = {
		set effect ( value ) {
			console.log( value );
		}
	};

	retained4[ 'eff' + 'ect' ] = 'retained';

	const retained7 = {
		foo: () => {},
		get foo () {
			return 1;
		}
	};

	retained7.foo();

}));
