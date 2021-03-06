'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var SERVER_URL_DATA = SERVER_URL + '/data';
  var SERVER_TIMEOUT = 10000;
  var code = {
    SUCCESS: 200
  };

  /**
   * @description - Функция настроики вывода ошибок и успеха
   * @param onSuccess - Параметр для вывода успеха
   * @param onError - Параметр для вывода ошибки
   * @returns {XMLHttpRequest}
   */

  function setup(onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === code.SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = SERVER_TIMEOUT;
    return xhr;
  }

  /**
   * @description - Функция отправки данных
   * @param data - Данные об отправки
   * @param onSuccess - Параметр вывода успешной отрпавки
   * @param onError - Параметр вывода ошибки
   */

  function upload(data, onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  /**
   * @description - Функция загрузки данных
   * @param onSuccess - Параметр вывода успешной отрпавки
   * @param onError - Параметр вывода ошибки
   */

  function load(onSuccess, onError) {
    var xhr = setup(onSuccess, onError);
    xhr.open('GET', SERVER_URL_DATA);
    xhr.send();
  }

  window.backend = {
    upload: upload,
    load: load
  };
})();
