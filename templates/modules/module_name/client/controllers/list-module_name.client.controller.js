(function () {
  'use strict';

  angular
    .module('module_name')
    .controller('module_nameListController', Module_nameListController);

  Module_nameListController.$inject = ['Module_nameService'];

  function Module_nameListController(Module_nameService) {
    var vm = this;

    vm.module_names = Module_nameService.query();
  }
}());
