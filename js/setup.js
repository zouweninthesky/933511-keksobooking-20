'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var mapFieldsets = mapFilters.children;
  var adFieldsets = adForm.querySelectorAll('fieldset');

  var changeFormDisability = function (fieldset, flag) {
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = flag ? true : false;
    }
  };

  // Снимает стартовые обработчики, навешивает координатный
  var switchMainPinListeners = function () {
    mainPin.removeEventListener('mousedown', startingMainPinListenersConditions);
    mainPin.removeEventListener('keydown', startingMainPinListenersConditions);
    mainPin.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        window.form.getCoordinates();
      }
    });
  };

  // Условия срабатывания стартовых обработчиков
  var startingMainPinListenersConditions = function (evt) {
    if (evt.button === 0) {
      activeState();
      window.form.getCoordinates();
    }
    if (evt.key === 'Enter') {
      activeState();
    }
  };

  // Навешивает стартовые обработчики
  var startingMainPinListeners = function () {
    mainPin.addEventListener('mousedown', startingMainPinListenersConditions);
    mainPin.addEventListener('keydown', startingMainPinListenersConditions);
  };

  // Задаёт Активное состояние страницы
  var activeState = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    changeFormDisability(mapFieldsets, false);
    changeFormDisability(adFieldsets, false);
    window.update.updatePins();
    switchMainPinListeners();
  };

  // Задаёт Неактивное состояние страницы
  var disabledState = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    changeFormDisability(mapFieldsets, true);
    changeFormDisability(adFieldsets, true);
    startingMainPinListeners();
  };

  window.setup = {
    disabledState: disabledState
  };
})();
