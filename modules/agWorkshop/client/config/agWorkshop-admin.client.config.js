(function () {
  'use strict';

  // Configuring the agWorkshop Admin module
  angular
    .module('agWorkshop.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت کارگاه‌ها',
      state: 'admin.agWorkshop.list'
    });
  }
}());
