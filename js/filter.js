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


    if (houseType.value != 'any') {
      var typeArray = pinsArray.filter(function (e) {
        return e.offer.type === houseType.value;
      });
    }

    if (houseRooms.value != 'any') {
      var typeArrayRes = typeArray.filter(function (e) {
        return e.offer.rooms === Number(houseRooms.value);
      });
      typeArray = typeArrayRes;
      console.log(typeArrayRes);
    }

    if (houseQuests.value != 'any') {
      var typeArrayRes = typeArray.filter(function (e) {
        return e.offer.guests === Number(houseQuests.value);
      });
      console.log(typeArrayRes);
      typeArray = typeArrayRes;
    }

    console.log(typeArray);

    // var filterPins = typeArray.concat(roomsArray).concat(questsArray);
    // var uniquePins = filterPins.filter(function (it, i) {
    //   // return filterPins.indexOf(it) === i;
    // });

    window.createPins(typeArray);
  }

  function successHandler(data) {
    pinsArray = data;
    window.createPins(pinsArray);
  }

  form.addEventListener('change', function () {
    updatePins();
  });

  mainPin.addEventListener('click', function () {
    window.backend.load(successHandler);
  });
})();
