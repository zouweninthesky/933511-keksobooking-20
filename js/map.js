'use strict';

(function () {
  var PINS_NUMBER = 5;
  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container')
  var mapPinsSection = document.querySelector('.map__pins');

  var postPins = function (cards) {
    var takeNumber = cards.length > PINS_NUMBER ? PINS_NUMBER : cards.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.pin.render(cards[i]));
    }
    mapPinsSection.appendChild(fragment);
  };

  var removePins = function () {
    var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });
  };

  var renderCard = function (card) {
    window.card.close();
    var newCard = window.card.generate(card);
    map.insertBefore(newCard, mapFiltersContainer);
  };

  window.map = {
    postPins: postPins,
    removePins: removePins,
    renderCard: renderCard
  };
})();
