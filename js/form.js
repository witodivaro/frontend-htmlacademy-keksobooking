var adForm = document.querySelector(".ad-form");
var fieldsets = adForm.querySelectorAll("fieldset");
var mapPin = document.querySelector(".map__pin--main");
var allPins;
var existingCard;
var currentType;
var roomNumber;
var body = document.querySelector("body");
var successTemplate = document.querySelector("#success").content.querySelector(".success");
var adCapacitySelect = document.querySelector("#capacity");
var adPriceInput = document.querySelector("#price");
var mapElement = document.querySelector(".map");
var adFormAddressInput = adForm.querySelector("#address");
var MAP_PIN_WIDTH = 64;
var MAP_PIN_HEIGHT = 75;
var existElementsNumberOnPinLayer = 2;
var adType = adForm.querySelector("#type");
var ESC_KEYCODE = 27;

function disableFieldsets() {
  adForm.classList.add("ad-form--disabled");
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute("disabled", "disabled");
  }
}

function activateMap() {
  if (mapElement.classList.contains("map--faded")) {
    mapElement.classList.remove("map--faded");
    renderPins(advertiseList);
    renderCard(advertiseList[0]);
  }
}

function disableMap() {
  mapElement.classList.add("map--faded");
  allPins = mapElement.querySelectorAll(".map__pin[value]");
  for (var i = 0; i < allPins.length; i++) {
    pinLayer.removeChild(allPins[i]);
  }
  existingCard = mapElement.querySelector(".map__card");
  cardLayer.removeChild(existingCard);
}

function activateFieldsets() {
  if (adForm.classList.contains("ad-form--disabled")) {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].removeAttribute("disabled");
    }
    adForm.classList.remove("ad-form--disabled");
  }
}

function fillAddress() {
  // removes px + считает координаты острого конца
  var addressLeft = +mapPin.style.left.slice(0, -2) + MAP_PIN_WIDTH/2;
  var addressTop = +mapPin.style.top.slice(0, -2)  + MAP_PIN_HEIGHT;
  adFormAddressInput.value = addressLeft + ", " + addressTop;
}

function onMapPinMouseUp() {
  activateFieldsets();
  activateMap();
  fillAddress();
}

function changePriceByType() {
  currentType = adForm.querySelector("#type").value;
  adPriceInput.setCustomValidity("гений");

  switch (currentType) {
    case "bungalo":
      adPriceInput.setAttribute("min", 0);
      adPriceInput.setAttribute("placeholder", 0);
      break;
    case "flat":
      adPriceInput.setAttribute("min", 1000);
      adPriceInput.setAttribute("placeholder", 1000);
      break;
    case "house":
      adPriceInput.setAttribute("min", 5000);
      adPriceInput.setAttribute("placeholder", 5000);
      break;
    case "palace":
      adPriceInput.setAttribute("min", 10000);
      adPriceInput.setAttribute("placeholder", 10000);
      break;
  }
}

function setCapacityAvailable(array) {
  var option;
  option = adCapacitySelect.querySelectorAll("option");
  for (var i = 0; i < option.length; i++) {
    if (array.includes(option[i].value)) {
      option[i].removeAttribute("disabled");
    } else {
      if (adCapacitySelect.value == option[i].value) {
        adCapacitySelect.setCustomValidity("Неверное количество комнат.");
      }
      option[i].setAttribute("disabled", "disabled");
    }
  }
}

function resetValidity() {
  adCapacitySelect.setCustomValidity("");
}

function changeCapaityAvailable() {
  roomNumber = adForm.querySelector("#room_number").value;


  switch (roomNumber) {
    case "1":
      setCapacityAvailable(["1"]);
      break;

    case "2":
      setCapacityAvailable(["1", "2"]);
      break;

    case "3":
      setCapacityAvailable(["1", "2", "3"]);
      break;

    case "100":
      setCapacityAvailable(["0"]);
      break;
  }
}

function onAdFormSubmit(evt) {
  evt.preventDefault();
  disableMap();
  disableFieldsets();
  showSuccess();
}

function createSuccess() {
  var successElement = successTemplate.cloneNode(true);
  successElement.classList.add("hidden");
  return successElement;
}

function renderSuccess() {
  var successElement = createSuccess();
  body.appendChild(successElement);
}

function hideSuccess() {
  body.querySelector(".success").classList.add("hidden");
  document.removeEventListener("click", hideSuccess);
  document.removeEventListener("keydown", closeSuccessOnEscape);
}

function closeSuccessOnEscape(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    hideSuccess();
  }
}

function showSuccess() {
  debugger;
  body.querySelector(".success").classList.remove("hidden");
  document.addEventListener("click", hideSuccess);
  document.addEventListener("keydown", closeSuccessOnEscape, true);
};

mapPin.addEventListener("mouseup", onMapPinMouseUp);
adForm.addEventListener("submit", onAdFormSubmit);
disableFieldsets();
fillAddress();
renderSuccess();
