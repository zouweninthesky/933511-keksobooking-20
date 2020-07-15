'use strict';

(function () {

  var closeMessage = function () {
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    }
    if (document.querySelector('.error')) {
      document.querySelector('.error').remove();
    }
    document.removeEventListener('click', closeMessage);
    document.removeEventListener('keydown', onMessageEscPress);
  };

  var onMessageEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  var showMessage = function (popup) {
    document.querySelector('main').insertAdjacentElement('afterbegin', popup);
    document.addEventListener('click', closeMessage);
    document.addEventListener('keydown', onMessageEscPress);
  };

  window.message = {
    showMessage: showMessage
  };
})();
