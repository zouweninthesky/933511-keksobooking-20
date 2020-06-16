'use strict';

var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MOCKS_NUMBER = 8;
var PIN_HEIGHT = 84;
var PIN_WIDTH_HALF = 31;

// var typeDescription = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var adForm = document.querySelector('.ad-form');
var adFieldsets = adForm.querySelectorAll('fieldset');
var adAddress = adForm.querySelector('#address');
var adRoomNumber = adForm.querySelector('#room_number');
var adCapacity = adForm.querySelector('#capacity');
var mapFilters = document.querySelector('.map__filters');
var mapFieldsets = mapFilters.children;
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

  pinElement.querySelector('button').style.left = mock.location.x - PIN_WIDTH_HALF + 'px';
  pinElement.querySelector('button').style.top = mock.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = mock.author.avatar;
  pinElement.querySelector('img').alt = mock.offer.title;

  return pinElement;
};

// Выкладывает моки на страницу
var postPins = function (mocks) {
  var fragment = document.createDocumentFragment();
  mocks.forEach(function (mock) {
    fragment.appendChild(renderPin(mock));
  });
  mapPins.appendChild(fragment);
};

// Отрисовывает "удобства" по полученным данным
/* var renderFeatures = function (features, container) {
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
}; */

// var cardTemplate = document.querySelector('#card').content.querySelector('article');

// Создаёт карточку объявления
/*  var generateCard = function (mock) {
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
};*/

// Активирует элементы полученной формы
var disableForm = function (fieldset) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = true;
  }
};

// Деактивирует элементы полученной формы
var activateForm = function (fieldset) {
  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
};

// Снимает стартовые обработчики, навешивает координатный
var switchMainPinListeners = function () {
  mainPin.removeEventListener('mousedown', startingMainPinListenersConditions);
  mainPin.removeEventListener('keydown', startingMainPinListenersConditions);
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      getCoordinates();
    }
  });
};

// Условия срабатывания стартовых обработчиков
var startingMainPinListenersConditions = function (evt) {
  if (evt.button === 0) {
    activeState(mocks);
    getCoordinates();
  }
  if (evt.key === 'Enter') {
    activeState(mocks);
  }
};

// Навешивает стартовые обработчики
var startingMainPinListeners = function () {
  mainPin.addEventListener('mousedown', startingMainPinListenersConditions);
  mainPin.addEventListener('keydown', startingMainPinListenersConditions);
};

// Задаёт Неактивное состояние страницы
var disabledState = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  disableForm(mapFieldsets);
  disableForm(adFieldsets);
  startingMainPinListeners();
};

// Задаёт Активное состояние страницы
var activeState = function (mocks) {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  activateForm(mapFieldsets);
  activateForm(adFieldsets);
  postPins(mocks);
  switchMainPinListeners();
};

// Получает координаты нижнего конца главной метки
var getCoordinates = function (start) {
  var x = parseInt(mainPin.style.left.replace(/[^+\d]/g, ''), 10);
  var y = parseInt(mainPin.style.top.replace(/[^+\d]/g, ''), 10);
  x += PIN_WIDTH_HALF;
  if (start) {
    y += PIN_WIDTH_HALF;
  } else {
    y += PIN_HEIGHT;
  }
  adAddress.value = x + ', ' + y;
};

// Проверяет соответствие количества комнат количеству гостей
var checkRoomCapacityInput = function () {
  if (adRoomNumber.value === '1' && adCapacity.value !== '1') {
    adCapacity.setCustomValidity('Можно взять только одного гостя!');
    adCapacity.reportValidity();
  } else if (adRoomNumber.value === '2' && !(adCapacity.value === '1' || adCapacity.value === '2')) {
    adCapacity.setCustomValidity('Можно взять только одного или двух гостей!');
    adCapacity.reportValidity();
  } else if (adRoomNumber.value === '3' && adCapacity.value === '0') {
    adCapacity.setCustomValidity('Выберите количество гостей.');
    adCapacity.reportValidity();
  } else if (adRoomNumber.value === '100' && adCapacity.value !== '0') {
    adCapacity.setCustomValidity('Эта опция не для гостей.');
    adCapacity.reportValidity();
  } else {
    adCapacity.setCustomValidity('');
    adCapacity.reportValidity();
  }
};

adCapacity.addEventListener('change', function () {
  checkRoomCapacityInput();
});

adRoomNumber.addEventListener('change', function () {
  checkRoomCapacityInput();
});

disabledState();
getCoordinates('start');

// Создаёт моки, чтобы можно было сразу вызвать их двумя разными функциями
var mocks = createMockArray();

// Помещает карточку объявления в разметку перед .map__filters-container
// map.insertBefore(generateCard(mocks[getRandomInt(0, mocks.length)]), document.querySelector('.map__filters-container'));
