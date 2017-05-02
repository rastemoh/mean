(function () {
  'use strict';

  angular
    .module('slider.admin')
    .controller('SliderAdminListController', SliderAdminListController);

  SliderAdminListController.$inject = ['SliderService'];

  function SliderAdminListController(SliderService) {
    var vm = this;

    vm.slides = SliderService.query();
  }
}());
