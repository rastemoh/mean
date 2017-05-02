(function () {
  'use strict';

  angular
    .module('agPerson.admin')
    .controller('AgPersonAdminListController', AgPersonAdminListController);

  AgPersonAdminListController.$inject = ['AgPersonService'];

  function AgPersonAdminListController(AgPersonService) {
    var vm = this;

    vm.people = AgPersonService.query();
  }
}());
