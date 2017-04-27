(function () {
  'use strict';

  angular
    .module('module_name')
    .controller('module_nameListController', module_nameListController);

  module_nameListController.$inject = ['module_nameService'];

  function module_nameListController(module_nameService) {
    var vm = this;

    vm.module_name = module_nameService.query();
  }
}());
