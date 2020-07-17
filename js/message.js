'use strict';

(function () {
  var main = document.querySelector('main');

  var closeMessage = function () {
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onMessageClick = function () {
    closeMessage();
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var showMessage = function (popup) {
    main.insertAdjacentElement('afterbegin', popup);
    document.addEventListener('click', onMessageClick);
    document.addEventListener('keydown', onMessageEscPress);
  };

  window.message = {
    show: showMessage
  };
})();
