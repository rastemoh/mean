(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'مدیریت',
      state: 'admin',
      type: 'dropdown',
      position: 10,
      roles: ['admin']
    });
  }
}());
