'use strict';

var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = 3;
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

// Создаёт мок из заданных данных
var createMock = function () {
  var mock = {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
    },
    'offer': {
      'title': getText(),
      'price': getRandomInt(100, 200) * 10,
      'type': TYPE_LIST[getRandomInt(0, TYPE_LIST.length)],
      'rooms': getRandomInt(1, 3),
      'guests': getRandomInt(1, 4),
      'checkin': CHECKIN_LIST[getRandomInt(0, CHECKIN_LIST.length)],
      'checkout': CHECKOUT_LIST[getRandomInt(0, CHECKOUT_LIST.length)],
      'features': FEATURES_LIST[getRandomInt(0, FEATURES_LIST.length)],
      'description': getText(),
      'photos': 'http://o0.github.io/assets/images/tokyo/hotel' + getRandomInt(1, PHOTOS_LIST) + '.jpg'
    },
    'location': {
      'x': getRandomInt(0, 1201),
      'y': getRandomInt(130, 631)
    }
  };
  mock.offer.address = mock.location.x + ', ' + mock.location.y;
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

postPins(createMockArray());
