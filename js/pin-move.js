'use strict';

(function () {
  var MOVE_ZONE = {
    MIN: 130,
    MAX: 630
  };
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var fieldAddress = document.querySelector('#address');

  var pinSize = {
    width: mainPin.offsetWidth,
    height: mainPin.offsetHeight + 17
  };

  var positionPins = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };

  function resetPositionPin() {
    mainPin.style = 'left:' + positionPins.x + 'px;' + 'top:' + positionPins.y + 'px';
  }

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      if (fieldAddress) {
        fieldAddress.value = Math.floor(movePositionPins.x + (pinSize.width / 2)) + ' , ' + (movePositionPins.y + pinSize.height);
      }

      if (movePositionPins.x >= -(pinSize.width / 2) &&
        movePositionPins.x <= mapPins.offsetWidth - (pinSize.width / 2) &&
        movePositionPins.y >= MOVE_ZONE.MIN - pinSize.height &&
        movePositionPins.y <= MOVE_ZONE.MAX - pinSize.height) {
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
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.pinMove = {
    resetPositionPin: resetPositionPin,
    positionPins: positionPins,
    pinSize: pinSize
  };
})();
