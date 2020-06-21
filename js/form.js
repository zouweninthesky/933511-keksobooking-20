'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adAddress = adForm.querySelector('#address');
  var adRoomNumber = adForm.querySelector('#room_number');
  var adCapacity = adForm.querySelector('#capacity');

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

  window.form = {
    getCoordinates: getCoordinates
  };
})();
