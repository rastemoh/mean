(function () {
  'use strict';

  angular
    .module('news.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('news', {
        abstract: true,
        url: '/news',
        template: '<ui-view/>'
      })
      .state('news.list', {
        url: '/list',
        templateUrl: '/modules/news/client/views/list-news.client.view.html',
        controller: 'newsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'اخبار'
        }
      })
      .state('news.notes', {
        url: '/notes',
        templateUrl: '/modules/news/client/views/list-news.client.view.html',
        controller: 'notesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'یادداشت‌ها'
        }
      })
      .state('news.view', {
        url: '/:id',
        templateUrl: '/modules/news/client/views/view-news.client.view.html',
        controller: 'newsController',
        controllerAs: 'vm',
        resolve: {
          newsResolve: getNews
        },
        data: {
          pageTitle: '{{ newsResolve.title }}'
        }
      });
  }

  getNews.$inject = ['$stateParams', 'NewsService'];

  function getNews($stateParams, NewsService) {
    return NewsService.get({
      id: $stateParams.id
    }).$promise;
  }
}());
