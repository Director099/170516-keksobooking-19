'use strict';

(function () {
  function activatePage() {
    if (!window.utils.map.classList.contains('map--faded')) {
      return false;
    }
    window.form.activate();
    new Server().load(window.filter.successHandler);
    window.utils.map.classList.remove('map--faded');
    return true;
  }

  function deactivatePage() {
    if (window.utils.map.classList.contains('map--faded')) {
      return false;
    }
    window.form.deactivate();
    window.utils.map.classList.add('map--faded');
    return true;
  }

  window.page = {
    deactivatePage: deactivatePage,
    activatePage: activatePage
  };
}());
