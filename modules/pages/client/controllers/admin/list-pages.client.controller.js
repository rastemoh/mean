(function () {
  'use strict';

  angular
    .module('pages.admin')
    .controller('PagesAdminListController', PagesAdminListController);

  PagesAdminListController.$inject = ['PagesService'];

  function PagesAdminListController(PagesService) {
    var vm = this;

    vm.pages = PagesService.query();
  }
}());
