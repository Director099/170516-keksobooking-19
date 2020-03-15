'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgAttributes = {
    width: 70,
    height: 70,
    alt: 'Превью',
    style: 'object-fit: cover; margin-bottom: 8px; margin-right: 10px; border-radius: 5px'
  };

  /**
   * @description - Добавление изображение после загрузки файла
   * @param fileChooser - Элемент при добавление файла
   * @param isPreview {boolean} - Проверка на аватарку или нет
   * @param preview - Вывод изображения после загрузки
   */

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
          newPreview.width = imgAttributes.width;
          newPreview.height = imgAttributes.height;
          newPreview.alt = imgAttributes.alt;
          newPreview.style = imgAttributes.style;
          preview.insertBefore(newPreview, preview.children[preview.children.length - 1]);
        }
      });

      reader.readAsDataURL(file);
    }
  }

  function removePicture(imgBlock) {
    var pictures = imgBlock.querySelectorAll('img');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  }

  window.fileField = {
    addPicture: addPicture,
    removePicture: removePicture
  };
})();
