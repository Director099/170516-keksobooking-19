'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var createFragment = document.createDocumentFragment();
  var template = document.querySelector('template').content;

  window.utils = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },
  };
})();
