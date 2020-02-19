'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  function addPicture(fileChooser, isPreview, preview) {
    var file = fileChooser.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });
    }

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {

        if (isPreview) {
          preview.src = reader.result;
        } else {
          var newPreview = document.createElement('img');
          newPreview.src = reader.result;
          newPreview.width = 70;
          newPreview.height = 70;
          newPreview.style = 'object-fit: cover; margin-bottom: 8px; margin-right: 10px;';
          newPreview.alt = 'Превью';
          preview.insertBefore(newPreview, preview.children[preview.children.length - 1]);
        }
      });

      reader.readAsDataURL(file);
    }
  }

  // function(imgBlock) {
  //   var pictures = imgBlock.querySelectorAll('img');
  // }
})();
