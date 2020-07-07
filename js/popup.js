'use strict';

(function () {
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');

  var closeSuccess = function () {
    successPopup.parentNode.removeChild(successPopup);
    document.removeEventListener('click', closeSuccess);
    document.removeEventListener('keydown', closeSuccessEsc);
  };

  var closeSuccessEsc = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccess();
    }
  };

  var showSuccessPopup = function () {
    document.body.insertAdjacentElement('afterbegin', successPopup);
    document.addEventListener('click', closeSuccess);
    document.addEventListener('keydown', closeSuccessEsc);
  };

  var closeError = function () {
    errorPopup.parentNode.removeChild(errorPopup);
    document.removeEventListener('click', closeError);
    document.removeEventListener('keydown', closeErrorEsc);
  };

  var closeErrorEsc = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeError();
    }
  };

  var showErrorPopup = function () {
    document.body.insertAdjacentElement('afterbegin', errorPopup);
    document.addEventListener('click', closeError);
    document.addEventListener('keydown', closeErrorEsc);
  };

  window.popup = {
    showSuccessPopup: showSuccessPopup,
    showErrorPopup: showErrorPopup
  };
})();
