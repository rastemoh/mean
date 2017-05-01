(function () {
  'use strict';

  angular
    .module('news')
    .controller('newsController', NewsController);

  NewsController.$inject = ['$scope', 'newsResolve', 'Authentication', '$sce'];

  function NewsController($scope, news, Authentication, $sce) {
    var vm = this;
    vm.item = news;
    vm.trustHtml = $sce.trustAsHtml;
    vm.authentication = Authentication;

  }
}());
