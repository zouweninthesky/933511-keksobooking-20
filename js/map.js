'use strict';

(function () {
  var map = document.querySelector('.map');//
  var mapPinsSection = document.querySelector('.map__pins');

  // Обрабатывает нажатие Escape при открытой карточке
  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var card = document.querySelector('.map__card');
      if (card) {
        window.card.closeCard(card);
      }
    }
  };

  // Выкладывает метки на страницу
  var postPins = function (cards) {
    var fragment = document.createDocumentFragment();
    cards.forEach(function (card) {
      fragment.appendChild(window.pin.renderPin(card));
    });
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
    var oldCard = map.querySelector('.map__card');
    if (oldCard) {
      window.card.closeCard(oldCard);
    }
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
