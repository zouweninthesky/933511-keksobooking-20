'use strict';

(function () {
  var PINS_NUMBER = 5;
  var map = document.querySelector('.map');//
  var mapPinsSection = document.querySelector('.map__pins');

  // Обрабатывает нажатие Escape при открытой карточке
  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.card.closeCard();
    }
  };

  // Выкладывает метки на страницу
  var postPins = function (cards) {
    var takeNumber = cards.length > PINS_NUMBER ? PINS_NUMBER : cards.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(window.pin.renderPin(cards[i]));
    }
    mapPinsSection.appendChild(fragment);
  };

  // Удаляет метки со страницы
  var removePins = function () {
    var pins = document.querySelector('.map__pins').querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.parentNode.removeChild(pin);
    });
  };

  var renderCard = function (card) {
    window.card.closeCard();
    var newCard = window.card.generateCard(card);
    map.insertBefore(newCard, document.querySelector('.map__filters-container'));
  };

  document.addEventListener('keydown', onCardEscPress);

  window.map = {
    postPins: postPins,
    removePins: removePins,
    renderCard: renderCard
  };
})();
