(function () {
  'use strict';

  angular
    .module('agWorkshop')
    .controller('AgWorkshopController', AgWorkshopController);

  AgWorkshopController.$inject = ['$scope', 'agWorkshopResolve', 'Authentication'];

  function AgWorkshopController($scope, agWorkshop, Authentication) {
    var vm = this;

    vm.item = agWorkshop;
    vm.authentication = Authentication;

  }
}());
