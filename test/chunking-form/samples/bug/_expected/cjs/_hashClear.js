'use strict';

var ___nativeCreate_js = require('./_nativeCreate.js');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = ___nativeCreate_js.default ? ___nativeCreate_js.default(null) : {};
  this.size = 0;
}

module.exports = hashClear;
