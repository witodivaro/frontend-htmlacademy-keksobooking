"use strict";

(function() {
  var adForm = document.querySelector(".ad-form");
  var fieldsets = adForm.querySelectorAll("fieldset");
  var roomNumber;
  var body = document.querySelector("body");
  var successTemplate = document.querySelector("#success").content.querySelector(".success");
  var adCapacitySelect = document.querySelector("#capacity");
  var uploadURL = "https://javascript.pages.academy/keksobooking";

  function disableFieldsets() {
    adForm.classList.add("ad-form--disabled");
    adForm.reset();
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute("disabled", "disabled");
    }
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
    var adFormAddressInput = adForm.querySelector("#address");
    var mapPin = document.querySelector(".map__pin--main");
    var addressLeft = +mapPin.style.left.slice(0, -2) + window.pin.MAIN_PIN_WIDTH/2;
    var addressTop = +mapPin.style.top.slice(0, -2)  + window.pin.MAIN_PIN_HEIGHT;

    adFormAddressInput.value = addressLeft + ", " + addressTop;
  }


  function changePriceByType() {
    var adPriceInput = document.querySelector("#price");
    var currentType = adForm.querySelector("#type").value;

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
    var option = adCapacitySelect.querySelectorAll("option");
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
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      hideSuccess();
    }
  }

  function showSuccess() {
    body.focus();
    body.querySelector(".success").classList.remove("hidden");
    document.addEventListener("click", hideSuccess);
    document.addEventListener("keydown", closeSuccessOnEscape);
  };

  function onAdFormSubmit(evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);

    window.backend.upload(uploadURL, formData, function(response) {
      showSuccess();
      window.map.disableMap();
      window.pin.removePins();
      disableFieldsets();
    });

  }


  adForm.addEventListener("submit", onAdFormSubmit);

  disableFieldsets();
  fillAddress();
  renderSuccess();

  var form = {
    activateFieldsets: activateFieldsets,
    fillAddress: fillAddress,
    changePriceByType: changePriceByType,
    changeCapaityAvailable: changeCapaityAvailable,
    resetValidity: resetValidity,
  }

  window.form = form;
}
)();
