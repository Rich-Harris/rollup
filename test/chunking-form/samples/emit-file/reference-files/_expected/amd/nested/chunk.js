define(['require', '../main'], (function (require, main) { 'use strict';

	var logo = new URL(require.toUrl('../assets/logo2-fdaa74783.svg'), document.baseURI).href;

	main.showImage(logo);

}));
