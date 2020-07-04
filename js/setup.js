'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var mapFieldsets = mapFilters.children;
  var adFieldsets = adForm.querySelectorAll('fieldset');

  var onLoad = function (data) {
    activeState(data);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; line-height: 80px';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';
    node.style.textTransform = 'uppercase';
    node.style.letterSpacing = '10px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

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
      window.backend.load(onLoad, onError);
      window.form.getCoordinates();
    }
    if (evt.key === 'Enter') {
      window.backend.load(onLoad, onError);
    }
  };

  // Навешивает стартовые обработчики
  var startingMainPinListeners = function () {
    mainPin.addEventListener('mousedown', startingMainPinListenersConditions);
    mainPin.addEventListener('keydown', startingMainPinListenersConditions);
  };

  // Задаёт Активное состояние страницы
  var activeState = function (mocks) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFilters.classList.remove('map__filters--disabled');
    changeFormDisability(mapFieldsets, 0);
    changeFormDisability(adFieldsets, 0);
    window.map.postPins(mocks);
    switchMainPinListeners();
  };

  // Задаёт Неактивное состояние страницы
  var disabledState = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapFilters.classList.add('map__filters--disabled');
    changeFormDisability(mapFieldsets, 1);
    changeFormDisability(adFieldsets, 1);
    startingMainPinListeners();
  };

  window.setup = {
    disabledState: disabledState
  };
})();
