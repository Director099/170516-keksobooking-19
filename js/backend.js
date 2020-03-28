'use strict';

function Server() {
  this.SERVER_URL = 'https://js.dump.academy/keksobooking';
  this.SERVER_URL_DATA = this.SERVER_URL + '/data';
  this.SERVER_TIMEOUT = 10000;
  this.code = {
    SUCCESS: 200
  };
}

Server.prototype = {
  setup: function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    var _this = this;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === _this.code.SUCCESS) {
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

    xhr.timeout = this.SERVER_TIMEOUT;
    return xhr;
  },
  upload: function (data, onSuccess, onError) {
    var xhr = this.setup(onSuccess, onError);
    xhr.open('POST', this.SERVER_URL);
    xhr.send(data);
  },
  load: function (onSuccess, onError) {
    var xhr = this.setup(onSuccess, onError);
    xhr.open('GET', this.SERVER_URL_DATA);
    xhr.send();
  }
};
