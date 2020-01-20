'use strict';

(function () {
  window.card = function (item) {
    return function () {
      var createFragment = document.createDocumentFragment();
      var templateContent = document.querySelector('#card').content;
      var map = document.querySelector('.map');
      var popupPinTemplate = templateContent.querySelector('.popup').cloneNode(true);
      var offerType = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'
      };

      function closePopup() {
        var popup = document.querySelector('.popup');
        if (popup) {
          popup.remove();
        }
      }

      closePopup();

      popupPinTemplate.querySelector('.popup__features').innerHTML = '';
      popupPinTemplate.querySelector('.popup__photos').innerHTML = '';

      for (var i = 0; i < item.offer.features.length; i++) {
        var elementFeaturesLi = document.createElement('li');
        elementFeaturesLi.classList.add('popup__feature');
        elementFeaturesLi.classList.add('popup__feature--' + item.offer.features[i]);
        popupPinTemplate.querySelector('.popup__features').appendChild(elementFeaturesLi);
      }

      for (var j = 0; j < item.offer.photos.length; j++) {
        var elementPicturesImg = document.createElement('img');
        elementPicturesImg.width = 44;
        elementPicturesImg.height = 40;
        popupPinTemplate.querySelector('.popup__photos').appendChild(elementPicturesImg);
        popupPinTemplate.querySelector('.popup__photos').appendChild(elementPicturesImg).src = item.offer.photos[j];
        popupPinTemplate.querySelector('.popup__photos').appendChild(elementPicturesImg).alt = 'Фотография жилья';
      }

      popupPinTemplate.querySelector('.popup__avatar').src = item.author.avatar;
      popupPinTemplate.querySelector('.popup__avatar').alt = item.offer.title;
      popupPinTemplate.querySelector('.popup__title').textContent = item.offer.title;
      popupPinTemplate.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
      popupPinTemplate.querySelector('.popup__text--address').textContent = item.offer.address;
      popupPinTemplate.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
      popupPinTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
      popupPinTemplate.querySelector('.popup__description').textContent = item.offer.description;
      popupPinTemplate.querySelector('.popup__type').textContent = offerType[item.offer.type];

      createFragment.appendChild(popupPinTemplate);
      map.appendChild(createFragment);

      popupPinTemplate.querySelector('.popup__close').addEventListener('click', closePopup);
      document.addEventListener('keydown', function (evt) {
        if (window.utils.isEscEvent(evt)) {
          closePopup();
        }
      });
    };
  };
})();
