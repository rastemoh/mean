(function () {
  'use strict';

  angular
    .module('agPerson')
    .controller('AgPersonListController', AgPersonListController);

  AgPersonListController.$inject = ['AgPersonService'];

  function AgPersonListController(AgPersonService) {
    var vm = this;

    vm.agPersons = AgPersonService.query();
  }
}());
