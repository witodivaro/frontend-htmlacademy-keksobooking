(function map() {
  var mapElement = document.querySelector(".map");
  var pinLayer = document.querySelector(".map__pins");
  var cardLayer = document.querySelector(".map");
  var advertiseList;
  var advertiseAmount = 8;

  window.data.fillAdList(advertiseList, advertiseAmount);

  map = {
    pinLayer: pinLayer,
    cardLayer: cardLayer
  }

  window.map = map;
}
)();

// --> form.js (activateMap);
