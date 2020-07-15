'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;

  var deactivateChosenPin = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var renderPin = function (data) {
    var pinElementFragment = pinTemplate.cloneNode(true);
    var pinElement = pinElementFragment.querySelector('button');

    if (data.offer) {
      pinElement.style.left = data.location.x - window.util.PIN_WIDTH_HALF + 'px';
      pinElement.style.top = data.location.y - window.util.PIN_HEIGHT + 'px';
      pinElement.querySelector('img').src = data.author.avatar;
      pinElement.querySelector('img').alt = data.offer.title;

      pinElement.addEventListener('click', function () {
        pinElement.classList.add('map__pin--active');
        window.map.renderCard(data);
      });
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          pinElement.classList.add('map__pin--active');
          window.map.renderCard(data);
        }
      });
    } else {
      pinElement.style.display = 'none';
    }
    return pinElement;
  };

  window.pin = {
    renderPin: renderPin,
    deactivateChosenPin: deactivateChosenPin
  };
})();
