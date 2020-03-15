'use strict';

(function () {
  function createCard(item) {
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

      closePopup();

      popupPinTemplate.querySelector('.popup__features').innerHTML = '';
      popupPinTemplate.querySelector('.popup__photos').innerHTML = '';

      item.offer.features.forEach(function (i) {
        var elementFeaturesLi = document.createElement('li');
        elementFeaturesLi.classList.add('popup__feature');
        elementFeaturesLi.classList.add('popup__feature--' + i);
        popupPinTemplate.querySelector('.popup__features').appendChild(elementFeaturesLi);
      });

      item.offer.photos.forEach(function (elem, i) {
        var elementPicturesImg = document.createElement('img');
        elementPicturesImg.width = 44;
        elementPicturesImg.height = 40;
        popupPinTemplate.querySelector('.popup__photos').appendChild(elementPicturesImg);
        popupPinTemplate.querySelector('.popup__photos').appendChild(elementPicturesImg).src = elem;
        popupPinTemplate.querySelector('.popup__photos').appendChild(elementPicturesImg).alt = 'Фотография жилья';
        popupPinTemplate.querySelectorAll('.popup__photos img')[i].style = 'margin-right: 5px; margin-bottom: 5px';
      });

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
  }

  /**
   * @description Удаление/закрытие попап карточки
   */

  function closePopup() {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  }
  window.card = {
    create: createCard,
    close: closePopup
  };
})();
