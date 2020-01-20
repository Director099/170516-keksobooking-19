'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var houseType = document.querySelector('#housing-type');
  var houseTypePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseQuests = document.querySelector('#housing-guests');

  var pinsArray = []; // Для фильтрации данных, нужно после загрузки сохранить их чтобы не загружать каждый раз

  var houseSelect = {
    flat: 'flat',
    bungalo: 'bungalo',
    house: 'house',
    any: 'any'
  };

  function updatePins() {
    window.createPins(pinsArray);
  }

  function successHandler(data) {
    pinsArray = data;
    updatePins();
  }

  houseType.addEventListener('change', function () {
    // var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  });

  mainPin.addEventListener('click', function () {
    window.backend.load(successHandler);
    // updatePins();
  });
})();
