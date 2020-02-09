'use strict';

(function () {
  window.createPins = function (cardOffers) {
    var templateContent = document.querySelector('#pin').content;
    var mapPins = document.querySelector('.map__pins');
    var createFragment = document.createDocumentFragment();
    var MAX_PINS = 5;
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
        pinMapTemplate.addEventListener('click', window.card(cardOffers[i]));
      }
    }
  };
})();
