'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var typeSelector = form.querySelector('#housing-type');
  var priceSelector = form.querySelector('#housing-price');
  var roomNumberSelector = form.querySelector('#housing-rooms');
  var guestNumberSelector = form.querySelector('#housing-guests');
  var featuresSelectors = form.querySelectorAll('.map__checkbox');
  var ANY_VALUE = 'any';
  var priceCategoriesNames = {
    low: 'low',
    middle: 'middle',
    high: 'high'
  };
  var priceCategoriesValues = {
    low: 10000,
    high: 50000
  };

  var getNeededType = function (data) {
    return typeSelector.value === ANY_VALUE || typeSelector.value === data.offer.type;
  };

  var getNeededPrice = function (data) {
    switch (priceSelector.value) {
      case priceCategoriesNames.low:
        return (data.offer.price < priceCategoriesValues.low);
      case priceCategoriesNames.middle:
        return (data.offer.price >= priceCategoriesValues.low && data.offer.price <= priceCategoriesValues.high);
      case priceCategoriesNames.high:
        return (data.offer.price > priceCategoriesValues.high);
    }
    return true;
  };

  var getNeededRoomNumber = function (data) {
    return roomNumberSelector.value === ANY_VALUE || roomNumberSelector.value === data.offer.rooms.toString();
  };

  var getNeededGuestNumber = function (data) {
    return guestNumberSelector.value === ANY_VALUE || guestNumberSelector.value === data.offer.guests.toString();
  };

  var getNeededFeature = function (data) {
    var counter = 0;
    featuresSelectors.forEach(function (featuresSelector) {
      if (featuresSelector.checked) {
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
