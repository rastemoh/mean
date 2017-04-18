(function () {
  'use strict';

  angular
    .module('pages')
    .controller('MainPageController', MainPageController);

  MainPageController.$inject = ['$scope'];

  function MainPageController($scope) {
    var vm = this;
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    var currIndex = 0;

    this.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: 'https://unsplash.it/' + newWidth + '/300',
        text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
        id: currIndex++
      });
    };

    for (var i = 0; i < 4; i++) {
      this.addSlide();
    }

  }
}());
