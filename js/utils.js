'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  window.utils = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },
  };
})();
