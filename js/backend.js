'use strict';

(function () {
  var DOWN_URL = 'https://javascript.pages.academy/keksobooking/data';
  var UP_URL = 'https://javascript.pages.academy/keksobooking';
  var TIMEOUT_IN_MS = 10000;

  var createXhr = function (onSuccess, onError) {
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
      onError();
    });
    xhr.addEventListener('timeout', function () {
      onError();
    });

    xhr.timeout = TIMEOUT_IN_MS;
    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open('GET', DOWN_URL);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);

    xhr.open('POST', UP_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
