(function () {
  'use strict';

  angular
    .module('pages')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'صفحات',
      state: 'pages',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'pages', {
      title: 'لیست صفحات',
      state: 'pages.list',
      roles: ['*']
    });
  }
}());
