'use strict';

(function () {
  var MAX_PINS = 5;
  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (pins) {
      for (var i = 0; i < pins.length; i++) {
        pins[i].remove();
      }
    }
  }

  function createPins(cardOffers) {
    var templateContent = document.querySelector('#pin').content;
    var mapPins = document.querySelector('.map__pins');
    var createFragment = document.createDocumentFragment();


    for (var i = 0; i < MAX_PINS; i++) {
      var pinMapTemplate = templateContent.querySelector('.map__pin').cloneNode(true);
      var widthPin = pinMapTemplate.querySelector('img').width;
      var heightPin = pinMapTemplate.querySelector('img').height + 24;
      if (cardOffers[i]) {
        pinMapTemplate.querySelector('img').src = cardOffers[i].author.avatar;
        pinMapTemplate.querySelector('img').alt = cardOffers[i].offer.title;
        pinMapTemplate.style.left = cardOffers[i].location.x - widthPin + 'px';
        pinMapTemplate.style.top = cardOffers[i].location.y - heightPin + 'px';
        createFragment.appendChild(pinMapTemplate);
        mapPins.appendChild(createFragment);
        pinMapTemplate.addEventListener('click', window.card.createCard(cardOffers[i]));
      }
    }
  }

  window.render = {
    createPins: createPins,
    removePins: removePins
  };
})();
