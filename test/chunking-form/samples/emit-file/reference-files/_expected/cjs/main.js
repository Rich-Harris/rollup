'use strict';

var __chunk_1 = require('./nested/chunk.js');

var logo = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __dirname + '/assets/logo1-a5ec488b.svg').href : new URL('assets/logo1-a5ec488b.svg', document.currentScript && document.currentScript.src || document.baseURI).href);

__chunk_1.showImage(logo);
new Promise(function (resolve) { resolve(require('./nested/chunk2.js')); });
