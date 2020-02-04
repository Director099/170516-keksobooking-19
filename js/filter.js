'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var houseType = document.querySelector('#housing-type');
  var houseTypePrice = document.querySelector('#housing-price');
  var houseRooms = document.querySelector('#housing-rooms');
  var houseQuests = document.querySelector('#housing-guests');

  var pinsArray = []; // Для фильтрации данных, нужно после загрузки сохранить их чтобы не загружать каждый раз

  function updatePins() {
    var houseArray = pinsArray.filter(function (e) {
      return e.offer.type === houseType.value;
    })


    console.log(houseArray)
    window.createPins(houseArray);
  }

  function successHandler(data) {
    pinsArray = data;
    updatePins();
  }

  houseType.addEventListener('change', function (evt) {
    updatePins();
  });

  mainPin.addEventListener('click', function () {
    window.backend.load(successHandler);
  });
})();
