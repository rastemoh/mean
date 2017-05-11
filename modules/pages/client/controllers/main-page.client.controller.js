(function () {
  'use strict';

  angular
    .module('pages.custom')
    .controller('MainPageController', MainPageController);

  MainPageController.$inject = ['$scope', 'SliderService', 'AgPersonService'];

  function MainPageController($scope, SliderService, PeopleService) {
    var vm = this;
    vm.interval = 5000;
    vm.noWrapSlides = false;
    vm.active = 0;
    vm.slides = SliderService.query();
    vm.people = PeopleService.query();

  }
}());
