(function () {
  'use strict';

  angular
    .module('news.admin')
    .controller('newsAdminListController', NewsAdminListController);

  NewsAdminListController.$inject = ['NewsService'];

  function NewsAdminListController(NewsService) {
    var vm = this;

    vm.news = NewsService.query();
  }
}());
