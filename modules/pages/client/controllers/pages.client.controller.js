(function () {
  'use strict';

  angular
    .module('pages')
    .controller('PagesController', PagesController);

  PagesController.$inject = ['$scope', 'pageResolve', 'Authentication', '$sce'];

  function PagesController($scope, page, Authentication, $sce) {
    var vm = this;

    vm.page = page;
    vm.trustHtml = $sce.trustAsHtml;
    vm.authentication = Authentication;

  }
}());
