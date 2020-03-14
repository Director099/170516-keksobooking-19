'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var houseType = document.querySelector('#housing-type');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseQuests = document.querySelector('#housing-guests');
  var houseTypePrice = document.querySelector('#housing-price');

  function resetFilter() {
    form.reset();
  }

  function updatePins() {
    window.card.closePopup();
    window.render.removePins();
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

    var typeArray = window.filter.pinsArray.filter(function (e) {
      return setFilterValues(houseType.value, e.offer.type)
        && setFilterValues(houseRooms.value, e.offer.rooms.toString())
        && setFilterValues(houseQuests.value, e.offer.guests.toString())
        && setFilterPrice(houseTypePrice.value, e.offer.price)
        && setFilterFeatures(arrHouseFeatures, e.offer.features)
        && setFilterFeatures(arrHouseFeatures, e.offer.features);
    });

    window.render.createPins(typeArray);
  }

  var onHousingFilter = window.debounce(function () {
    updatePins();
  });

  /**
   * @description Обработчик успеха, из полученных данных загружаю создаю пины
   * @param data - Получаю из аякса массив обьектов
   */

  function successHandler(data) {
    window.filter.pinsArray = data;
    window.render.createPins(window.filter.pinsArray);
  }

  form.addEventListener('change', onHousingFilter);

  window.filter = {
    pinsArray: [],
    successHandler: successHandler,
    resetFilter: resetFilter
  }
})();
