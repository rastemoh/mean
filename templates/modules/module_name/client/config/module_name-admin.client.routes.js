(function () {
  'use strict';

  angular
    .module('module_name.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.module_name', {
        abstract: true,
        url: '/module_name',
        template: '<ui-view/>'
      })
      .state('admin.module_name.list', {
        url: '',
        templateUrl: '/modules/module_name/client/views/admin/list-module_name.client.view.html',
        controller: 'module_nameAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.module_name.create', {
        url: '/create',
        templateUrl: '/modules/module_name/client/views/admin/form-article.client.view.html',
        controller: 'module_nameAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: newArticle
        }
      })
      .state('admin.module_name.edit', {
        url: '/:articleId/edit',
        templateUrl: '/modules/module_name/client/views/admin/form-article.client.view.html',
        controller: 'module_nameAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          articleResolve: getArticle
        }
      });
  }

  getArticle.$inject = ['$stateParams', 'module_nameService'];

  function getArticle($stateParams, module_nameService) {
    return module_nameService.get({
      articleId: $stateParams.articleId
    }).$promise;
  }

  newArticle.$inject = ['module_nameService'];

  function newArticle(module_nameService) {
    return new module_nameService();
  }
}());
