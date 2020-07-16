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

  var addBorderColor = function (input) {
    input.style.borderColor = 'red';
  };

  var removeBorderColor = function (input) {
    input.style.borderColor = '#d9d9d3';
  };

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
      addBorderColor(adTitle);
      adTitle.setCustomValidity('Минимум 30 символов!');
      adTitle.reportValidity();
    } else if (adTitle.value.length > 100) {
      addBorderColor(adTitle);
      adTitle.setCustomValidity('Максимум 100 символов!');
      adTitle.reportValidity();
    } else {
      removeBorderColor(adTitle);
      adTitle.setCustomValidity('');
    }
  };

  var changePriceForType = function () {
    adPrice.min = minPriceValues[adType.value];
    adPrice.placeholder = minPriceValues[adType.value];
  };

  var checkPrice = function () {
    if (adPrice.value < parseInt(adPrice.min, 10)) {
      addBorderColor(adPrice);
      adPrice.setCustomValidity('Минимальная цена - ' + adPrice.min + '!');
      adPrice.reportValidity();
    } else if (adPrice.value > 1000000) {
      addBorderColor(adPrice);
      adPrice.setCustomValidity('Максимальная цена - 1 миллион!');
      adPrice.reportValidity();
    } else {
      removeBorderColor(adPrice);
      adPrice.setCustomValidity('');
      adPrice.reportValidity();
    }
  };

  var changeTimeInput = function (first, second) {
    second.value = first.value;
  };

  var checkRoomCapacityInput = function () {
    if (adRoomNumber.value === '1' && adCapacity.value !== '1') {
      addBorderColor(adCapacity);
      adCapacity.setCustomValidity('Можно взять только одного гостя!');
      adCapacity.reportValidity();
    } else if (adRoomNumber.value === '2' && !(adCapacity.value === '1' || adCapacity.value === '2')) {
      addBorderColor(adCapacity);
      adCapacity.setCustomValidity('Можно взять только одного или двух гостей!');
      adCapacity.reportValidity();
    } else if (adRoomNumber.value === '3' && adCapacity.value === '0') {
      addBorderColor(adCapacity);
      adCapacity.setCustomValidity('Выберите количество гостей.');
      adCapacity.reportValidity();
    } else if (adRoomNumber.value === '100' && adCapacity.value !== '0') {
      addBorderColor(adCapacity);
      adCapacity.setCustomValidity('Эта опция не для гостей.');
      adCapacity.reportValidity();
    } else {
      removeBorderColor(adCapacity);
      adCapacity.setCustomValidity('');
      adCapacity.reportValidity();
    }
  };

  var globalCheck = function () {
    checkTitleLength();
    checkPrice();
    checkRoomCapacityInput();
    checkRoomCapacityInput();
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
    globalCheck: globalCheck
  };
})();
