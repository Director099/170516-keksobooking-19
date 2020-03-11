'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var formFieldset = noticeForm.querySelectorAll('fieldset');

  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].setAttribute('disabled', '');
  }

  /**
   * @description - Активация карточки
   * @returns {boolean}
   */

  function activateCard() {
    var formElems = noticeForm.querySelectorAll('fieldset[disabled]');
    if (!map.classList.contains('map--faded')) {
      return false;
    }
    for (var i = 0; i < formElems.length; i++) {
      formElems[i].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    noticeForm.classList.remove('ad-form--disabled');
    window.backend.load(window.filter.successHandler);

    return true;
  }

  mainPin.addEventListener('click', activateCard);
}());
