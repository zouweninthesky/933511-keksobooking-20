'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var typeDescription = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

  var renderFeatures = function (container, features) {
    container.innerHTML = '';
    features.forEach(function (feature) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + feature);
      container.appendChild(li);
    });
  };

  var deactivateChosenPin = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var renderPhotos = function (photos, data) {
    if (data.offer.photos[0]) {
      photos.querySelector('img').src = data.offer.photos[0];
      if (data.offer.photos.length > 1) {
        var fragment = document.createDocumentFragment();
        for (var i = 1; i < data.offer.photos.length; i++) {
          var anotherPhoto = photos.querySelector('img').cloneNode(true);
          anotherPhoto.src = data.offer.photos[i];
          fragment.appendChild(anotherPhoto);
        }
        photos.appendChild(fragment);
      }
    } else {
      photos.style.display = 'none';
    }
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card) {
      deactivateChosenPin();
      card.parentNode.removeChild(card);
    }
  };

  var onCardButtonClick = function () {
    closeCard();
  };

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.card.close();
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var checkData = function (destination, data, string) {
    if (data) {
      destination.textContent = string;
    } else {
      destination.style.display = 'none';
    }
  };

  var checkConnectedData = function (destination, data1, data2, string) {
    if (data1 && data2) {
      destination.textContent = string;
    } else {
      destination.style.display = 'none';
    }
  };

  var generateCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var featuresContainer = card.querySelector('.popup__features');
    var photosContainer = card.querySelector('.popup__photos');
    checkData(card.querySelector('.popup__title'), data.offer.title, data.offer.title);
    checkData(card.querySelector('.popup__text--address'), data.offer.address, data.offer.address);
    checkData(card.querySelector('.popup__text--price'), data.offer.price, data.offer.price + '₽/ночь');
    checkData(card.querySelector('.popup__type'), data.offer.type, typeDescription[data.offer.type]);
    checkConnectedData(card.querySelector('.popup__text--capacity'), data.offer.rooms, data.offer.guests, data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей');
    checkConnectedData(card.querySelector('.popup__text--time'), data.offer.checkin, data.offer.checkout, 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout);
    checkData(card.querySelector('.popup__description'), data.offer.description, data.offer.description);
    card.querySelector('.popup__avatar').src = data.author.avatar;
    renderFeatures(featuresContainer, data.offer.features);
    renderPhotos(photosContainer, data);

    card.querySelector('.popup__close').addEventListener('click', onCardButtonClick);
    document.addEventListener('keydown', onCardEscPress);

    return card;
  };

  window.card = {
    generate: generateCard,
    close: closeCard
  };
})();
