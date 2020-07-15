define(['require'], function (require) { 'use strict';

	function _interopNamespace(e) {
		if (e && e.__esModule) { return e; } else {
			var n = Object.create(null);
			if (e) {
				Object.keys(e).forEach(function (k) {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () {
							return e[k];
						}
					});
				});
			}
			n['default'] = e;
			return Object.freeze(n);
		}
	}

	amdSpecialHandler('./generated-imported-via-special-handler', 'main.js', 'imported-via-special-handler.js', null);
	amdSpecialHandler(someVariable, 'main.js', 'null', null);
	amdSpecialHandler(someCustomlyResolvedVariable, 'main.js', 'null', someCustomlyResolvedVariable);

});
