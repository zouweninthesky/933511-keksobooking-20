'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;

  var openCard = function (target, data) {
    target.classList.add('map__pin--active');
    window.map.renderCard(data);
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
        openCard(pinElement, data);
      });
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          openCard(pinElement, data);
        }
      });
    } else {
      pinElement.style.display = 'none';
    }
    return pinElement;
  };

  window.pin = {
    render: renderPin
  };
})();
