(function () {
  'use strict';

  // Configuring the news Admin module
  angular
    .module('news.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت اخبار',
      state: 'admin.news.list'
    });
  }
}());
