'use strict';

var foo = require('foo');

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var foo__default = _interopDefault(foo);

console.log( foo.bar );

console.log( foo__default );
