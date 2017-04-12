(function () {
  'use strict';

  angular
    .module('files')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Files',
      state: 'files.list'
    });
  }
}());
