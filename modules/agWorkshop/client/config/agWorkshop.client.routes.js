(function () {
  'use strict';

  angular
    .module('agWorkshop.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('agWorkshop', {
        abstract: true,
        url: '/agWorkshop',
        template: '<ui-view/>'
      })
      .state('agWorkshop.list', {
        url: '',
        templateUrl: '/modules/agWorkshop/client/views/list-agWorkshop.client.view.html',
        controller: 'AgWorkshopListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'لیست کارگاه‌ها'
        }
      })
      .state('agWorkshop.view', {
        url: '/:id',
        templateUrl: '/modules/agWorkshop/client/views/view-agWorkshop.client.view.html',
        controller: 'AgWorkshopController',
        controllerAs: 'vm',
        resolve: {
          agWorkshopResolve: getAgWorkshop
        },
        data: {
          pageTitle: 'کارگاه {{ agWorkshopResolve.title }}'
        }
      });
  }

  getAgWorkshop.$inject = ['$stateParams', 'AgWorkshopService'];

  function getAgWorkshop($stateParams, AgWorkshopService) {
    return AgWorkshopService.get({
      id: $stateParams.id
    }).$promise;
  }
}());
