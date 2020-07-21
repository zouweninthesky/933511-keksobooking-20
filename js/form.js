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

  var addRedBorder = function (input) {
    input.style.borderColor = 'red';
  };

  var removeRedBorder = function (input) {
    input.style.borderColor = '#d9d9d3';
  };

  var getCoordinates = function (start) {
    var x = parseInt(mainPin.style.left.replace(/px/g, ''), 10);
    var y = parseInt(mainPin.style.top.replace(/px/g, ''), 10);
    x += window.util.PIN_WIDTH_HALF;
    if (x <= window.movePin.minX) {
      x = window.movePin.minX;
    }
    if (x >= window.movePin.maxX) {
      x = window.movePin.maxX;
    }
    if (start) {
      y += window.util.PIN_WIDTH_HALF;
    } else {
      y += window.util.PIN_HEIGHT;
      if (y <= window.movePin.minY) {
        y = window.movePin.minY;
      }
      if (y >= window.movePin.maxY) {
        y = window.movePin.maxY;
      }
    }
    adAddress.value = x + ', ' + y;
  };

  var checkTitleLength = function () {
    if (adTitle.value.length < 30) {
      addRedBorder(adTitle);
      adTitle.setCustomValidity('Минимум 30 символов!');
      adTitle.reportValidity();
      return -1;
    } else if (adTitle.value.length > 100) {
      addRedBorder(adTitle);
      adTitle.setCustomValidity('Максимум 100 символов!');
      adTitle.reportValidity();
      return -1;
    } else {
      removeRedBorder(adTitle);
      adTitle.setCustomValidity('');
      return 0;
    }
  };

  var changePriceForType = function () {
    adPrice.min = minPriceValues[adType.value];
    adPrice.placeholder = minPriceValues[adType.value];
  };

  var checkPrice = function () {
    if (adPrice.value < parseInt(adPrice.min, 10)) {
      addRedBorder(adPrice);
      adPrice.setCustomValidity('Минимальная цена - ' + adPrice.min + '!');
      adPrice.reportValidity();
      return -1;
    } else if (adPrice.value > 1000000) {
      addRedBorder(adPrice);
      adPrice.setCustomValidity('Максимальная цена - 1 миллион!');
      adPrice.reportValidity();
      return -1;
    } else {
      removeRedBorder(adPrice);
      adPrice.setCustomValidity('');
      adPrice.reportValidity();
      return 0;
    }
  };

  var changeTimeInput = function (first, second) {
    second.value = first.value;
  };

  var checkRoomCapacityInput = function () {
    if (adRoomNumber.value === '1' && adCapacity.value !== '1') {
      addRedBorder(adCapacity);
      adCapacity.setCustomValidity('Можно взять только одного гостя!');
      adCapacity.reportValidity();
      return -1;
    } else if (adRoomNumber.value === '2' && !(adCapacity.value === '1' || adCapacity.value === '2')) {
      addRedBorder(adCapacity);
      adCapacity.setCustomValidity('Можно взять только одного или двух гостей!');
      adCapacity.reportValidity();
      return -1;
    } else if (adRoomNumber.value === '3' && adCapacity.value === '0') {
      addRedBorder(adCapacity);
      adCapacity.setCustomValidity('Выберите количество гостей.');
      adCapacity.reportValidity();
      return -1;
    } else if (adRoomNumber.value === '100' && adCapacity.value !== '0') {
      addRedBorder(adCapacity);
      adCapacity.setCustomValidity('Эта опция не для гостей.');
      adCapacity.reportValidity();
      return -1;
    } else {
      removeRedBorder(adCapacity);
      adCapacity.setCustomValidity('');
      adCapacity.reportValidity();
      return 0;
    }
  };

  var globalCheck = function () {
    return (checkTitleLength() + checkPrice() + checkRoomCapacityInput() === 0);
  };

  adTitle.addEventListener('input', function () {
    checkTitleLength();
  });

  adPrice.addEventListener('input', function () {
    checkPrice();
  });

  adCapacity.addEventListener('change', function () {
    checkRoomCapacityInput();
  });

  adRoomNumber.addEventListener('change', function () {
    checkRoomCapacityInput();
  });

  adType.addEventListener('change', function () {
    window.form.changePriceForType();
  });

  adTimeIn.addEventListener('change', function () {
    changeTimeInput(adTimeIn, adTimeOut);
  });

  adTimeOut.addEventListener('change', function () {
    changeTimeInput(adTimeOut, adTimeIn);
  });

  window.form = {
    getCoordinates: getCoordinates,
    changePriceForType: changePriceForType,
    globalCheck: globalCheck,
    removeRedBorder: removeRedBorder
  };
})();
