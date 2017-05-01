(function () {
  'use strict';

  // Configuring the news Admin module
  angular
    .module('news.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage news',
      state: 'admin.news.list'
    });
  }
}());
