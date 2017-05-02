(function () {
  'use strict';

  // Configuring the agPerson Admin module
  angular
    .module('agPerson.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'مدیریت افراد',
      state: 'admin.agPerson.list'
    });
  }
}());
