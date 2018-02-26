System.register(['./_cloneArrayBuffer.js'], function (exports, module) {
  'use strict';
  var cloneArrayBuffer;
  return {
    setters: [function (module) {
      cloneArrayBuffer = module.default;
    }],
    execute: function () {

      /**
       * Creates a clone of `dataView`.
       *
       * @private
       * @param {Object} dataView The data view to clone.
       * @param {boolean} [isDeep] Specify a deep clone.
       * @returns {Object} Returns the cloned data view.
       */
      function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
      }
      exports('default', cloneDataView);

    }
  };
});
