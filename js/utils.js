"use strict";

(function() {
  function getRandomElement(array) {
    var randomElement = array[Math.floor(Math.random() * array.length)];
    return randomElement;
  };

  function getRandomUniqueElement(array) {
    var elementIndex = Math.floor(Math.random() * array.length)
    var randomElement = array[elementIndex];
    array.splice(elementIndex, 1);

    return randomElement;
  };

  function getRandomNumber(min, max) {
    var randomNumber = Math.floor(Math.random()*(max - min) + min);

    return randomNumber;
  };

  function getListOfRandomElements(array) {
    var randomElements = [];
    var randomElementsNumber = Math.floor(Math.random() * array.length);
    var clonedArray = array.slice();

    for (var i = 0; i < randomElementsNumber; i++) {
      randomElements.push(getRandomUniqueElement(clonedArray));
    }

    return randomElements;
  };

  function getRandomlySortedList(array) {
    var randomlySortedList = [];
    var clonedArray = array.slice();

    while (clonedArray.length > 0) {
      randomlySortedList.push(getRandomUniqueElement(clonedArray));
    }
    return randomlySortedList;
  };

  function checkArrayIncluded(fullArray, includedArray) {

    for (var i = 0; i < includedArray.length; i++) {
      if (!fullArray.includes(includedArray[i])) return false;
    }
    return true;
  }

  var utils = {
    getRandomElement: getRandomElement,
    getRandomUniqueElement: getRandomUniqueElement,
    getRandomNumber: getRandomNumber,
    getListOfRandomElements: getListOfRandomElements,
    getRandomlySortedList: getRandomlySortedList,
    checkArrayIncluded,
    ESC_KEYCODE: 27,
  }

  window.utils = utils;
}
)();
