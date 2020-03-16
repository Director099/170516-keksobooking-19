'use strict';

(function () {
  var ESC_KEY_CODE = 27;
  var map = document.querySelector('.map');
  var fieldAddress = document.querySelector('#address');

  window.utils = {
    map: map,
    fieldAddress: fieldAddress,
    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    }
  };
})();
