(function () {
  'use strict';

  angular
    .module('module_name')
    .controller('module_nameController', Module_nameController);

  Module_nameController.$inject = ['$scope', 'module_nameResolve', 'Authentication'];

  function Module_nameController($scope, module_name, Authentication) {
    var vm = this;

    vm.item = module_name;
    vm.authentication = Authentication;

  }
}());
