(function () {
  'use strict';

  angular
    .module('module_name.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('module_name', {
        abstract: true,
        url: '/module_name',
        template: '<ui-view/>'
      })
      .state('module_name.list', {
        url: '',
        templateUrl: '/modules/module_name/client/views/list-module_name.client.view.html',
        controller: 'module_nameListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'module_name List'
        }
      })
      .state('module_name.view', {
        url: '/:articleId',
        templateUrl: '/modules/module_name/client/views/view-article.client.view.html',
        controller: 'module_nameController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getArticle
        },
        data: {
          pageTitle: 'Article {{ articleResolve.title }}'
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'module_nameService'];

  function getArticle($stateParams, module_nameService) {
    return module_nameService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }
}());
