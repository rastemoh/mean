(function () {
  'use strict';

  angular
    .module('agWorkshop')
    .controller('AgWorkshopListController', AgWorkshopListController);

  AgWorkshopListController.$inject = ['AgWorkshopService'];

  function AgWorkshopListController(AgWorkshopService) {
    var vm = this;

    vm.workshops = AgWorkshopService.query();
    console.log(vm.workshops.length)
  }
}());
