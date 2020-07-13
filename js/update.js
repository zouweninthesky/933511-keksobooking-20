'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var typeSelector = form.querySelector('#housing-type');
  var priceSelector = form.querySelector('#housing-price');
  var roomNumberSelector = form.querySelector('#housing-rooms');
  var guestNumberSelector = form.querySelector('#housing-guests');
  var featuresSelectors = form.querySelectorAll('.map__checkbox');

  var getNeededType = function (pin) { // yes
    return pin.offer.type === typeSelector.value;
  };

  var getNeededPrice = function (pin) {
    switch (priceSelector.value) {
      case 'low':
        return (pin.offer.price < 10000);
      case 'middle':
        return (pin.offer.price >= 10000 && pin.offer.price <= 50000);
      case 'high':
        return (pin.offer.price > 50000);
    }
    return true;
  };

  var getNeededRoomNumber = function (pin) {
    return pin.offer.rooms.toString() === roomNumberSelector.value;
  };

  var getNeededGuestNumber = function (pin) { //  yes
    return pin.offer.guests.toString() === guestNumberSelector.value;
  };

  var getNeededFeature = function (pin) {
    var counter = 0;
    for (var k = 0; k < featuresSelectors.length; k++) {
      if (featuresSelectors[k].checked === true) {
        counter--;
        for (var i = 0; i < pin.offer.features.length; i++) {
          if (pin.offer.features[i] === featuresSelectors[k].value) {
            counter++;
            break;
          }
        }
      }
    }
    return (counter === 0);
  };

  var applyFilter = function (pins) {
    var result = typeSelector.value === 'any' ? pins : pins.filter(getNeededType);
    result = result.filter(getNeededPrice);
    result = roomNumberSelector.value === 'any' ? result : result.filter(getNeededRoomNumber);
    result = guestNumberSelector.value === 'any' ? result : result.filter(getNeededGuestNumber);
    result = result.filter(getNeededFeature);
    return result;
  };

  var updatePins = function () {
    window.card.closeCard();
    window.map.removePins();
    window.map.postPins(applyFilter(window.data.pins));
  };

  form.addEventListener('change', updatePins);

  window.update = {
    updatePins: updatePins
  };
})();
