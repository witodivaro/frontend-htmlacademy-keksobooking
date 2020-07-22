(function() {
  var cardTemplate = document.querySelector("#card").content.querySelector(".map__card");

  function setupCard(advertise) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".popup__title").textContent = advertise.offer.title;
    cardElement.querySelector(".popup__text--price").textContent = advertise.offer.price + "₽/ночь"
    cardElement.querySelector(".popup__text--address").textContent = advertise.offer.address;
    cardElement.querySelector(".popup__type").textContent = advertise.offer.type == "flat" ? "Квартира" :
                                                           advertise.offer.type == "palace" ? "Дворец" :
                                                           advertise.offer.type == "house" ? "Дом" :
                                                           advertise.offer.type == "bungalo" ? "Бунгало" : "Незивестно";
    cardElement.querySelector(".popup__text--capacity").textContent = `${advertise.offer.rooms} комнат(ы) для ${advertise.offer.guests} гостей`;
    cardElement.querySelector(".popup__text--time").textContent = `Заезд после ${advertise.offer.checkin}, выезд до ${advertise.offer.checkout}`;
    cardElement.querySelector(".popup__text--address").textContent = advertise.offer.address;
    cardElement.querySelector(".popup__description").textContent = advertise.offer.description;
    cardElement.querySelector(".popup__avatar").src = advertise.author.avatar + ".png";
    setFeatures(cardElement, advertise);
    setPhotos(cardElement, advertise);


    return cardElement;
  }


  function setPhotos(cardElement, advertise) {
    var photosLayer = cardElement.querySelector(".popup__photos");
    var imgTemplate = cardElement.querySelector(".popup__photo");
    var photos = advertise.offer.photos;
    var imgElem;

    while (photosLayer.firstChild) {
      photosLayer.removeChild(photosLayer.lastChild);
    }

    for (var i = 0; i < photos.length; i++) {
      imgElem = imgTemplate.cloneNode(true);
      imgElem.src = photos[i];
      photosLayer.appendChild(imgElem);
    }

  }

  function setFeatures(cardElement, advertise) {
    var availableFeatures = advertise.offer.features;
    var popupFeatures = cardElement.querySelector(".popup__features");
    var allFeatures = popupFeatures.cloneNode(true);

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.lastChild);
    }

    for (var i = 0; i < availableFeatures.length; i++) {
      switch (availableFeatures[i]) {
        case "wifi":
          popupFeatures.appendChild(allFeatures.childNodes[1].cloneNode(true));
          break;

        case "dishwasher":
          popupFeatures.appendChild(allFeatures.childNodes[3].cloneNode(true));
          break;

        case "parking":
          popupFeatures.appendChild(allFeatures.childNodes[5].cloneNode(true));
          break;

        case "washer":
          popupFeatures.appendChild(allFeatures.childNodes[7].cloneNode(true));
          break;

        case "elevator":
          popupFeatures.appendChild(allFeatures.childNodes[9].cloneNode(true));
          break;

        case "conditioner":
          popupFeatures.appendChild(allFeatures.childNodes[11].cloneNode(true));
          break;

      }
        // "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
    }
  }

  function renderCard(advertise, cardLayer = document.querySelector(".map")) {
    var cardElement = setupCard(advertise);
    var mapFilters = document.querySelector(".map__filters-container");
    var cardClose = cardElement.querySelector(".popup__close");

    function onCardCloseClick() {
      removeExistingCard(cardLayer);
    }

    cardClose.addEventListener("click", onCardCloseClick);
    cardLayer.insertBefore(cardElement, mapFilters);
  }

  function removeExistingCard(cardLayer = document.querySelector(".map")) {
    existingCard = cardLayer.querySelector(".map__card");
    cardLayer.removeChild(existingCard);
  }
  card = {
    renderCard: renderCard,
    removeExistingCard: removeExistingCard,
  }

  window.card = card;

})();
