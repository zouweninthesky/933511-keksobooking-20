'use strict';

(function () {
  var pins = [];

  var typeSelector = document.querySelector('#housing-type');

  var onLoad = function (data) {
    pins = data;
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

  var isType = function (pin) {
    return pin.offer.type === typeSelector.value;
  };

  var updatePins = function () {
    window.card.closeCard();
    window.map.removePins();
    var result = typeSelector.value === 'any' ? pins : pins.filter(isType);
    window.map.postPins(result);
  };

  typeSelector.addEventListener('change', updatePins);

  window.backend.load(onLoad, onError);

  window.update = {
    updatePins: updatePins
  };
})();
