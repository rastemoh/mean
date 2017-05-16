(function () {
  'use strict';

  angular
    .module('agWorkshop.services')
    .factory('AgWorkshopService', AgWorkshopService);

  AgWorkshopService.$inject = ['$resource', '$log'];

  function AgWorkshopService($resource, $log) {
    var AgWorkshop = $resource('/api/agWorkshop/:id', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        transformResponse: function (data) {
          var workshop = new AgWorkshop();
          angular.merge(workshop, angular.fromJson(data));
          workshop.setImage();
          return workshop;
        }
      },
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function (data) {
          var array = angular.fromJson(data);
          return array.map(function (item) {
            var workshop = new AgWorkshop();
            angular.merge(workshop, item);
            workshop.setImage();
            return workshop;
          });
        }
      },
      update: {
        method: 'PUT'
      }
    });

    angular.extend(AgWorkshop.prototype, {
      createOrUpdate: function () {
        var agWorkshop = this;
        return createOrUpdate(agWorkshop);
      },
      setImage: function () {
        if (this.image) {
          var file = new File();
          angular.merge(file, this.image);
          this.image = file;
        } else {
          this.image = {
            url: function () {
              return '/modules/agWorkshop/client/img/default-workshop-image.png';
            }
          };
        }
      },
      types: ['تخصصی', 'عمومی']
    });

    return AgWorkshop;

    function createOrUpdate(agWorkshop) {
      if (agWorkshop._id) {
        return agWorkshop.$update(onSuccess, onError);
      } else {
        return agWorkshop.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(agWorkshop) {
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
