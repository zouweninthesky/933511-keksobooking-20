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
  var MAX_PRICE = 1000000;
  var ERROR_COLOR = 'red';
  var DEFAULT_COLOR = '#d9d9d3';

  var MinPriceValues = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var TitleLengths = {
    min: 30,
    max: 100
  };

  var GOOD_RESULT = 0;
  var BAD_RESULT = -1;

  var AdRoomsOptions = {
    oneRoom: '1',
    twoRooms: '2',
    threeRooms: '3',
    hundredRooms: '100'
  };

  var AdGuestsOptions = {
    noGuests: '0',
    oneGuest: '1',
    twoGuests: '2',
    threeGuests: '3'
  };

  var addErrorBorder = function (input) {
    input.style.borderColor = ERROR_COLOR;
  };

  var removeErrorBorder = function (input) {
    input.style.borderColor = DEFAULT_COLOR;
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
    if (adTitle.value.length < TitleLengths.min) {
      addErrorBorder(adTitle);
      adTitle.setCustomValidity('Минимум 30 символов!');
      adTitle.reportValidity();
      return BAD_RESULT;
    } else if (adTitle.value.length > TitleLengths.max) {
      addErrorBorder(adTitle);
      adTitle.setCustomValidity('Максимум 100 символов!');
      adTitle.reportValidity();
      return BAD_RESULT;
    } else {
      removeErrorBorder(adTitle);
      adTitle.setCustomValidity('');
      return GOOD_RESULT;
    }
  };

  var changePriceForType = function () {
    adPrice.min = MinPriceValues[adType.value];
    adPrice.placeholder = MinPriceValues[adType.value];
  };

  var checkPrice = function () {
    if (adPrice.value < parseInt(adPrice.min, 10)) {
      addErrorBorder(adPrice);
      adPrice.setCustomValidity('Минимальная цена - ' + adPrice.min + '!');
      adPrice.reportValidity();
      return BAD_RESULT;
    } else if (adPrice.value > MAX_PRICE) {
      addErrorBorder(adPrice);
      adPrice.setCustomValidity('Максимальная цена - ' + MAX_PRICE + '!');
      adPrice.reportValidity();
      return BAD_RESULT;
    } else {
      removeErrorBorder(adPrice);
      adPrice.setCustomValidity('');
      adPrice.reportValidity();
      return GOOD_RESULT;
    }
  };

  var changeTimeInput = function (first, second) {
    second.value = first.value;
  };

  var checkRoomCapacityInput = function () {
    if (adRoomNumber.value === AdRoomsOptions.oneRoom && adCapacity.value !== AdGuestsOptions.oneGuest) {
      addErrorBorder(adCapacity);
      adCapacity.setCustomValidity('Можно взять только одного гостя!');
      adCapacity.reportValidity();
      return BAD_RESULT;
    } else if (adRoomNumber.value === AdRoomsOptions.twoRooms && !(adCapacity.value === AdGuestsOptions.oneGuest || adCapacity.value === AdGuestsOptions.twoGuests)) {
      addErrorBorder(adCapacity);
      adCapacity.setCustomValidity('Можно взять только одного или двух гостей!');
      adCapacity.reportValidity();
      return BAD_RESULT;
    } else if (adRoomNumber.value === AdRoomsOptions.threeRooms && adCapacity.value === AdGuestsOptions.noGuests) {
      addErrorBorder(adCapacity);
      adCapacity.setCustomValidity('Выберите количество гостей.');
      adCapacity.reportValidity();
      return BAD_RESULT;
    } else if (adRoomNumber.value === AdRoomsOptions.hundredRooms && adCapacity.value !== AdGuestsOptions.noGuests) {
      addErrorBorder(adCapacity);
      adCapacity.setCustomValidity('Эта опция не для гостей.');
      adCapacity.reportValidity();
      return BAD_RESULT;
    } else {
      removeErrorBorder(adCapacity);
      adCapacity.setCustomValidity('');
      adCapacity.reportValidity();
      return GOOD_RESULT;
    }
  };

  var globalCheck = function () {
    return (checkTitleLength() + checkPrice() + checkRoomCapacityInput() === GOOD_RESULT);
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
    removeErrorBorder: removeErrorBorder
  };
})();
