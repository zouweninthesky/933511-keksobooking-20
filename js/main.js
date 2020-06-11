'use strict';

var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MOCKS_NUMBER = 8;

var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;


// Возвращает случайное целое число
var getRandomInt = function (min, max) {
  return min + Math.floor((max - min) * Math.random());
};

// Возвращает один из двух вариантов текста
var getText = function () {
  var flip = getRandomInt(0, 2);
  if (flip) {
    return 'Слово';
  } else {
    return 'Очень много разных слов';
  }
};

// Возвращает массив элементов objects заданной длины
var getArray = function (length, objects) {
  var array = [];
  for (var i = 0; i < length; i++) {
    array[i] = objects[getRandomInt(0, objects.length)];
  }
  return array;
};

// Создаёт мок из заданных данных
var createMock = function () {
  var mockX = getRandomInt(0, 1201);
  var mockY = getRandomInt(130, 631);
  var mock = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
    },
    'offer': {
      'title': getText(),
      'address': mockX + ', ' + mockY,
      'price': getRandomInt(100, 200) * 10,
      'type': TYPE_LIST[getRandomInt(0, TYPE_LIST.length)],
      'rooms': getRandomInt(1, 3),
      'guests': getRandomInt(1, 4),
      'checkin': CHECKIN_LIST[getRandomInt(0, CHECKIN_LIST.length)],
      'checkout': CHECKOUT_LIST[getRandomInt(0, CHECKOUT_LIST.length)],
      'features': getArray(getRandomInt(0, FEATURES_LIST.length), FEATURES_LIST),
      'description': getText(),
      'photos': getArray(getRandomInt(1, PHOTOS_LIST.length), PHOTOS_LIST)
    },
    'location': {
      'x': mockX,
      'y': mockY
    }
  };
  return mock;
};

// Создаёт заданное количество моков
var createMockArray = function () {
  var mocks = [];
  for (var i = 0; i < MOCKS_NUMBER; i++) {
    mocks[i] = createMock();
  }
  return mocks;
};

// Отрисовывает мок по полученным данным
var renderPin = function (mock) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('button').style.left = mock.location.x - 31 + 'px';
  pinElement.querySelector('button').style.top = mock.location.y - 84 + 'px';
  pinElement.querySelector('img').src = mock.author.avatar;
  pinElement.querySelector('img').alt = mock.offer.title;

  return pinElement;
};

// Выкладывает моки на страницу
var postPins = function (mocks) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < mocks.length; i++) {
    fragment.appendChild(renderPin(mocks[i]));
  }
  mapPins.appendChild(fragment);
};

// Отрисовывает "удобства" по полученным данным
var renderFeatures = function (features) {
  var fragment = document.createDocumentFragment();
  console.log('');
  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');
    li.classList.add('popup__feature');
    li.classList.add('popup__feature--' + features[i]);
    console.log(li);
    fragment.appendChild(li);
  }
  return fragment;
};

// Отрисовывает фото по полученным данным
var renderPhotos = function (photos, mock) {
  photos.querySelector('img').src = mock.offer.photos[0];
  if (mock.offer.photos.length > 1) {
    var fragment = document.createDocumentFragment();
    for (var j = 1; j < mock.offer.photos.length; j++) {
      var anotherPhoto = photos.querySelector('img').cloneNode(true);
      anotherPhoto.src = mock.offer.photos[j];
      fragment.appendChild(anotherPhoto);
    }
    photos.appendChild(fragment);
  }
}

var cardTemplate = document.querySelector('#card').content.querySelector('article');

// Создаёт карточку объявления
var generateCard = function (mock) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = mock.offer.title;
  card.querySelector('.popup__text--address').textContent = mock.offer.address;
  card.querySelector('.popup__text--price').textContent = mock.offer.price + '₽/ночь';
  var type = card.querySelector('.popup__type');
  if (mock.offer.type === 'flat') {
    type.textContent = 'Квартира';
  } else if (mock.offer.type === 'bungalo') {
    type.textContent = 'Бунгало';
  } else if (mock.offer.type === 'house') {
    type.textContent = 'Дом';
  } else {
    type.textContent = 'Дворец';
  }
  card.querySelector('.popup__text--capacity').textContent = mock.offer.rooms + ' комнаты для ' + mock.offer.guests + ' гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + mock.offer.checkin + ', выезд до ' + mock.offer.checkout;
  var features = card.querySelector('.popup__features');
  features.innerHTML = '';
  features.appendChild(renderFeatures(mock.offer.features));
  card.querySelector('.popup__description').textContent = mock.offer.description;
  var photos = card.querySelector('.popup__photos');
  renderPhotos(photos, mock);
  card.querySelector('.popup__avatar').src = mock.author.avatar;
  return (card);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// Создаёт моки, чтобы можно было сразу вызвать их двумя разными функциями
var mocks = createMockArray();

postPins(mocks);

// Помещает карточку объявления в разметку перед .map__filters-container
map.insertBefore(generateCard(mocks[getRandomInt(0, mocks.length)]), document.querySelector('.map__filters-container'));
