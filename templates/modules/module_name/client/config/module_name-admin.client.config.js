(function () {
  'use strict';

  // Configuring the module_name Admin module
  angular
    .module('module_name.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage module_name',
      state: 'admin.module_name.list'
    });
  }
}());
