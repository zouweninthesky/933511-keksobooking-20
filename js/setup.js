'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var mapFieldsets = mapFilters.querySelectorAll('fieldset, select');
  var adFieldsets = adForm.querySelectorAll('fieldset');
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var pins = [];

  var onLoad = function (data) {
    window.setup.pins = data;
    window.update.updatePins();
  };

  var onError = function () {
    window.message.show(errorPopup);
  };

  var changeFormDisability = function (fieldsets, isEnabled) {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = isEnabled ? true : false;
    });
  };

  var switchMainPinListeners = function () {
    mainPin.removeEventListener('mousedown', onMainPinStartClick);
    mainPin.removeEventListener('keydown', onMainPinStartClick);
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        window.form.getCoordinates();
      }
    });
  };

  var onMainPinStartClick = function (evt) {
    if (evt.button === 0) {
      activeState();
      window.form.getCoordinates();
    }
    if (evt.key === 'Enter') {
      activeState();
    }
  };

  var startingMainPinListeners = function () {
    mainPin.addEventListener('mousedown', onMainPinStartClick);
    mainPin.addEventListener('keydown', onMainPinStartClick);
  };

  var activeState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    changeFormDisability(mapFieldsets, false);
    changeFormDisability(adFieldsets, false);
    window.backend.load(onLoad, onError);
    switchMainPinListeners();
  };

  var disabledState = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    changeFormDisability(mapFieldsets, true);
    changeFormDisability(adFieldsets, true);
    startingMainPinListeners();
  };

  window.setup = {
    pins: pins,
    disabledState: disabledState
  };
})();
