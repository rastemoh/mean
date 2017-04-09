(function () {
  'use strict';

  angular
    .module('pages.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.pages', {
        abstract: true,
        url: '/pages',
        template: '<ui-view/>'
      })
      .state('admin.pages.list', {
        url: '',
        templateUrl: '/modules/pages/client/views/admin/list-pages.client.view.html',
        controller: 'PagesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.pages.create', {
        url: '/create',
        templateUrl: '/modules/pages/client/views/admin/form-page.client.view.html',
        controller: 'PagesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          pageResolve: newPage
        }
      })
      .state('admin.pages.edit', {
        url: '/:pageUrl/edit',
        templateUrl: '/modules/pages/client/views/admin/form-page.client.view.html',
        controller: 'PagesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          pageResolve: getPage
        }
      });
  }

  getPage.$inject = ['$stateParams', 'PagesService'];

  function getPage($stateParams, PagesService) {
    return PagesService.get({
      pageUrl: $stateParams.pageUrl
    }).$promise;
  }

  newPage.$inject = ['PagesService'];

  function newPage(PagesService) {
    return new PagesService();
  }
}());
