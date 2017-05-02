(function () {
  'use strict';

  // Configuring the slider Admin module
  angular
    .module('slider.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت اسلایدر',
      state: 'admin.slider.list'
    });
  }
}());
