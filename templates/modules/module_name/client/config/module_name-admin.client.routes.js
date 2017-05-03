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
        controller: 'Module_nameAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.module_name.create', {
        url: '/create',
        templateUrl: '/modules/module_name/client/views/admin/form-module_name.client.view.html',
        controller: 'Module_nameAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          module_nameResolve: newItem
        }
      })
      .state('admin.module_name.edit', {
        url: '/:id/edit',
        templateUrl: '/modules/module_name/client/views/admin/form-module_name.client.view.html',
        controller: 'Module_nameAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          module_nameResolve: getItem
        }
      });
  }

  getItem.$inject = ['$stateParams', 'Module_nameService'];

  function getItem($stateParams, Module_nameService) {
    return Module_nameService.get({
      id: $stateParams.id
    }).$promise;
  }

  newItem.$inject = ['Module_nameService'];

  function newItem(Module_nameService) {
    return new Module_nameService();
  }
}());
