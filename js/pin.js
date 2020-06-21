'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content;

  // Отрисовывает метку по полученным данным
  var renderPin = function (card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('button').style.left = card.location.x - window.util.PIN_WIDTH_HALF + 'px';
    pinElement.querySelector('button').style.top = card.location.y - window.util.PIN_HEIGHT + 'px';
    pinElement.querySelector('img').src = card.author.avatar;
    pinElement.querySelector('img').alt = card.offer.title;

    return pinElement;
  };

  // Выкладывает метки на страницу
  window.pin = {
    postPins: function (cards) {
      var fragment = document.createDocumentFragment();
      cards.forEach(function (card) {
        fragment.appendChild(renderPin(card));
      });
      mapPins.appendChild(fragment);
    }
  };


})();
