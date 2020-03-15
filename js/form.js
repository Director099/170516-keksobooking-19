'use strict';

(function () {
  var MAX_NUMBER_GUESTS = 100;
  var DEFAULT_UPLOAD_IMG = 'img/muffin-grey.svg';
  var MAX_PRICE = 1000000;
  var typeSelect = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  var noticeForm = document.querySelector('.ad-form');
  var mainBlock = document.querySelector('main');
  var imgPreview = noticeForm.querySelector('.ad-form-header__preview img');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var optionCapacity = capacity.querySelectorAll('option');
  var inputsRequired = noticeForm.querySelectorAll('input[required]');
  var fieldType = noticeForm.querySelector('#type');
  var inputAvatar = noticeForm.querySelector('#avatar');
  var imgAvatar = noticeForm.querySelector('.ad-form-header__preview img');
  var inputImages = noticeForm.querySelector('#images');
  var imgApartament = noticeForm.querySelector('.ad-form__photo');
  var photoBlock = noticeForm.querySelector('.ad-form__photo-container');
  var btnReset = noticeForm.querySelector('.ad-form__reset');
  var price = document.querySelector('#price');


  /**
   * @description - Закрытие модального окна после отправки формы
   * @param evt - Возвращает событие
   */

  function resetForm() {
    var errorText = document.querySelectorAll('.field-error__text');
    if (errorText) {
      errorText.forEach(function (elem) {
        elem.remove();
      });
    }

    imgPreview.src = DEFAULT_UPLOAD_IMG;
    window.fileField.removePicture(photoBlock);
    noticeForm.reset();
  }

  function resetMap() {
    window.form.reset();
    window.pinMove.resetPositionPin();
    window.map.deactivateCard();
    window.render.removePins();
    window.filter.reset();
    window.card.close();
  }

  function closeModal(evt) {
    var mainModalSuccess = mainBlock.querySelector('.success');
    var mainModalError = mainBlock.querySelector('.error');

    if (mainModalSuccess) {
      mainModalSuccess.remove();
    }

    if (mainModalError) {
      mainModalError.remove();
    }

    document.removeEventListener('click', closeModal);
    if (window.utils.isEscEvent(evt)) {
      document.removeEventListener('keydown', closeModal);
    }
  }

  /**
   * @description - Показывает модальное окно после успешной отправки
   */

  function showSuccess() {
    var templateSucces = document.querySelector('#success').content.cloneNode(true);
    mainBlock.appendChild(templateSucces);
    resetMap();

    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
  }

  /**
   * @description - Показывает модальное окно ошибки после отправки формы
   */

  function showError() {
    var templateError = document.querySelector('#error').content.cloneNode(true);
    mainBlock.appendChild(templateError);
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
  }

  /**
   * @description - валидация типа жилья
   */

  function validationTypeHouse() {
    price.placeholder = typeSelect[fieldType.value];
    price.min = typeSelect[fieldType.value];
    price.max = MAX_PRICE;
  }

  /**
   * @description - валидация поля названия жилья
   * @param e - Возвращает элемент input
   */

  function inputsValidition(e) {
    var elementText = document.createElement('span');
    elementText.style.color = 'red';
    elementText.className = 'field-error__text';
    e.target.style.borderColor = 'red';
    var elemError = e.target.closest('.ad-form__element');
    var fieldValue = e.target.value.length;
    e.preventDefault();
    if (!e.target.parentElement.querySelector('.field-error__text')) {
      e.target.parentElement.appendChild(elementText);
    }

    e.target.focus();
    validationTypeHouse();
    if (e.target.validity.tooShort) {
      elemError.querySelector('.field-error__text').textContent = 'Заголовок не может быть короче 30 символов, сейчас символов ' + fieldValue;
    } else if (e.target.validity.valueMissing) {
      elemError.querySelector('.field-error__text').textContent = 'Заполните это поле';
    } else if (e.target.validity.rangeOverflow) {
      elemError.querySelector('.field-error__text').innerHTML = 'Жилье не может стоить больше <br> 1 0000 000р за ночь';
    } else if (e.target.validity.rangeUnderflow) {
      elemError.querySelector('.field-error__text').innerHTML = 'Жилье не может стоить меньше <br>' + e.target.min;
    } else if (e.target.validity.valid) {
      e.target.classList.remove('field-error__text');
      e.target.style = '';
      e.target.parentElement.querySelector('.field-error__text').remove();
    }
  }

  var onValidationInput = window.debounce(inputsValidition);

  inputsRequired.forEach(function (elem) {
    elem.addEventListener('invalid', inputsValidition);
    elem.addEventListener('input', onValidationInput);
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  roomNumber.addEventListener('change', function (e) {
    var value = Number(e.target.value);

    optionCapacity.forEach(function (elem) {
      elem.style.display = 'none';
      if (Number(elem.value) === 0 && value === MAX_NUMBER_GUESTS) {
        elem.style.display = 'block';
      } else if (Number(elem.value) <= value && Number(elem.value) !== 0 && value !== MAX_NUMBER_GUESTS) {
        elem.style.display = 'block';
      }
    });

    if (value >= MAX_NUMBER_GUESTS) {
      capacity.value = 0;
    } else if (value !== Number(capacity.value)) {
      capacity.value = e.target.value;
    }
  });

  inputAvatar.addEventListener('change', function () {
    window.fileField.addPicture(inputAvatar, true, imgAvatar);
  });

  inputImages.addEventListener('change', function () {
    window.fileField.addPicture(inputImages, false, imgApartament);
  });

  btnReset.addEventListener('click', resetMap);

  fieldType.addEventListener('change', validationTypeHouse);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), showSuccess, showError);
  });

  window.form = {
    reset: resetForm
  };
})();
