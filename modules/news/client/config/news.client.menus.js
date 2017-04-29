(function () {
  'use strict';

  angular
    .module('news')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'News',
      state: 'news',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'news', {
      title: 'List News',
      state: 'news.list',
      roles: ['*']
    });
  }
}());
