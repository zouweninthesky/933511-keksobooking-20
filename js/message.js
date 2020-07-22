'use strict';

(function () {
  var main = document.querySelector('main');

  var closeMessage = function () {
    var successMessage = document.querySelector('.success');
    var errorMessage = document.querySelector('.error');
    if (successMessage) {
      successMessage.remove();
    }
    if (errorMessage) {
      errorMessage.remove();
    }
    document.removeEventListener('click', onMessageClick);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onMessageClick = function () {
    closeMessage();
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === window.util.keyCodes.esc) {
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
