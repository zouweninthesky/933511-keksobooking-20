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
  var renderPhotos = function (photos, data) {
    photos.querySelector('img').src = data.offer.photos[0];
    if (data.offer.photos.length > 1) {
      var fragment = document.createDocumentFragment();
      data.offer.photos.forEach(function (photo) {
        var anotherPhoto = photos.querySelector('img').cloneNode(true);
        anotherPhoto.src = photo;
        fragment.appendChild(anotherPhoto);
      });
      photos.appendChild(fragment);
    }
  };

  var closeCard = function (card) {
    card.parentNode.removeChild(card);
  };

  // Создаёт карточку объявления
  var generateCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var featuresContainer = card.querySelector('.popup__features');
    var photosContainer = card.querySelector('.popup__photos');
    card.querySelector('.popup__title').textContent = data.offer.title;
    card.querySelector('.popup__text--address').textContent = data.offer.address;
    card.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typeDescription[data.offer.type];
    card.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    card.querySelector('.popup__description').textContent = data.offer.description;
    card.querySelector('.popup__avatar').src = data.author.avatar;
    renderFeatures(data.offer.features, featuresContainer);
    renderPhotos(photosContainer, data);

    card.querySelector('.popup__close').addEventListener('click', function () {
      closeCard(card);
    });

    return card;
  };

  window.card = {
    generateCard: generateCard,
    closeCard: closeCard
  };
})();
