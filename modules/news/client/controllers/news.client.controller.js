(function () {
  'use strict';

  angular
    .module('news')
    .controller('newsController', NewsController);

  NewsController.$inject = ['$scope', 'newsResolve', 'Authentication'];

  function NewsController($scope, news, Authentication) {
    var vm = this;

    vm.item = news;
    vm.authentication = Authentication;

  }
}());
