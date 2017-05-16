(function () {
  'use strict';

  angular
    .module('agWorkshop')
    .controller('AgWorkshopListController', AgWorkshopListController);

  AgWorkshopListController.$inject = ['AgWorkshopService'];

  function AgWorkshopListController(AgWorkshopService) {
    var vm = this;

    vm.agWorkshops = AgWorkshopService.query();
  }
}());
