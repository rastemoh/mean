(function () {
  'use strict';

  angular
    .module('agPerson')
    .controller('agPersonController', AgPersonController);

  AgPersonController.$inject = ['$scope', 'agPersonResolve', 'Authentication'];

  function AgPersonController($scope, agPerson, Authentication) {
    var vm = this;

    vm.item = agPerson;
    vm.authentication = Authentication;

  }
}());
