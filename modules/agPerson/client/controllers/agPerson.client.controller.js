(function () {
  'use strict';

  angular
    .module('agPerson')
    .controller('AgPersonController', AgPersonController);

  AgPersonController.$inject = ['agPersonResolve', 'Authentication', '$sce'];

  function AgPersonController(agPerson, Authentication, $sce) {
    var vm = this;

    vm.person = agPerson;
    vm.authentication = Authentication;
    vm.trustHtml = $sce.trustAsHtml;

  }
}());
