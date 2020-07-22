(function utils() {
  utils = {
    getRandomElement: function(array) {
      var randomElement = array[Math.floor(Math.random() * array.length)];
      return randomElement;
    },

    getRandomUniqueElement: function(array) {
      var elementIndex = Math.floor(Math.random() * array.length)
      var randomElement = array[elementIndex];
      array.splice(elementIndex, 1);

      return randomElement;
    },

    getRandomNumber: function(min, max) {
      var randomNumber = Math.floor(Math.random()*(max - min) + min);

      return randomNumber;
    },

    getListOfRandomElements: function(array) {
      var randomElements = [];
      var randomElementsNumber = Math.floor(Math.random() * array.length);
      var clonedArray = array.slice();

      for (var i = 0; i < randomElementsNumber; i++) {
        randomElements.push(getRandomUniqueElement(clonedArray));
      }

      return randomElements;
    },

    getRandomlySortedList: function(array) {
      var randomlySortedList = [];
      var clonedArray = array.slice();

      while (clonedArray.length > 0) {
        randomlySortedList.push(getRandomUniqueElement(clonedArray));
      }
      return randomlySortedList;
    }
  }
  window.utils = utils;
)();
