'use strict';

(function () {
  var MAX_PINS = 5;
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };
  var createFragment = document.createDocumentFragment();
  var templateContent = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      pins.forEach(function (i) {
        i.remove();
      });
    }
  }

  function createPins(cardOffers) {
    for (var i = 0; i < MAX_PINS; i++) {
      var pinMapTemplate = templateContent.querySelector('.map__pin').cloneNode(true);
      if (cardOffers[i]) {
        pinMapTemplate.querySelector('img').src = cardOffers[i].author.avatar;
        pinMapTemplate.querySelector('img').alt = cardOffers[i].offer.title;
        pinMapTemplate.style.left = cardOffers[i].location.x - (Pin.WIDTH / 2) + 'px';
        pinMapTemplate.style.top = cardOffers[i].location.y - Pin.HEIGHT + 'px';
        createFragment.appendChild(pinMapTemplate);
        mapPins.appendChild(createFragment);
        pinMapTemplate.addEventListener('click', window.card.create(cardOffers[i]));
      }
    }
  }

  window.render = {
    createPins: createPins,
    removePins: removePins
  };
})();
