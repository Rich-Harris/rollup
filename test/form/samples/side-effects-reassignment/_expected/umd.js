(function (global, factory) {
	typeof module === 'object' && module.exports ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var effect = function() {
		console.log('effect');
	};

	var alsoEffect = effect;
	alsoEffect();

})));
