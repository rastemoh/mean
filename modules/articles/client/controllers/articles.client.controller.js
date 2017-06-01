(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['$scope', 'articleResolve', 'Authentication', '$sce'];

  function ArticlesController($scope, article, Authentication, $sce) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.trustHtml = $sce.trustAsHtml;
  }
}());
