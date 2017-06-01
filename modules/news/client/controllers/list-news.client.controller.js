(function () {
  'use strict';

  angular
    .module('news')
    .controller('newsListController', NewsListController);

  NewsListController.$inject = ['NewsService'];

  function NewsListController(NewsService) {
    var vm = this;
    vm.news = NewsService.fetchNews();
    vm.title = 'اخبار';
  }
}());
