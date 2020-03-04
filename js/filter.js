'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseQuests = document.querySelector('#housing-guests');
  var houseTypePrice = document.querySelector('#housing-price');

  var pinsArray = []; // Для фильтрации данных, нужно после загрузки сохранить их чтобы не загружать каждый раз

  function updatePins() {
    var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].remove();
    }

    /**
     * @description - Фильтрация по типу/колличество гостей/комнат
     * @param filterValue - Значение фильтра которое кликнули
     * @param itemValue - Сравниваю со значением массива
     * @returns {boolean} - Возвращаем boolean на соответсвие параметров
     */

    function setFilterValues(filterValue, itemValue) {
      return filterValue === 'any' || itemValue === filterValue;
    }

    /**
     * @description - Фильтрация по типу/колличество гостей/комнат
     * @param filterValue - Значение фильтра которое кликнули
     * @param itemValue - Сравниваю со значением массива
     * @returns {boolean} - Возвращаем boolean на соответсвие параметров
     */

    function setFilterPrice(filterValue, itemValue) {
      switch (filterValue) {
        case 'middle':
          return itemValue >= 10000 && itemValue <= 50000;
          break;
        case 'low':
          return itemValue <= 10000;
          break;
        case 'high':
          return itemValue >= 50000;
          break;
        default: return true;
      }
    }

    var houseFeatures = document.querySelectorAll('.map__checkbox:checked');
    var arrHouseFeatures = Array.from(houseFeatures).map(function (elem) {
      return elem.value;
    });

    function setFilterFeatures(filterValue, itemValue) {
      return filterValue.every(function (elemFilter) {
        return itemValue.some(function (elemValue) {
          return elemFilter === elemValue;
        })
      });
    }


    var typeArray = pinsArray.filter(function (e) {
      return setFilterValues(houseType.value, e.offer.type)
        && setFilterValues(houseRooms.value, e.offer.rooms.toString())
        && setFilterValues(houseQuests.value, e.offer.guests.toString())
        && setFilterPrice(houseTypePrice.value, e.offer.price)
        && setFilterFeatures(arrHouseFeatures, e.offer.features)
        && setFilterFeatures(arrHouseFeatures, e.offer.features);
    });

    window.createPins(typeArray);
  }

  function successHandler(data) {
    pinsArray = data;
    window.createPins(pinsArray);
  }

  form.addEventListener('change', updatePins);

  mainPin.addEventListener('click', function () {
    window.backend.load(successHandler);
  });
})();
