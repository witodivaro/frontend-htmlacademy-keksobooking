(function() {
  var typeFilter = document.querySelector("#housing-type");
  var priceFilter = document.querySelector("#housing-price");
  var roomsFilter = document.querySelector("#housing-rooms");
  var guestsFilter = document.querySelector("#housing-guests");
  let checkboxInputs = document.querySelectorAll(".map__checkbox");
  var advertiseList;
  let debouncer = window.debounce;

  function getList() {
    advertiseList = window.map.advertiseList;
    if (advertiseList.length == 0) {
      setTimeout(getList, 100);
    }
  }

  function getChange(filterType) {
    let newValue = filterType.value;
    return newValue;
  };

  function filterByType(array, type) {
    array = array.filter(function(element) {
      return element.offer.type == type;
    })
    return array;
  }


  function switchTypeFilter(array, types) {
    let change = getChange(typeFilter);
    for (var i = 0; i < types.length; i++) {
      if (change == "any") return array;
      if (change == types[i]) {
        return filterByType(array, change);
      }
    }
  }

  function filterByPrice(array, minPrice, maxPrice) {
    array = array.filter(function(elem) {
      if (elem.offer.price > minPrice && elem.offer.price < maxPrice) {
        return true;
      }
      return false;
    });
    return array;
  }

  function filterByRooms(array, roomsNumber) {
    array = array.filter(function(elem) {
      return elem.offer.rooms == roomsNumber;
    });
    return array;
  }

  function switchRoomsFilter(array, rooms) {
    let change = getChange(roomsFilter);
    for (var i = 0; i < rooms.length; i++) {
      if (change == "any") return array;
      if (+change == rooms[i]) {
        return filterByRooms(array, rooms[i])
      }
    }
  }

  function filterByGuests(array, guestsNumber) {
    array = array.filter(function(elem) {
      return elem.offer.guests == guestsNumber;
    })
    return array;
  }

  function switchGuestsFilter(array, guests) {
    let change = getChange(guestsFilter);

    for (var i = 0; i < guests.length; i++) {
      if (change == "any") return array;
      if (+change == guests[i]) {
        return filterByGuests(array, guests[i])
      }
    }
  }

  function getCheckboxFilters() {
    let checkboxFilter = [];

    for (var i = 0; i < checkboxInputs.length; i++) {
      if (checkboxInputs[i].checked) {
        checkboxFilter.push(checkboxInputs[i].value);
      }
    }
    return checkboxFilter;
  }

  function addEventListenersToCheckboxes() {
    for (var i = 0; i < checkboxInputs.length; i++) {
      checkboxInputs[i].addEventListener("click", debouncer(updateMapPins));
    }
  }

  function filterByFeatures(array, features) {
    array = array.filter(function(elem) {
      return window.utils.checkArrayIncluded(elem.offer.features, features);
    })
    return array;
  }

  function getFilteredAdvertiseList(advertiseList) {
    let newAdvertiseList = advertiseList.slice();
    let noPrice = 0;
    let lowPrice = 10000;
    let middlePrice = 50000;
    let highPrice = Infinity;
    let checkboxFilters = getCheckboxFilters();

    newAdvertiseList = switchTypeFilter(newAdvertiseList, ["palace", "house", "bungalo", "flat", "any"]);

    switch(getChange(priceFilter)) {
      case "low":
        newAdvertiseList = filterByPrice(newAdvertiseList, noPrice, lowPrice);
        break;
      case "middle":
        newAdvertiseList = filterByPrice(newAdvertiseList, lowPrice, middlePrice);
        break;
      case "high":
        newAdvertiseList = filterByPrice(newAdvertiseList, middlePrice, highPrice);
        break;
    }

    newAdvertiseList = switchRoomsFilter(newAdvertiseList, [1, 2, 3, "any"]);
    newAdvertiseList = switchGuestsFilter(newAdvertiseList, [0, 1, 2, "any"]);
    newAdvertiseList = filterByFeatures(newAdvertiseList, checkboxFilters);
    return newAdvertiseList;
  }

  function updateMapPins() {
    let filteredAdvertiseList = getFilteredAdvertiseList(advertiseList);
    window.pin.removePins(window.map.pinLayer);
    window.pin.renderPins(filteredAdvertiseList, window.map.pinLayer);
  }

  typeFilter.addEventListener("change", debouncer(updateMapPins));
  priceFilter.addEventListener("change", debouncer(updateMapPins));
  roomsFilter.addEventListener("change", debouncer(updateMapPins));
  guestsFilter.addEventListener("change", debouncer(updateMapPins));
  addEventListenersToCheckboxes();

  getList();

}
)();
