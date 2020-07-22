(function data() {

  var hotelAdvertise;
  var avatars = ["01", "02", "03", "04", "05", "06", "07", "08"];
  var rooms = [1, 2, 3, 4, 5];
  var times = ["12:00", "13:00", "14:00"];
  var types = ["palace", "flat", "house", "bungalo"];
  var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
  var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
  var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]

  var generateAd = function() {
    var adObject = {
      "author": {
        "avatar": "img/avatars/user" + window.utils.getRandomUniqueElement(avatars)
      },

      "offer": {
        "title": window.utils.RandomUniqueElement(titles),
        "address": `${window.utils.RandomNumber(0, 600)}, ${window.utils.RandomNumber(0, 350)}`,
        "price": window.utils.RandomNumber(1000, 1000000),
        "type": window.utils.RandomElement(types),
        "rooms": window.utils.RandomElement(rooms),
        "guests": window.utils.RandomNumber(5, 200),
        "checkin": window.utils.RandomElement(times),
        "checkout": window.utils.RandomElement(times),
        "features": window.utils.ListOfRandomElements(features),
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, commodi hic voluptatibus inventore ab dolor placeat rerum molestiae quisquam natus nobis fugiat minus iste nulla. Inventore excepturi, aperiam sed dicta?",
        "photos": window.utils.RandomlySortedList(photos)
      },

      "location": {
        x: window.utils.RandomNumber(0, mapElement.offsetWidth),
        y: window.utils.RandomNumber(130, 630)
      }
    }

    return adObject;
  }

  function fillAdList(adList, advertiseAmount) {
    for (var i = 0; i < advertiseAmount; i++) {
      adList.push(generateAd());
    }
  }

  data = {
    fillAdList: fillAdList;
  }

  window.data = data;
})();
