(function () {
  'use strict';

  angular
    .module('module_name')
    .controller('module_nameController', module_nameController);

  module_nameController.$inject = ['$scope', 'module_nameResolve', 'Authentication'];

  function module_nameController($scope, module_name, Authentication) {
    var vm = this;

    vm.article = module_name;
    vm.authentication = Authentication;

  }
}());
