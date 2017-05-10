(function () {
  'use strict';

  angular
    .module('agPerson')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'همکاران کلینیک',
      state: 'agPerson',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'agPerson', {
      title: 'لیست همکاران',
      state: 'agPerson.list',
      roles: ['*']
    });
  }
}());
