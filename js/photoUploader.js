(function() {
  var avatarInput = document.querySelector("#avatar");
  var avatarPreview = document.querySelector(".ad-form-header__preview img");

  var imagesInput = document.querySelector("#images")
  var imagesPreview = document.querySelector(".ad-form__photo-container");
  var imageTemplate = imagesPreview.querySelector(".ad-form__photo");


  var IMAGE_EXTENSIONS = ["jpg", "png", "jpeg", "gif"];

  avatarInput.addEventListener("change", function() {
    let file = avatarInput.files[0];
    let fileName = file.name.toLowerCase();

    let match = IMAGE_EXTENSIONS.some(function(it) {
      return fileName.endsWith(it);
    });

    if (match) {
      let fileReader = new FileReader();

      fileReader.addEventListener("load", function() {
        avatarPreview.src = fileReader.result;
      });

      fileReader.readAsDataURL(file);
    }
  })

  function createImageElement(imageTemplate, dataURL) {
    let newImage = imageTemplate.cloneNode();

    newImage.setAttribute("draggable", true);
    newImage.style.cssText = `background-image: url('${dataURL}'); background-size: 100%;
    background-repeat: no-repeat; background-position: center;`
    window.setDragability(newImage);

    return newImage;
  }

  imagesInput.addEventListener("change", function() {
    let file = imagesInput.files[0];
    let fileName = file.name.toLowerCase();

    let matches = IMAGE_EXTENSIONS.some(function(it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      let fileReader = new FileReader();

      fileReader.addEventListener("load", function() {
        console.log(imagesPreview);
        if (imagesPreview.children[1] == imageTemplate) {
          imagesPreview.removeChild(imageTemplate);
        }


        let newImageElement = createImageElement(imageTemplate, fileReader.result);


        if (imagesPreview.children.length == 17) {
          imagesPreview.removeChild(imagesPreview.lastChild)
          imagesPreview.insertBefore(newImage, imagesPreview.children[1]);
        } else {
          imagesPreview.appendChild(newImageElement);
        }
      })

      fileReader.readAsDataURL(file);
    }
  })

  function resetImages() {
    while (imagesPreview.children[1]) {
      imagesPreview.removeChild(imagesPreview.children[1]);
    }
    avatarPreview.src = "img/muffin-grey.svg"
    imagesPreview.appendChild(imageTemplate);
  }

  window.photoUploader = {
    resetImages,
    imagesPreview,
  }
}
)();
