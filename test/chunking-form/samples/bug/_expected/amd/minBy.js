define(['./_baseExtremum.js', './_baseIteratee.js', './_baseLt.js'], function (___baseExtremum_js, ___baseIteratee_js, ___baseLt_js) { 'use strict';

  /**
   * This method is like `_.min` except that it accepts `iteratee` which is
   * invoked for each element in `array` to generate the criterion by which
   * the value is ranked. The iteratee is invoked with one argument: (value).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Math
   * @param {Array} array The array to iterate over.
   * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
   * @returns {*} Returns the minimum value.
   * @example
   *
   * var objects = [{ 'n': 1 }, { 'n': 2 }];
   *
   * _.minBy(objects, function(o) { return o.n; });
   * // => { 'n': 1 }
   *
   * // The `_.property` iteratee shorthand.
   * _.minBy(objects, 'n');
   * // => { 'n': 1 }
   */
  function minBy(array, iteratee) {
    return (array && array.length)
      ? ___baseExtremum_js.default(array, ___baseIteratee_js.default(iteratee, 2), ___baseLt_js.default)
      : undefined;
  }

  return minBy;

});
