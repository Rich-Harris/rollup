System.register(['./_arrayLikeKeys.js', './_baseKeys.js', './isArrayLike.js'], function (exports, module) {
  'use strict';
  var arrayLikeKeys, baseKeys, isArrayLike;
  return {
    setters: [function (module) {
      arrayLikeKeys = module.default;
    }, function (module) {
      baseKeys = module.default;
    }, function (module) {
      isArrayLike = module.default;
    }],
    execute: function () {

      /**
       * Creates an array of the own enumerable property names of `object`.
       *
       * **Note:** Non-object values are coerced to objects. See the
       * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
       * for more details.
       *
       * @static
       * @since 0.1.0
       * @memberOf _
       * @category Object
       * @param {Object} object The object to query.
       * @returns {Array} Returns the array of property names.
       * @example
       *
       * function Foo() {
       *   this.a = 1;
       *   this.b = 2;
       * }
       *
       * Foo.prototype.c = 3;
       *
       * _.keys(new Foo);
       * // => ['a', 'b'] (iteration order is not guaranteed)
       *
       * _.keys('hi');
       * // => ['0', '1']
       */
      function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      exports('keys', keys);

    }
  };
});
