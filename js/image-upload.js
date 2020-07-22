'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var userPhotoChooser = document.querySelector('.ad-form__field').querySelector('input');
  var userPhotoPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
  var adPhotoChooser = document.querySelector('.ad-form__upload').querySelector('input');
  var adPhotoPreview = document.querySelector('.ad-form__photo');

  var setBackgroundImage = function (chooser, preview, reader) {
    preview.style.backgroundSize = 'contain';
    preview.style.backgroundRepeat = 'no-repeat';
    preview.style.backgroundPosition = 'center';
    reader.addEventListener('load', function () {
      preview.style.backgroundImage = 'url(' + reader.result + ')';
    });
  };

  var uploadImage = function (chooser, preview) {
    chooser.addEventListener('change', function (evt) {
      var file = chooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        if (preview.src) {
          reader.addEventListener('load', function () {
            preview.src = reader.result;
          });
        } else {
          setBackgroundImage(chooser, preview, reader);
        }
      } else {
        evt.preventDefault();
      }
    });
  };

  var resetImages = function () {
    userPhotoPreview.src = 'img/muffin-grey.svg';
    adPhotoPreview.style.background = '#e4e4de';
  };

  uploadImage(userPhotoChooser, userPhotoPreview);
  uploadImage(adPhotoChooser, adPhotoPreview);

  window.imageUpload = {
    reset: resetImages
  };
})();
