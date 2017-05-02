(function () {
  'use strict';

  angular
    .module('module_name.admin')
    .controller('Module_nameAdminListController', Module_nameAdminListController);

  Module_nameAdminListController.$inject = ['Module_nameService'];

  function Module_nameAdminListController(Module_nameService) {
    var vm = this;

    vm.module_names = Module_nameService.query();
  }
}());
