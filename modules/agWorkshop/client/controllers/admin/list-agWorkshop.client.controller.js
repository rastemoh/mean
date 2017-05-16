(function () {
  'use strict';

  angular
    .module('agWorkshop.admin')
    .controller('AgWorkshopAdminListController', AgWorkshopAdminListController);

  AgWorkshopAdminListController.$inject = ['AgWorkshopService'];

  function AgWorkshopAdminListController(AgWorkshopService) {
    var vm = this;

    vm.workshops = AgWorkshopService.query();
  }
}());
