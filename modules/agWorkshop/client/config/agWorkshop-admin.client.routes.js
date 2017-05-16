(function () {
  'use strict';

  angular
    .module('agWorkshop.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.agWorkshop', {
        abstract: true,
        url: '/agWorkshop',
        template: '<ui-view/>'
      })
      .state('admin.agWorkshop.list', {
        url: '',
        templateUrl: '/modules/agWorkshop/client/views/admin/list-agWorkshop.client.view.html',
        controller: 'AgWorkshopAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.agWorkshop.create', {
        url: '/create',
        templateUrl: '/modules/agWorkshop/client/views/admin/form-agWorkshop.client.view.html',
        controller: 'AgWorkshopAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          agWorkshopResolve: newItem
        }
      })
      .state('admin.agWorkshop.edit', {
        url: '/:id/edit',
        templateUrl: '/modules/agWorkshop/client/views/admin/form-agWorkshop.client.view.html',
        controller: 'AgWorkshopAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          agWorkshopResolve: getItem
        }
      });
  }

  getItem.$inject = ['$stateParams', 'AgWorkshopService'];

  function getItem($stateParams, AgWorkshopService) {
    return AgWorkshopService.get({
      id: $stateParams.id
    }).$promise;
  }

  newItem.$inject = ['AgWorkshopService'];

  function newItem(AgWorkshopService) {
    return new AgWorkshopService();
  }
}());
