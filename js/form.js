'use strict';

(function () {
  var MAX_PRICE = 1000000;
  var DEFAULT_UPLOAD_IMG = 'img/muffin-grey.svg';
  var Guest = {
    MAX: 100,
    NONE: 0
  };
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
  var price = noticeForm.querySelector('#price');
  var formFieldset = noticeForm.querySelectorAll('fieldset');
  var templateSucces = document.querySelector('#success').content.cloneNode(true);
  var templateError = document.querySelector('#error').content.cloneNode(true);
  var onValidationInput = window.debounce(inputsValidition);

  function resetForm() {
    var errorText = document.querySelectorAll('.field-error__text');
    if (errorText) {
      errorText.forEach(function (elem) {
        elem.previousElementSibling.style = '';
        elem.remove();
      });
    }

    imgPreview.src = DEFAULT_UPLOAD_IMG;
    new FileUploader().removePicture(photoBlock);
    noticeForm.reset();
  }

  function resetMap() {
    window.form.reset();
    window.pinMove.resetPositionPin();
    window.page.deactivatePage();
    window.render.removePins();
    window.filter.reset();
    window.card.close();
  }

  function activateForm() {
    noticeForm.classList.remove('ad-form--disabled');
    formFieldset.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
  }

  function deactivateForm() {
    window.utils.fieldAddress.value = window.pinMove.positionPins.x + ' , ' + window.pinMove.positionPins.y;
    noticeForm.classList.add('ad-form--disabled');
    formFieldset.forEach(function (elem) {
      elem.setAttribute('disabled', '');
    });
  }

  /**
   * @description - Закрытие модального окна после отправки формы
   * @param evt - Возвращает событие
   */

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
    mainBlock.appendChild(templateSucces);
    resetMap();

    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
  }

  /**
   * @description - Показывает модальное окно ошибки после отправки формы
   */

  function showError() {
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
   * @description - валидация поля названия жилья и цены
   * @param e - Возвращает элемент input
   */

  function inputsValidition(e) {
    var fieldValue = e.target.value.length;
    var elementText = document.createElement('span');
    elementText.style.color = 'red';
    elementText.className = 'field-error__text';
    e.target.style.borderColor = 'red';
    e.preventDefault();
    e.target.focus();

    if (!e.target.parentElement.querySelector('.field-error__text')) {
      e.target.parentElement.appendChild(elementText);
    }

    var textError = e.target.closest('.ad-form__element').querySelector('.field-error__text');
    if (e.target.validity.tooShort) {
      textError.textContent = 'Заголовок не может быть короче 30 символов, сейчас символов ' + fieldValue;
    } else if (e.target.validity.valueMissing) {
      textError.textContent = 'Заполните это поле';
    } else if (e.target.validity.rangeOverflow) {
      textError.innerHTML = 'Жилье не может стоить больше <br> 1 0000 000р за ночь';
    } else if (e.target.validity.rangeUnderflow) {
      textError.innerHTML = 'Жилье не может стоить меньше <br>' + e.target.min;
    } else if (e.target.validity.valid) {
      e.target.classList.remove('field-error__text');
      e.target.style = '';
      textError.remove();
    }
  }

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
      if (Number(elem.value) === Guest.NONE && value === Guest.MAX) {
        elem.style.display = 'block';
      } else if (Number(elem.value) <= value && Number(elem.value) !== Guest.NONE && value !== Guest.MAX) {
        elem.style.display = 'block';
      }
    });

    if (value >= Guest.MAX) {
      capacity.value = Guest.NONE;
    } else if (value !== Number(capacity.value)) {
      capacity.value = e.target.value;
    }
  });

  inputAvatar.addEventListener('change', function () {
    new FileUploader().addPicture(inputAvatar, true, imgAvatar);
  });

  inputImages.addEventListener('change', function () {
    new FileUploader().addPicture(inputImages, false, imgApartament);
  });

  btnReset.addEventListener('click', resetMap);

  fieldType.addEventListener('change', validationTypeHouse);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), showSuccess, showError);
  });

  deactivateForm();

  window.form = {
    reset: resetForm,
    deactivate: deactivateForm,
    activate: activateForm
  };
})();
