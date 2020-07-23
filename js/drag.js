"use strict";

(function() {
  var layer = document.querySelector(".map__pins");
  var layerWidth = layer.offsetWidth;
  var layerHeight = layer.offsetHeight;
  var mainPin = document.querySelector(".map__pin--main");
  var MAX_LEFT = layerWidth - window.pin.MAIN_PIN_WIDTH;
  var MIN_LEFT = 0;
  var MIN_TOP = 0;
  var MAX_TOP = layerHeight - window.pin.MAIN_PIN_HEIGHT;
  var startCoords, shift, currentPos;


  mainPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();

    window.addEventListener("scroll", onWindowScroll);

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onWindowScroll() {
      onMapPinMouseUp();
    }

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      currentPos = {
        x: mainPin.offsetLeft,
        y: mainPin.offsetTop,
      }

      shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };


      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (currentPos.x - shift.x < MAX_LEFT && currentPos.x - shift.x > MIN_LEFT) {
        mainPin.style.left = `${currentPos.x - shift.x}px`;
      }
      if (currentPos.y - shift.y < MAX_TOP && currentPos.y - shift.y > MIN_TOP) {
        mainPin.style.top = `${currentPos.y - shift.y}px`;
      }


    }

    layer.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMapPinMouseUp);

    function onMapPinMouseUp() {
      layer.removeEventListener("mousemove", onMouseMove);
      window.form.activateFieldsets();
      window.map.activateMap();
      window.form.fillAddress();

      window.removeEventListener("scroll", onWindowScroll);
      document.removeEventListener("mouseup", onMapPinMouseUp);
    }
  })



})();
