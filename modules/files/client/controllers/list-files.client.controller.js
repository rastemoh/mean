(function () {
  'use strict';

  angular
    .module('pages')
    .controller('FilesListController', FilesListController);

  FilesListController.$inject = ['FilesService', '$window', 'Notification'];

  function FilesListController(FilesService, $window, Notification) {
    var vm = this;
    vm.files = FilesService.query();
    vm.remove = function (file) {
      if ($window.confirm('Are you sure you want to delete this file?')) {
        file.$remove(function() {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> File deleted successfully!' });
          vm.files = FilesService.query();
        });
      }
    };
  }
}());
