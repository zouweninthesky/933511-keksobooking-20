'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var form = document.querySelector('.ad-form');
  var submit = form.querySelector('.ad-form__submit');
  var reset = form.querySelector('.ad-form__reset');
  var successPopup = document.querySelector('#success').content.querySelector('.success');

  var resetForm = function () {
    form.reset();
    window.form.changePriceForType();
    window.setup.disabledState();
    window.map.removePins();
    window.card.close();
    window.form.getCoordinates();
  };

  var onSubmitClick = function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, onLoad, onError);
  };

  var onLoad = function () {
    mainPin.style.left = '570px';
    mainPin.style.top = '375px';
    window.message.show(successPopup);
    resetForm();
  };

  var onError = function () {
    window.form.globalCheck();
  };

  submit.addEventListener('click', onSubmitClick);
  reset.addEventListener('click', resetForm);

  window.save = {
  };
})();
