(function () {
  'use strict';

  angular
    .module('agWorkshop')
    .controller('AgWorkshopController', AgWorkshopController);

  AgWorkshopController.$inject = ['$scope', 'agWorkshopResolve', 'Authentication', '$sce'];

  function AgWorkshopController($scope, agWorkshop, Authentication, $sce) {
    var vm = this;

    vm.item = agWorkshop;
    vm.authentication = Authentication;
    vm.trustHtml = $sce.trustAsHtml;

  }
}());
