(function () {
  'use strict';

  angular
    .module('agPerson.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.agPerson', {
        abstract: true,
        url: '/agPerson',
        template: '<ui-view/>'
      })
      .state('admin.agPerson.list', {
        url: '',
        templateUrl: '/modules/agPerson/client/views/admin/list-agPerson.client.view.html',
        controller: 'AgPersonAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.agPerson.create', {
        url: '/create',
        templateUrl: '/modules/agPerson/client/views/admin/form-agPerson.client.view.html',
        controller: 'AgPersonAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          agPersonResolve: newItem
        }
      })
      .state('admin.agPerson.edit', {
        url: '/:id/edit',
        templateUrl: '/modules/agPerson/client/views/admin/form-agPerson.client.view.html',
        controller: 'AgPersonAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          agPersonResolve: getItem
        }
      });
  }

  getItem.$inject = ['$stateParams', 'AgPersonService'];

  function getItem($stateParams, AgPersonService) {
    return AgPersonService.get({
      id: $stateParams.id
    }).$promise;
  }

  newItem.$inject = ['AgPersonService'];

  function newItem(AgPersonService) {
    return new AgPersonService();
  }
}());
