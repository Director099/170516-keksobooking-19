'use strict';

(function () {
  var createFragment = document.createDocumentFragment();
  var map = document.querySelector('.map');
  var templateContent = document.querySelector('#card').content;
  var popupPinTemplate = templateContent.querySelector('.popup').cloneNode(true);
  var popupPhotoItem = templateContent.querySelector('.popup__photo');
  var popupAvatar = popupPinTemplate.querySelector('.popup__avatar');
  var popupFeatur = popupPinTemplate.querySelector('.popup__features');
  var popupTitle = popupPinTemplate.querySelector('.popup__title');
  var popupPhotos = popupPinTemplate.querySelector('.popup__photos');
  var popupPrice = popupPinTemplate.querySelector('.popup__text--price');
  var popupAddress = popupPinTemplate.querySelector('.popup__text--address');
  var popupCapacity = popupPinTemplate.querySelector('.popup__text--capacity');
  var popupTime = popupPinTemplate.querySelector('.popup__text--time');
  var popupDescription = popupPinTemplate.querySelector('.popup__description');
  var popupType = popupPinTemplate.querySelector('.popup__type');
  var offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  function createCard(item) {
    return function () {
      closePopup();

      popupFeatur.innerHTML = '';
      popupPhotos.innerHTML = '';

      item.offer.features.forEach(function (elem) {
        var elementFeaturesLi = document.createElement('li');
        elementFeaturesLi.classList.add('popup__feature');
        elementFeaturesLi.classList.add('popup__feature--' + elem);
        popupFeatur.appendChild(elementFeaturesLi);
      });

      item.offer.photos.forEach(function (elem) {
        var clonedPhotosElement = popupPhotoItem.cloneNode(true);
        clonedPhotosElement.src = elem;
        popupPhotos.appendChild(clonedPhotosElement);
      });

      popupAvatar.src = item.author.avatar;
      popupAvatar.alt = item.offer.title;
      popupTitle.textContent = item.offer.title;
      popupPrice.textContent = item.offer.price + ' ₽/ночь';
      popupAddress.textContent = item.offer.address;
      popupCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
      popupTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
      popupDescription.textContent = item.offer.description;
      popupType .textContent = offerType[item.offer.type];

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
