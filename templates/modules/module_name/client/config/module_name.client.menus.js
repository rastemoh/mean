(function () {
  'use strict';

  angular
    .module('module_name')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Module_name',
      state: 'module_name',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'module_name', {
      title: 'List Module_name',
      state: 'module_name.list',
      roles: ['*']
    });
  }
}());
