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
        controller: 'Module_nameListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'module_name List'
        }
      })
      .state('module_name.view', {
        url: '/:id',
        templateUrl: '/modules/module_name/client/views/view-module_name.client.view.html',
        controller: 'Module_nameController',
        controllerAs: 'vm',
        resolve: {
          module_nameResolve: getModule_name
        },
        data: {
          pageTitle: 'Module_name {{ module_nameResolve.title }}'
        }
      });
  }

  getModule_name.$inject = ['$stateParams', 'Module_nameService'];

  function getModule_name($stateParams, Module_nameService) {
    return Module_nameService.get({
      id: $stateParams.id
    }).$promise;
  }
}());
