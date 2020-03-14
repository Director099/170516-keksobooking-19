'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var formFieldset = noticeForm.querySelectorAll('fieldset');
  var fieldAddress = noticeForm.querySelector('#address');

  fieldAddress.value = window.pinMove.positionPins.x + ' , ' + window.pinMove.positionPins.y;

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

  function deactivateCard() {
    if (map.classList.contains('map--faded')) {
      return false;
    }
    for (var i = 0; i < formFieldset.length; i++) {
      formFieldset[i].setAttribute('disabled', '');
    }
    map.classList.add('map--faded');
    noticeForm.classList.add('ad-form--disabled');
    return true;
  }

  deactivateCard();

  mainPin.addEventListener('click', activateCard);

  window.map = {
    deactivateCard: deactivateCard
  };
}());
