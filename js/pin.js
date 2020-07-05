'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;

  // Отрисовывает метку по полученным данным
  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('button').style.left = card.location.x - window.util.PIN_WIDTH_HALF + 'px';
    pinElement.querySelector('button').style.top = card.location.y - window.util.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = card.author.avatar;
    pinElement.querySelector('img').alt = card.offer.title;

    pinElement.querySelector('button').addEventListener('click', function () {
      window.map.renderCard(card);
    });
    pinElement.querySelector('button').addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.map.renderCard(card);
      }
    });

    return pinElement;
  };

  window.pin = {
    renderPin: renderPin
  };
})();
