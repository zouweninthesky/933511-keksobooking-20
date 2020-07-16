'use strict';

(function () {
  var TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_LIST = ['12:00', '13:00', '14:00'];
  var CHECKOUT_LIST = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MOCKS_NUMBER = 1;

  var getText = function () {
    var flip = window.util.getRandomInt(0, 2);
    if (flip) {
      return 'Слово';
    } else {
      return 'Очень много разных слов';
    }
  };

  var getArray = function (length, objects) {
    var array = [];
    for (var i = 0; i < length; i++) {
      array[i] = objects[window.util.getRandomInt(0, objects.length)];
    }
    return array;
  };

  var createMock = function () {
    var mockX = window.util.getRandomInt(0, 1201);
    var mockY = window.util.getRandomInt(130, 631);
    var mock = {
      'author': {
        'avatar': 'img/avatars/user0' + window.util.getRandomInt(1, 8) + '.png'
      },
      'offer': {
        'title': getText(),
        'address': mockX + ', ' + mockY,
        'price': window.util.getRandomInt(100, 200) * 10,
        'type': TYPE_LIST[window.util.getRandomInt(0, TYPE_LIST.length)],
        'rooms': window.util.getRandomInt(1, 3),
        'guests': window.util.getRandomInt(1, 4),
        'checkin': CHECKIN_LIST[window.util.getRandomInt(0, CHECKIN_LIST.length)],
        'checkout': CHECKOUT_LIST[window.util.getRandomInt(0, CHECKOUT_LIST.length)],
        'features': getArray(window.util.getRandomInt(0, FEATURES_LIST.length), FEATURES_LIST),
        'description': getText(),
        'photos': getArray(window.util.getRandomInt(1, PHOTOS_LIST.length), PHOTOS_LIST)
      },
      'location': {
        'x': mockX,
        'y': mockY
      }
    };
    return mock;
  };

  var createMockArray = function () {
    var mocks = [];
    for (var i = 0; i < MOCKS_NUMBER; i++) {
      mocks[i] = createMock();
    }
    return mocks;
  };

  var mocks = createMockArray();

  window.data = {
    mocks: mocks
  };
})();

