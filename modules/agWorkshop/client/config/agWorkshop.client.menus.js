(function () {
  'use strict';

  angular
    .module('agWorkshop')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'کارگاه‌ها',
      state: 'agWorkshop.list',
      roles: ['*']
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'agWorkshop', {
    //   title: 'List AgWorkshop',
    //   state: 'agWorkshop.list',
    //   roles: ['*']
    // });
  }
}());
