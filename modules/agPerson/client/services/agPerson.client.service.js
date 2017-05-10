(function () {
  'use strict';

  angular
    .module('agPerson.services')
    .factory('AgPersonService', AgPersonService);

  AgPersonService.$inject = ['$resource', '$log', 'FilesService'];

  function AgPersonService($resource, $log, File) {
    var AgPerson = $resource('/api/agPerson/:id', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        transformResponse: function (data) {
          var person = new AgPerson();
          angular.merge(person, angular.fromJson(data));
          person.setImage();
          return person;
        }
      },
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function (data) {
          var array = angular.fromJson(data);
          return array.map(function (item) {
            var person = new AgPerson();
            angular.merge(person, item);
            person.setImage();
            return person;
          });
        }
      },
      update: {
        method: 'PUT'
      }
    });

    angular.extend(AgPerson.prototype, {
      createOrUpdate: function () {
        var person = this;
        return createOrUpdate(person);
      },
      setImage: function () {
        if (this.image) {
          var file = new File();
          angular.merge(file, this.image);
          this.image = file;
        } else {
          this.image = {
            url: function () {
              return '/modules/agPerson/client/img/default-user-image.png';
            }
          };
        }
      },
      servicesList: ['درمان فردی', 'زوج درمانی', 'گروه درمانی', 'خانواده درمانی', 'ارزیابی swap', 'روانپزشک',
        'روانشناس کودک', 'مشاوره ازدواج', 'درمانگر روان‌پویشی', 'ارزیابی'] // it should be the same as an array in server model
    });

    return AgPerson;

    function createOrUpdate(person) {
      if (person._id) {
        return person.$update(onSuccess, onError);
      } else {
        return person.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(agPerson) {
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
