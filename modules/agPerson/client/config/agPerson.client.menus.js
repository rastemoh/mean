(function () {
  'use strict';

  angular
    .module('agPerson')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'AgPerson',
    //   state: 'agPerson',
    //   type: 'dropdown',
    //   roles: ['*']
    // });
    //
    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'agPerson', {
    //   title: 'List AgPerson',
    //   state: 'agPerson.list',
    //   roles: ['*']
    // });
  }
}());
