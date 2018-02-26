'use strict';

var ___baseMean_js = require('./_baseMean.js');
var __identity_js = require('./identity.js');

/**
 * Computes the mean of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the mean.
 * @example
 *
 * _.mean([4, 2, 8, 6]);
 * // => 5
 */
function mean(array) {
  return ___baseMean_js.default(array, __identity_js.default);
}

module.exports = mean;
