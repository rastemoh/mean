(function () {
  'use strict';

  angular
    .module('agPerson')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'همکاران کلینیک',
      state: 'agPerson.list',
      roles: ['*']
    });

  }
}());
