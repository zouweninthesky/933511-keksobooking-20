'use strict';

(function () {
  var DragArea = {
    minY: 130,
    minX: 0,
    maxY: 630,
    maxX: document.querySelector('.map').clientWidth
  };

  var pinRestrictedCoordinates = {
    minY: DragArea.minY - window.util.PIN_HEIGHT,
    maxY: DragArea.maxY - window.util.PIN_HEIGHT,
    minX: DragArea.minX - window.util.PIN_WIDTH_HALF,
    maxX: DragArea.maxX - window.util.PIN_WIDTH_HALF
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
      window.form.getCoordinates();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop < pinRestrictedCoordinates.minY) {
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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onPinClick = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener('click', onPinClick);
        };
        mainPin.addEventListener('click', onPinClick);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var updateDragAreaWidth = function () {
    DragArea.maxX = document.querySelector('.map').clientWidth;
    pinRestrictedCoordinates.maxX = DragArea.maxX - window.util.PIN_WIDTH_HALF;
    if (parseInt(mainPin.style.left.replace(/px/g, ''), 10) >= pinRestrictedCoordinates.maxX) {
      mainPin.style.left = pinRestrictedCoordinates.maxX + 'px';
    }
  };

  var onDocumentResize = function () {
    updateDragAreaWidth();
  };

  window.addEventListener('resize', onDocumentResize);

  window.movePin = {
    minX: DragArea.minX,
    maxX: DragArea.maxX,
    minY: DragArea.minY,
    maxY: DragArea.maxY
  };
})();
