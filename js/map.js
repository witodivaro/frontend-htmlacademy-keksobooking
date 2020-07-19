var hotelAdvertise;
var advertiseList = [];
var advertiseAmount = 8;
var mapElement = document.querySelector(".map");
var pinTemplate = document.querySelector("#pin").content.querySelector(".map__pin");
var cardTemplate = document.querySelector("#card").content.querySelector(".map__card");
var pinLayer = document.querySelector(".map__pins");
var cardLayer = document.querySelector(".map");
var mapFilters = document.querySelector(".map__filters-container");

var getRandomElement = function(array) {
  var randomElement = array[Math.floor(Math.random() * array.length)];

  return randomElement;
}

var getRandomUniqueElement = function(array) {
  var elementIndex = Math.floor(Math.random() * array.length)
  var randomElement = array[elementIndex];
  array.splice(elementIndex, 1);

  return randomElement;
}

var getRandomNumber = function(min, max) {
  var randomNumber = Math.floor(Math.random()*(max - min) + min);

  return randomNumber;
}

var getListOfRandomElements = function(array) {
  var randomElements = [];
  var randomElementsNumber = Math.floor(Math.random() * array.length);
  var clonedArray = array.slice();

  for (var i = 0; i < randomElementsNumber; i++) {
    randomElements.push(getRandomUniqueElement(clonedArray));
  }

  return randomElements;
}

var getRandomlySortedList = function(array) {
  var randomlySortedList = [];
  var clonedArray = array.slice();

  while (clonedArray.length > 0) {
    randomlySortedList.push(getRandomUniqueElement(clonedArray));
  }
  return randomlySortedList;
}

// .splice .slice

var avatars = ["01", "02", "03", "04", "05", "06", "07", "08"];
var rooms = [1, 2, 3, 4, 5];
var times = ["12:00", "13:00", "14:00"];
var types = ["palace", "flat", "house", "bungalo"];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гоствеой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]

var generateAd = function() {
  var adObject = {
    "author": {
      "avatar": "img/avatars/user" + getRandomUniqueElement(avatars)
    },

    "offer": {
      "title": getRandomUniqueElement(titles),
      "address": `${getRandomNumber(0, 600)}, ${getRandomNumber(0, 350)}`,
      "price": getRandomNumber(1000, 1000000),
      "type": getRandomElement(types),
      "rooms": getRandomElement(rooms),
      "guests": getRandomNumber(5, 200),
      "checkin": getRandomElement(times),
      "checkout": getRandomElement(times),
      "features": getListOfRandomElements(features),
      "description": "",
      "photos": getRandomlySortedList(photos)
    },

    "location": {
      x: getRandomNumber(0, mapElement.offsetWidth),
      y: getRandomNumber(130, 630)
    }
  }

  return adObject;
}

function fillAdList(adList, advertiseAmount) {
  for (var i = 0; i < advertiseAmount; i++) {
    adList.push(generateAd());
  }
}

function setupPin(advertise, template) {
  var pinElement = template.cloneNode(true);

  pinElement.style.cssText = `left: ${advertise.location.x}px; top: ${advertise.location.y}px`;
  pinElement.querySelector("img").src = advertise.author.avatar + ".png";
  return pinElement;
}

function renderPins(adList, template, layer) {
  var documentFragment = document.createDocumentFragment();

  for (var i = 0; i < adList.length; i++) {
    var newPin = setupPin(adList[i], template);
    documentFragment.appendChild(newPin);
  }
  pinLayer.appendChild(documentFragment);
}

function setupCard(advertise, template) {
  var cardElement = template.cloneNode(true);

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

function renderCard(advertise, template, layer) {
  var cardElement = setupCard(advertise, template);

  layer.insertBefore(cardElement, mapFilters);
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


mapElement.classList.remove("map--faded");

fillAdList(advertiseList, advertiseAmount);
renderPins(advertiseList, pinTemplate, pinLayer);
renderCard(advertiseList[0], cardTemplate, cardLayer);
