'use strict';

(function () {
  var DOWN_URL = 'https://javascript.pages.academy/keksobooking/data';
  var TIMEOUT_IN_MS = 10000;

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + ' с');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', DOWN_URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
