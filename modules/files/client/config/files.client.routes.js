(function () {
  'use strict';

  angular
    .module('files.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('files', {
        abstract: true,
        url: '/files',
        template: '<ui-view/>'
      })
      .state('files.list', {
        url: '',
        templateUrl: '/modules/files/client/views/list-files.client.view.html',
        controller: 'FilesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Files List'
        }
      })
      .state('uploadFile', {
        url: '/upload-file-form',
        templateUrl: '/modules/files/client/views/upload-file.client.view.html',
        controller: 'FilesUploadController',
        controllerAs: 'vm'
      });
  }

}());
