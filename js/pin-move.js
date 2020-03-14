'use strict';

(function () {
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
    var dragged = false;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * @description - Удерживание мыши
     * @param moveEvt - Расположение(Движение) мыши
     */

    function onMouseMove(moveEvt)   {
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

      var MOVE_ZONE = {
        MIN: 130,
        MAX: 630
      };

      if (fieldAddress) {
        fieldAddress.value = movePositionPins.x + ' , ' + (movePositionPins.y + pinSize.height);
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

  });
  mainPin.addEventListener('keydown', function (evt) {
    if(window.utils.isEnterEvent(evt)) {
      activateCard();
    }
  });

  window.pinMove = {
    resetPositionPin: resetPositionPin,
    positionPins: positionPins,
    pinSize: pinSize
  }
})();
