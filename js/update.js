'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var typeSelector = form.querySelector('#housing-type');
  var priceSelector = form.querySelector('#housing-price');
  var roomNumberSelector = form.querySelector('#housing-rooms');
  var guestNumberSelector = form.querySelector('#housing-guests');
  var featuresSelectors = form.querySelectorAll('.map__checkbox');

  var getNeededType = function (data) {
    if (typeSelector.value === 'any') {
      return true;
    } else {
      return typeSelector.value === data.offer.type;
    }
  };

  var getNeededPrice = function (data) {
    switch (priceSelector.value) {
      case 'low':
        return (data.offer.price < 10000);
      case 'middle':
        return (data.offer.price >= 10000 && data.offer.price <= 50000);
      case 'high':
        return (data.offer.price > 50000);
    }
    return true;
  };

  var getNeededRoomNumber = function (data) {
    if (roomNumberSelector.value === 'any') {
      return true;
    } else {
      return roomNumberSelector.value === data.offer.rooms.toString();
    }
  };

  var getNeededGuestNumber = function (data) {
    if (guestNumberSelector.value === 'any') {
      return true;
    } else {
      return guestNumberSelector.value === data.offer.guests.toString();
    }
  };

  var getNeededFeature = function (data) {
    var counter = 0;
    featuresSelectors.forEach(function (featuresSelector) {
      if (featuresSelector.checked === true) {
        counter--;
        for (var i = 0; i < data.offer.features.length; i++) {
          if (data.offer.features[i] === featuresSelector.value) {
            counter++;
            break;
          }
        }
      }
    });

    return (counter === 0);
  };

  var applyFilter = function (pins) {
    return pins.filter(function (pin) {
      return getNeededType(pin) && getNeededPrice(pin) && getNeededRoomNumber(pin) && getNeededGuestNumber(pin) && getNeededFeature(pin);
    });
  };

  var updatePins = window.debounce(function () {
    window.card.close();
    window.map.removePins();
    window.map.postPins(applyFilter(window.setup.pins));
  });

  var onFormChange = function () {
    updatePins();
  };

  form.addEventListener('change', onFormChange);

  window.update = {
    updatePins: updatePins
  };
})();
