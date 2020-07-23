"use strict";

(function() {
  var pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
  var pinDocumentFragment = document.createDocumentFragment();
  var mapPin = document.querySelector(".map__pin--main");
  var MAP_PIN_WIDTH = 64;
  var MAP_PIN_HEIGHT = 75;

  function setupPin(advertise) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.cssText = `left: ${advertise.location.x}px; top: ${advertise.location.y}px`;
    pinElement.querySelector("img").src = advertise.author.avatar;
    pinElement.addEventListener("click", function() {
      window.card.removeExistingCard(window.map.cardLayer);
      window.card.renderCard(advertise, window.map.cardLayer);
    })
    return pinElement;
  }

  function renderPins(adList, pinLayer = document.querySelector(".map__pins")) {

    for (var i = 0; i < adList.length; i++) {
      var newPin = setupPin(adList[i], pinTemplate);
      newPin.value = i;
      pinDocumentFragment.appendChild(newPin);
    }

    pinLayer.appendChild(pinDocumentFragment);
  }

  function removePins(pinLayer) {
    var pins = document.querySelectorAll(".map__pin[value]");
    var pinToDelete;
    for (var i = 0; i < pins.length; i++) {
      pinToDelete = pins[i];
      pinLayer.removeChild(pinToDelete);
    }
  }



  var pin = {
    renderPins: renderPins,
    removePins: removePins,
    MAIN_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAIN_PIN_WIDTH: MAP_PIN_WIDTH
  }

  window.pin = pin;

}
)();
