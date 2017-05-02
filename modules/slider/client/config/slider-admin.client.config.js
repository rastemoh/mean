(function () {
  'use strict';

  // Configuring the slider Admin module
  angular
    .module('slider.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Slider',
      state: 'admin.slider.list'
    });
  }
}());
