'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('article');
  var typeDescription = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

  // Отрисовывает "удобства" по полученным данным
  var renderFeatures = function (features, container) {
    container.innerHTML = '';
    features.forEach(function (feature) {
      var li = document.createElement('li');
      li.classList.add('popup__feature');
      li.classList.add('popup__feature--' + feature);
      container.appendChild(li);
    });
  };

  // Отрисовывает фото по полученным данным
  var renderPhotos = function (photos, mock) {
    photos.querySelector('img').src = mock.offer.photos[0];
    if (mock.offer.photos.length > 1) {
      var fragment = document.createDocumentFragment();
      mock.offer.photos.forEach(function (photo) {
        var anotherPhoto = photos.querySelector('img').cloneNode(true);
        anotherPhoto.src = photo;
        fragment.appendChild(anotherPhoto);
      });
      photos.appendChild(fragment);
    }
  };

  // Создаёт карточку объявления
  window.card = {
    generateCard: function (mock) {
      var card = cardTemplate.cloneNode(true);
      var featuresContainer = card.querySelector('.popup__features');
      var photosContainer = card.querySelector('.popup__photos');
      card.querySelector('.popup__title').textContent = mock.offer.title;
      card.querySelector('.popup__text--address').textContent = mock.offer.address;
      card.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = typeDescription[mock.offer.type];
      card.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
      card.querySelector('.popup__description').textContent = mock.offer.description;
      card.querySelector('.popup__avatar').src = mock.author.avatar;
      renderFeatures(mock.offer.features, featuresContainer);
      renderPhotos(photosContainer, mock);
      return card;
    }
  };
})();
