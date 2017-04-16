(function () {
  'use strict';

  // Configuring the Pages Admin module
  angular
    .module('pages.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت صفحات',
      state: 'admin.pages.list'
    });
  }
}());
