"use strict";

//  GET: https://javascript.pages.academy/keksobooking/data
// POST: https://javascript.pages.academy/keksobooking

(function() {
  var mapElement = document.querySelector(".map");
  var pinLayer = document.querySelector(".map__pins");
  var cardLayer = document.querySelector(".map");
  var advertiseList = [];
  var advertiseAmount = 8;
  var downloadUrl = 'https://javascript.pages.academy/keksobooking/data'

  debugger;

  function onDownload(response) {
    advertiseList = response.slice();
  }

  window.backend.download(downloadUrl, onDownload);

  function activateMap() {
    if (mapElement.classList.contains("map--faded")) {
      mapElement.classList.remove("map--faded");
      window.pin.renderPins(advertiseList, pinLayer);
    }
  }

  function disableMap() {
    mapElement.classList.add("map--faded");
    window.pin.removePins(pinLayer);
    window.card.removeExistingCard();
  }

  var map = {
    pinLayer: pinLayer,
    cardLayer: cardLayer,
    activateMap: activateMap,
    disableMap: disableMap,
  }

  window.map = map;
}
)();
