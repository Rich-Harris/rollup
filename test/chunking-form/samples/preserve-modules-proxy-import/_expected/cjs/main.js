'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('external'));
require('./proxy.js');

console.log(path.normalize('foo\\bar'));
console.log(path.normalize('foo\\bar'));
