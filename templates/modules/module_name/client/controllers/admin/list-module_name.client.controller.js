(function () {
  'use strict';

  angular
    .module('module_name.admin')
    .controller('module_nameAdminListController', module_nameAdminListController);

  module_nameAdminListController.$inject = ['module_nameService'];

  function module_nameAdminListController(module_nameService) {
    var vm = this;

    vm.module_name = module_nameService.query();
  }
}());
