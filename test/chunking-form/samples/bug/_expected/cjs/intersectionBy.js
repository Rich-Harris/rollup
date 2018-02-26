'use strict';

var ___arrayMap_js = require('./_arrayMap.js');
var ___baseIntersection_js = require('./_baseIntersection.js');
var ___baseIteratee_js = require('./_baseIteratee.js');
var ___baseRest_js = require('./_baseRest.js');
var ___castArrayLikeObject_js = require('./_castArrayLikeObject.js');
var __last_js = require('./last.js');

/**
 * This method is like `_.intersection` except that it accepts `iteratee`
 * which is invoked for each element of each `arrays` to generate the criterion
 * by which they're compared. The order and references of result values are
 * determined by the first array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new array of intersecting values.
 * @example
 *
 * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
 * // => [2.1]
 *
 * // The `_.property` iteratee shorthand.
 * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }]
 */
var intersectionBy = ___baseRest_js.default(function(arrays) {
  var iteratee = __last_js.default(arrays),
      mapped = ___arrayMap_js.default(arrays, ___castArrayLikeObject_js.default);

  if (iteratee === __last_js.default(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? ___baseIntersection_js.default(mapped, ___baseIteratee_js.default(iteratee, 2))
    : [];
});

module.exports = intersectionBy;
