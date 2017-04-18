(function () {
  'use strict';

  angular
    .module('pages.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('pages', {
        abstract: true,
        url: '/pages',
        template: '<ui-view/>'
      })
      .state('pages.list', {
        url: '',
        templateUrl: '/modules/pages/client/views/list-pages.client.view.html',
        controller: 'PagesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Pages List'
        }
      })
      .state('pages.view', {
        url: '/:pageUrl',
        templateUrl: '/modules/pages/client/views/view-page.client.view.html',
        controller: 'PagesController',
        controllerAs: 'vm',
        resolve: {
          pageResolve: getPage
        },
        data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      })
    // custom pages routes follows
      .state('main', {
        url: '/main',
        templateUrl: '/modules/pages/client/views/main-page.client.view.html',
        controller: 'MainPageController',
        controllerAs: 'vm'
      })
    ;
  }

  getPage.$inject = ['$stateParams', 'PagesService'];

  function getPage($stateParams, PagesService) {
    return PagesService.get({
      pageUrl: $stateParams.pageUrl
    }).$promise;
  }
}());
