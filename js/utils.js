'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  window.utils = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    }
  };
})();
