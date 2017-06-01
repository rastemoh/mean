(function () {
  'use strict';

  angular
    .module('files.services')
    .factory('FilesService', FilesService);

  FilesService.$inject = ['$resource', '$log', '$location'];

  function FilesService($resource, $log, $location) {
    var File = $resource('/api/files/:fileId', {
      fileId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(File.prototype, {
      createOrUpdate: function () {
        var file = this;
        return createOrUpdate(file);
      }
    });

    angular.extend(File.prototype, {
      url: function () {
        var port = parseInt($location.port(), 10) === 80 ? '' : ':' + $location.port();
        var baseUrl = $location.protocol() + '://' + $location.host() + port;
        var dir = this.dir;
        if (dir.startsWith('.')) {
          dir = dir.substring(1);
        } else if (!dir.startsWith('/')) {
          dir = '/' + dir;
        }
        return baseUrl + dir + this.filename;
      },
      isImage: function () {
        if (this.type) {
          if (this.type === 'doc') {
            return false;
          }
        }
        return true;
      }
    });

    return File;

    function createOrUpdate(file) {
      if (file._id) {
        return file.$update(onSuccess, onError);
      } else {
        return file.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(file) {
        return file;
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
