(function () {
  'use strict';

  angular
    .module('agPerson')
    .controller('agPersonListController', AgPersonListController);

  AgPersonListController.$inject = ['AgPersonService'];

  function AgPersonListController(AgPersonService) {
    var vm = this;

    vm.agPersons = AgPersonService.query();
  }
}());
