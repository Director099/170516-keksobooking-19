'use strict';

function Card() {
  this.createFragment = document.createDocumentFragment();
  this.templateContent = document.querySelector('#card').content;
  this.popupPinTemplate = this.templateContent.querySelector('.popup').cloneNode(true);
  this.popupPhotoItem = this.templateContent.querySelector('.popup__photo');
  this.popupAvatar = this.popupPinTemplate.querySelector('.popup__avatar');
  this.popupFeatur = this.popupPinTemplate.querySelector('.popup__features');
  this.popupTitle = this.popupPinTemplate.querySelector('.popup__title');
  this.popupPhotos = this.popupPinTemplate.querySelector('.popup__photos');
  this.popupPrice = this.popupPinTemplate.querySelector('.popup__text--price');
  this.popupAddress = this.popupPinTemplate.querySelector('.popup__text--address');
  this.popupCapacity = this.popupPinTemplate.querySelector('.popup__text--capacity');
  this.popupTime = this.popupPinTemplate.querySelector('.popup__text--time');
  this.popupDescription = this.popupPinTemplate.querySelector('.popup__description');
  this.popupType = this.popupPinTemplate.querySelector('.popup__type');
  this.offerType = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
}

Card.prototype = {
  create: function (item) {
    var _this = this;
    return function () {
      _this.close();

      _this.popupFeatur.innerHTML = '';
      _this.popupPhotos.innerHTML = '';

      item.offer.features.forEach(function (elem) {
        var elementFeaturesLi = document.createElement('li');
        elementFeaturesLi.classList.add('popup__feature');
        elementFeaturesLi.classList.add('popup__feature--' + elem);
        _this.popupFeatur.appendChild(elementFeaturesLi);
      });

      item.offer.photos.forEach(function (elem) {
        var clonedPhotosElement = _this.popupPhotoItem.cloneNode(true);
        clonedPhotosElement.src = elem;
        _this.popupPhotos.appendChild(clonedPhotosElement);
      });

      _this.popupAvatar.src = item.author.avatar;
      _this.popupAvatar.alt = item.offer.title;
      _this.popupTitle.textContent = item.offer.title;
      _this.popupPrice.textContent = item.offer.price + ' ₽/ночь';
      _this.popupAddress.textContent = item.offer.address;
      _this.popupCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
      _this.popupTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
      _this.popupDescription.textContent = item.offer.description;
      _this.popupType .textContent = _this.offerType[item.offer.type];

      _this.createFragment.appendChild(_this.popupPinTemplate);
      window.utils.map.appendChild(_this.createFragment);

      _this.popupPinTemplate.querySelector('.popup__close').addEventListener('click', _this.close);
      document.addEventListener('keydown', function (evt) {
        if (window.utils.isEscEvent(evt)) {
          _this.close();
        }
      });
    };
  },
  close: function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  }
};
