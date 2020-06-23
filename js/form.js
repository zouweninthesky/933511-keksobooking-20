'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adTitle = adForm.querySelector('#title');
  var adAddress = adForm.querySelector('#address');
  var adType = adForm.querySelector('#type');
  var adPrice = adForm.querySelector('#price');
  var adTimeIn = adForm.querySelector('#timein');
  var adTimeOut = adForm.querySelector('#timeout');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');

  var minPriceValues = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  // Получает координаты нижнего конца главной метки
  var getCoordinates = function (start) {
    var x = parseInt(mainPin.style.left.replace(/[^+\d]/g, ''), 10);
    var y = parseInt(mainPin.style.top.replace(/[^+\d]/g, ''), 10);
    x += window.util.PIN_WIDTH_HALF;
    if (start) {
      y += window.util.PIN_WIDTH_HALF;
    } else {
      y += window.util.PIN_HEIGHT;
    }
    adAddress.value = x + ', ' + y;
  };

  var checkTitleLength = function () {
    if (adTitle.value.length < 30) {
      adTitle.setCustomValidity('Минимум 30 символов!');
      adTitle.reportValidity();
    } else if (adTitle.value.length > 100) {
      adTitle.setCustomValidity('Максимум 100 символов!');
      adTitle.reportValidity();
    } else {
      adTitle.setCustomValidity('');
    }
  };

  var checkType = function (option) {
    adPrice.min = minPriceValues[option];
    adPrice.placeholder = minPriceValues[option];
  };

  var checkPrice = function () {
    if (adPrice.value > 1000000) {
      adPrice.setCustomValidity('Максимальная цена - 1 миллион!');
      adPrice.reportValidity();
    } else {
      adPrice.setCustomValidity('');
      adPrice.reportValidity();
    }
  };

  var changeTimeInput = function (first, second) {
    second.value = first.value;
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

  adTitle.addEventListener('input', function () {
    checkTitleLength();
  });

  adType.addEventListener('change', function () {
    checkType(adType.value);
  });

  adPrice.addEventListener('input', function () {
    checkPrice();
  });

  adTimeIn.addEventListener('change', function () {
    changeTimeInput(adTimeIn, adTimeOut);
  });

  adTimeOut.addEventListener('change', function () {
    changeTimeInput(adTimeOut, adTimeIn);
  });

  adCapacity.addEventListener('change', function () {
    checkRoomCapacityInput();
  });

  adRoomNumber.addEventListener('change', function () {
    checkRoomCapacityInput();
  });

  window.form = {
    getCoordinates: getCoordinates
  };
})();
