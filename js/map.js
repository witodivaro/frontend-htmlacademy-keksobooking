
(function() {
  var mapElement = document.querySelector(".map");
  var pinLayer = document.querySelector(".map__pins");
  var cardLayer = document.querySelector(".map");
  var advertiseList = [];
  var advertiseAmount = 8;

  debugger;

  window.data.fillAdList(advertiseList, advertiseAmount);

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

  map = {
    pinLayer: pinLayer,
    cardLayer: cardLayer,
    activateMap: activateMap,
    disableMap: disableMap,
  }

  window.map = map;
}
)();
