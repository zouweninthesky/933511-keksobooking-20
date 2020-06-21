'use strict';

(function () {
  var PIN_HEIGHT = 84;
  var PIN_WIDTH_HALF = 31;
  var getRandomInt = function (min, max) {
    return min + Math.floor((max - min) * Math.random());
  };

  window.util = {
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_WIDTH_HALF: PIN_WIDTH_HALF,
    getRandomInt: getRandomInt
  };
})();
