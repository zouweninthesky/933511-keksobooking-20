'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var submit = form.querySelector('.ad-form__submit');
  var reset = form.querySelector('.ad-form__reset');
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');

  var resetForm = function () {
    form.reset();
    window.setup.disabledState();
    window.map.removePins();
    var card = document.querySelector('.map__card');
    if (card) {
      window.card.closeCard(card);
    }
    window.form.getCoordinates();
  };

  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, onLoad, onError);
  });

  var onLoad = function () {
    window.message.showMessage(successPopup);
    resetForm();
  };

  var onError = function () {
    window.message.showMessage(errorPopup);
  };

  reset.addEventListener('click', resetForm);

  window.save = {
  };
})();