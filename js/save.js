'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var formInputs = form.querySelectorAll('input, select');
  var submit = form.querySelector('.ad-form__submit');
  var reset = form.querySelector('.ad-form__reset');
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');


  var movePinStartPosition = function () {
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
  };

  var resetForm = function () {
    form.reset();
    formInputs.forEach(function (formInput) {
      window.form.removeRedBorder(formInput);
    });
    window.form.changePriceForType();
    window.setup.disabledState();
    window.map.removePins();
    window.card.close();
    movePinStartPosition();
    window.imageUpload.resetImages();
    window.form.getCoordinates();
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    if (window.form.globalCheck()) {
      window.backend.save(data, onLoad, onError);
    }
  };

  var onLoad = function () {
    movePinStartPosition();
    window.message.show(successMessage);
    resetForm();
  };

  var onError = function () {
    window.message.show(errorMessage);
  };

  submit.addEventListener('click', onSubmitClick);
  reset.addEventListener('click', resetForm);

  window.save = {
  };
})();
