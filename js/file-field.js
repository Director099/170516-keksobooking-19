'use strict';

function FileUploader() {
  this.FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  this.imgAttributes = {
    width: 70,
    height: 70,
    alt: 'Превью',
    style: 'object-fit: cover; margin-bottom: 8px; margin-right: 10px; border-radius: 5px'
  };
}

/**
 * @description - Добавление изображение после загрузки файла
 * @param fileChooser - Элемент при добавление файла
 * @param isPreview {boolean} - Проверка на аватарку или нет
 * @param preview - Вывод изображения после загрузки
 */

FileUploader.prototype = {
  addPicture: function (fileChooser, isPreview, preview) {
    var file = fileChooser.files[0];
    var settingsImg = this.imgAttributes;

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = this.FILE_TYPES.some(function (it) {
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
          newPreview.width = settingsImg.width;
          newPreview.height = settingsImg.height;
          newPreview.alt = settingsImg.alt;
          newPreview.style = settingsImg.style;
          preview.insertBefore(newPreview, preview.children[preview.children.length - 1]);
        }
      });

      reader.readAsDataURL(file);
    }
  },
  removePicture: function (imgBlock) {
    var pictures = imgBlock.querySelectorAll('img');
    pictures.forEach(function (picture) {
      picture.remove();
    });
  }
};
