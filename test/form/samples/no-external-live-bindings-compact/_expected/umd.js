(function(g,f){typeof exports==='object'&&typeof module!=='undefined'?f(exports,require('external1'),require('external2')):typeof define==='function'&&define.amd?define(['exports','external1','external2'],f):(g=typeof globalThis!=='undefined'?globalThis:g||self,f(g.bundle={},g.external1,g.external2));})(this,(function(exports,external1,external2){'use strict';const dynamic = import('external3');exports.external1=external1.external1;exports.dynamic=dynamic;Object.keys(external2).forEach(function(k){if(k!=='default'&&!Object.prototype.hasOwnProperty.call(exports,k))exports[k]=external2[k]});}));