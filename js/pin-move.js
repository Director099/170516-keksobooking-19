'use strict';

(function () {
  var fieldAddress = document.querySelector('#address');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var noticeForm = document.querySelector('.ad-form');
  var formElems = noticeForm.querySelectorAll('fieldset[disabled]');

  /**
   * @description - Активация карточки
   * @returns {boolean}
   */

  function activateCard() {
    if (!map.classList.contains('map--faded')) {
      return false;
    }
    for (var i = 0; i < formElems.length; i++) {
      formElems[i].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    noticeForm.classList.remove('ad-form--disabled');
    return true;
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * @description - Удерживание мыши
     * @param moveEvt - Расположение(Движение) мыши
     */

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var movePositionPins = {
        x: mainPin.offsetLeft - shift.x,
        y: mainPin.offsetTop - shift.y
      };

      fieldAddress.value = movePositionPins.x + ' , ' + movePositionPins.y;

      var pinOffset = {
        width: mainPin.offsetWidth,
        height: mainPin.offsetHeight
      };

      if (movePositionPins.x >= 0 &&
        movePositionPins.x <= mapPins.offsetWidth - pinOffset.width &&
        movePositionPins.y >= 0 &&
        movePositionPins.y <= mapPins.offsetHeight - pinOffset.height) {
        mainPin.style.left = movePositionPins.x + 'px';
        mainPin.style.top = movePositionPins.y + 'px';
      }
    }

    /**
     * @description - Отпускаем мышь
     * @param upEvt - Конечное остановка мыши
     */

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        function onClickDefaults(evt) {
          evt.preventDefault();
          mainPin.removeEventListener('click', onClickDefaults);
        }
        mainPin.addEventListener('click', onClickDefaults);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('click', activateCard);
  });
})();
