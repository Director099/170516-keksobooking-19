'use strict';

(function () {
  var noticeForm = document.querySelector('.ad-form');
  var timeIn = noticeForm.querySelector('#timein');
  var timeOut = noticeForm.querySelector('#timeout');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var optionCapacity = capacity.querySelectorAll('option');
  var inputsRequired = noticeForm.querySelectorAll('input[required]');
  var fieldType = noticeForm.querySelector('#type');

  function validationTypeHouse() {
    var price = document.querySelector('#price');
    var maxPrice = 1000000;
    var typeSelect = {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    };

    price.placeholder = typeSelect[fieldType.value];
    price.min = typeSelect[fieldType.value];
    price.max = maxPrice;
  }

  function inputsValidition(e) {
    var elementText = document.createElement('span');
    elementText.className = 'field-error__text';
    var elemError = e.target.closest('.ad-form__element');
    var fieldValue = e.target.value.length;
    e.preventDefault();
    e.target.classList.add('field-error');
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
      e.target.parentElement.querySelector('.field-error__text').remove();
    }
  }

  for (var j = 0; j < inputsRequired.length; j++) {
    inputsRequired[j].addEventListener('invalid', inputsValidition);
    inputsRequired[j].addEventListener('input', inputsValidition);
  }

  timeIn.addEventListener('change', function () {
    if (timeIn.value !== timeOut.value) {
      timeOut.value = timeIn.value;
    }
  });
  timeOut.addEventListener('change', function () {
    if (timeOut.value !== timeIn.value) {
      timeIn.value = timeOut.value;
    }
  });
  roomNumber.addEventListener('change', function (e) {
    var value = Number(e.target.value);

    for (var i = 0; i < optionCapacity.length; i++) {
      optionCapacity[i].style.display = 'none';

      if (Number(optionCapacity[i].value) === 0 && value === 100) {
        optionCapacity[i].style.display = 'block';
      } else if (Number(optionCapacity[i].value) <= value && Number(optionCapacity[i].value) !== 0 && value !== 100) {
        optionCapacity[i].style.display = 'block';
      }
    }

    if (value >= 100) {
      capacity.value = 0;
    } else if (value !== Number(capacity.value)) {
      capacity.value = e.target.value;
    }
  });

  fieldType.addEventListener('change', validationTypeHouse);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(noticeForm), alert('Успешная отправка формы'), alert);
  });
})();
