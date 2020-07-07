'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var submit = form.querySelector('.ad-form__submit');
  // var reset = form.querySelector('.ad-form__reset');

  var resetForm = function () {
    form.reset();
    window.setup.disabledState();
    window.map.removePins();
  };

  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    var data = new FormData(form);
    window.backend.save(data, onLoad, onError);
  });

  var onLoad = function () {
    window.popup.showSuccessPopup();
    resetForm();
  };

  var onError = function () {
    window.popup.showErrorPopup();
  };

  // reset.addEventListener('click', resetForm);

  window.save = {
  };
})();
