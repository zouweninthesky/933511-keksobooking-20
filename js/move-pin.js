'use strict';

(function () {
  var dragArea = {
    minY: 130,
    minX: 0,
    maxY: 630,
    maxX: 1200
  };

  var pinRestrictedCoordinates = {
    minY: dragArea.minY,
    maxY: dragArea.maxY - window.util.PIN_HEIGHT,
    minX: dragArea.minX - window.util.PIN_WIDTH_HALF,
    maxX: dragArea.maxX - window.util.PIN_WIDTH_HALF
  };

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop <= pinRestrictedCoordinates.minY) {
        mainPin.style.top = pinRestrictedCoordinates.minY + 'px';
      }

      if (mainPin.offsetTop >= pinRestrictedCoordinates.maxY) {
        mainPin.style.top = pinRestrictedCoordinates.maxY + 'px';
      }

      if (mainPin.offsetLeft <= pinRestrictedCoordinates.minX) {
        mainPin.style.left = pinRestrictedCoordinates.minX + 'px';
      }

      if (mainPin.offsetLeft >= pinRestrictedCoordinates.maxX) {
        mainPin.style.left = pinRestrictedCoordinates.maxX + 'px';
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.getCoordinates();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onClickPreventDefault);
        };
        mainPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
