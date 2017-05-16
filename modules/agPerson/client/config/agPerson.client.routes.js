(function () {
  'use strict';

  angular
    .module('agPerson.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('agPerson', {
        abstract: true,
        url: '/agPerson',
        template: '<ui-view/>'
      })
      .state('agPerson.list', {
        url: '',
        templateUrl: '/modules/agPerson/client/views/list-agPerson.client.view.html',
        controller: 'AgPersonListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'لیست همکاران کلینیک'
        }
      })
      .state('agPerson.view', {
        url: '/:id',
        templateUrl: '/modules/agPerson/client/views/view-agPerson.client.view.html',
        controller: 'AgPersonController',
        controllerAs: 'vm',
        resolve: {
          agPersonResolve: getAgPerson
        },
        data: {
          pageTitle: '{{ agPersonResolve.title }}'
        }
      });
  }

  getAgPerson.$inject = ['$stateParams', 'AgPersonService'];

  function getAgPerson($stateParams, AgPersonService) {
    return AgPersonService.get({
      id: $stateParams.id
    }).$promise;
  }
}());
