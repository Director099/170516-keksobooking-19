'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;
  var formPublication = document.querySelector('.ad-form');
  var formFieldset = formPublication.querySelectorAll('fieldset');

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].setAttribute('disabled', '');
  }

  window.utils = {
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },
  };
})();
