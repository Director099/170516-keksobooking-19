'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseQuests = document.querySelector('#housing-guests');
  var houseTypePrice = document.querySelector('#housing-price');

  var pinsArray = []; // Для фильтрации данных, нужно после загрузки сохранить их чтобы не загружать каждый раз

  function updatePins(evt) {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }

    /**
     *
     * @param filterValue - Значение фильтра которое кликнули
     * @param itemValue - Ключ массива
     * @returns {boolean} - Возвращаем boolean на соответсвие параметров
     */

    function setFilterValues(filterValue, itemValue) {
      return filterValue === 'any' || itemValue === filterValue;
    }

    var typeArray = pinsArray.filter(function (e) {
      return setFilterValues(houseType.value, e.offer.type)
        && setFilterValues(houseRooms.value, e.offer.rooms.toString())
        && setFilterValues(houseQuests.value, e.offer.guests.toString());
    });

    console.log(pinsArray[0]);
    window.createPins(typeArray);
  }

  function successHandler(data) {
    pinsArray = data;
    window.createPins(pinsArray);
  }

  form.addEventListener('change', function (evt) {
    updatePins(evt);
  });

  mainPin.addEventListener('click', function () {
    window.backend.load(successHandler);
  });
})();
