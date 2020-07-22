'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;

  var openCard = function (target, data) {
    window.card.close();
    target.classList.add('map__pin--active');
    window.map.renderCard(data);
  };

  var renderPin = function (data) {
    var pin = pinTemplate.cloneNode(true).querySelector('button');

    if (data.offer) {
      pin.style.left = data.location.x - window.util.PIN_WIDTH_HALF + 'px';
      pin.style.top = data.location.y - window.util.PIN_HEIGHT + 'px';
      pin.querySelector('img').src = data.author.avatar;
      pin.querySelector('img').alt = data.offer.title;

      pin.addEventListener('click', function () {
        openCard(pin, data);
      });
      pin.addEventListener('keydown', function (evt) {
        if (evt.key === window.util.keyCodes.ent) {
          openCard(pin, data);
        }
      });
    } else {
      pin.style.display = 'none';
    }
    return pin;
  };

  window.pin = {
    render: renderPin
  };
})();
