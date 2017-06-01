(function () {
  'use strict';

  angular
    .module('news')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'خبر و یادداشت',
      state: 'news',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'news', {
      title: 'اخبار',
      state: 'news.list',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'news', {
      title: 'یادداشت‌ها',
      state: 'news.notes',
      roles: ['*']
    });
  }
}());
