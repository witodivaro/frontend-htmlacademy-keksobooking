(function pin() {
  var pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");

  function setupPin(advertise) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.cssText = `left: ${advertise.location.x}px; top: ${advertise.location.y}px`;
    pinElement.querySelector("img").src = advertise.author.avatar + ".png";
    pinElement.addEventListener("click", function() {
      window.card.renderCard(advertise, window.map.cardLayer)
    })
    return pinElement;
  }

  function renderPins(adList, pinLayer) {
    var pinDocumentFragment = document.createDocumentFragment();

    for (var i = 0; i < adList.length; i++) {
      var newPin = setupPin(adList[i], pinTemplate);
      newPin.value = i;
      pinDocumentFragment.appendChild(newPin);
    }

    pinLayer.appendChild(pinDocumentFragment);
  }
}
)();
