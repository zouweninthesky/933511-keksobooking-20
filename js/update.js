'use strict';

(function () {
  var typeSelector = document.querySelector('#housing-type');

  var getNeededType = function (pin) {
    return pin.offer.type === typeSelector.value;
  };

  var updatePins = function () {
    window.card.closeCard();
    window.map.removePins();
    var result = typeSelector.value === 'any' ? window.data.pins : window.data.pins.filter(getNeededType);
    window.map.postPins(result);
  };

  typeSelector.addEventListener('change', updatePins);

  window.update = {
    updatePins: updatePins
  };
})();
