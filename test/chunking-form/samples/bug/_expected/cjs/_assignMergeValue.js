'use strict';

var ___baseAssignValue_js = require('./_baseAssignValue.js');
var __eq_js = require('./eq.js');

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !__eq_js.default(object[key], value)) ||
      (value === undefined && !(key in object))) {
    ___baseAssignValue_js.default(object, key, value);
  }
}

module.exports = assignMergeValue;
