(function () {
  'use strict';

  angular
    .module('module_name.services')
    .factory('Module_nameService', Module_nameService);

  Module_nameService.$inject = ['$resource', '$log'];

  function Module_nameService($resource, $log) {
    var Module_name = $resource('/api/module_name/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Module_name.prototype, {
      createOrUpdate: function () {
        var module_name = this;
        return createOrUpdate(module_name);
      }
    });

    return Module_name;

    function createOrUpdate(module_name) {
      if (module_name._id) {
        return module_name.$update(onSuccess, onError);
      } else {
        return module_name.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(module_name) {
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
