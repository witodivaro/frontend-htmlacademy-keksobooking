"use strict";

//  GET: https://javascript.pages.academy/keksobooking/data
// POST: https://javascript.pages.academy/keksobooking

(function() {

  function onError(errorMsg) {
    var node = document.createElement("div");
    node.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: green;"
    node.style.position = "fixed";
    node.style.left = '0';
    node.style.top = '0';
    node.style.fontSize = '30px';

    node.textContent = errorMsg;

    node.addEventListener("click", function() {
      document.body.removeChild(node);
    })
    document.body.appendChild(node);

    setTimeout(deleteError, 5000, node);
  }

  function deleteError(error) {
    try {
      document.body.removeChild(error);
    }
    catch (e) {
      console.log("The element was already deleted"); }
  }

  function upload(url, data, onLoad) {
    var xhr = new XMLHttpRequest;

    xhr.responseType = 'json';

    xhr.addEventListener("load", function() {
      onLoad(xhr.response);
    });

    xhr.addEventListener("error", function() {
      onError(xhr.statusText);
    })

    xhr.open("POST", url);
    xhr.send(data);
  }

  function download(url, onLoad) {
    var xhr = new XMLHttpRequest;

    xhr.responseType = 'json';

    xhr.addEventListener("load", function() {
      onLoad(xhr.response);
    });

    xhr.addEventListener("error", function() {
      console.log("There was an error: " + xhr.statusText);
    })

    xhr.addEventListener("error", function() {
      console.log("Download timed out after " + xhr.timeout + "s");
    })

    xhr.timeout = 10000;
    xhr.open("GET", url);
    xhr.send();
  }

  var backend = {
    upload: upload,
    download: download,
  }

  window.backend = backend;
})();
