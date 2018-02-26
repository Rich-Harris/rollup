define(['./_baseInvoke.js', './_baseRest.js'], function (___baseInvoke_js, ___baseRest_js) { 'use strict';

  /**
   * Creates a function that invokes the method at `path` of a given object.
   * Any additional arguments are provided to the invoked method.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Util
   * @param {Array|string} path The path of the method to invoke.
   * @param {...*} [args] The arguments to invoke the method with.
   * @returns {Function} Returns the new invoker function.
   * @example
   *
   * var objects = [
   *   { 'a': { 'b': _.constant(2) } },
   *   { 'a': { 'b': _.constant(1) } }
   * ];
   *
   * _.map(objects, _.method('a.b'));
   * // => [2, 1]
   *
   * _.map(objects, _.method(['a', 'b']));
   * // => [2, 1]
   */
  var method = ___baseRest_js.default(function(path, args) {
    return function(object) {
      return ___baseInvoke_js.default(object, path, args);
    };
  });

  return method;

});
