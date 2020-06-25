'use strict';

// Позже добавлю сюда связь между меткой и карточкой
(function () {
  // temp
  var map = document.querySelector('.map');
  window.pin.postPins(window.data.mocks);
  var mapPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

  var closeCard = function (card) {
    card.parentNode.removeChild(card);
  }

  var onCardEscPress = function (card, evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      console.log(card);
      closeCard(card);
    }
  };

  var renderCard = function (i) {
    var oldCard = map.querySelector('.map__card');
    if(oldCard) {
      closeCard(oldCard);
      document.removeEventListener('keydown', test);
    }
    var newCard = window.card.generateCard(window.data.mocks[i]);
    map.insertBefore(newCard, document.querySelector('.map__filters-container'));
    if(newCard) {
      newCard.querySelector('.popup__close').addEventListener('click', function() {
        closeCard(newCard);
      });
      var test = onCardEscPress.bind(this, newCard)
      document.addEventListener('keydown', test);
    }
// Не настроено закрытие через Escape

  }

    for (const [i, pin] of mapPins.entries()) {
      pin.addEventListener('click', function () {
        renderCard(i);
      });
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          renderCard(i);
        }
      });
    }

  // temp Помещает карточку объявления в разметку перед .map__filters-container

})();
