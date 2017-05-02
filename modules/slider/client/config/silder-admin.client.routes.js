(function () {
  'use strict';

  angular
    .module('slider.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.slider', {
        abstract: true,
        url: '/slider',
        template: '<ui-view/>'
      })
      .state('admin.slider.list', {
        url: '',
        templateUrl: '/modules/slider/client/views/admin/list-slider.client.view.html',
        controller: 'SliderAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.slider.create', {
        url: '/create',
        templateUrl: '/modules/slider/client/views/admin/form-slider.client.view.html',
        controller: 'SliderAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          sliderResolve: newItem
        }
      })
      .state('admin.slider.edit', {
        url: '/:id/edit',
        templateUrl: '/modules/slider/client/views/admin/form-slider.client.view.html',
        controller: 'SliderAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          sliderResolve: getItem
        }
      });
  }

  getItem.$inject = ['$stateParams', 'SliderService'];

  function getItem($stateParams, SliderService) {
    return SliderService.get({
      id: $stateParams.id
    }).$promise;
  }

  newItem.$inject = ['SliderService'];

  function newItem(SliderService) {
    return new SliderService();
  }
}());
