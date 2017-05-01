(function () {
  'use strict';

  angular
    .module('news.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.news', {
        abstract: true,
        url: '/news',
        template: '<ui-view/>'
      })
      .state('admin.news.list', {
        url: '',
        templateUrl: '/modules/news/client/views/admin/list-news.client.view.html',
        controller: 'newsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.news.create', {
        url: '/create',
        templateUrl: '/modules/news/client/views/admin/form-news.client.view.html',
        controller: 'NewsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          newsResolve: newItem
        }
      })
      .state('admin.news.edit', {
        url: '/:id/edit',
        templateUrl: '/modules/news/client/views/admin/form-news.client.view.html',
        controller: 'NewsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          newsResolve: getItem
        }
      });
  }

  getItem.$inject = ['$stateParams', 'NewsService'];

  function getItem($stateParams, NewsService) {
    return NewsService.get({
      id: $stateParams.id
    }).$promise;
  }

  newItem.$inject = ['NewsService'];

  function newItem(NewsService) {
    return new NewsService();
  }
}());
