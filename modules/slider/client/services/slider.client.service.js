(function () {
  'use strict';

  angular
    .module('slider.services')
    .factory('SliderService', SliderService);

  SliderService.$inject = ['$resource', '$log', 'FilesService'];

  function SliderService($resource, $log, File) {
    var Slider = $resource('/api/slider/:id', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        transformResponse: function(data) {
          var slider = new Slider();
          angular.merge(slider, angular.fromJson(data));
          slider.setImage();
          return slider;
        }
      },
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function (data) {
          var array = angular.fromJson(data);
          return array.map(function (item) {
            var slider = new Slider();
            angular.merge(slider, item);
            slider.setImage();
            return slider;
          });
        }
      },
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Slider.prototype, {
      createOrUpdate: function () {
        var slider = this;
        return createOrUpdate(slider);
      },
      setImage: function () {
        if (this.image) {
          var file = new File();
          angular.merge(file, this.image);
          this.image = file;
        }
      }
    });

    return Slider;

    function createOrUpdate(slider) {
      if (slider._id) {
        return slider.$update(onSuccess, onError);
      } else {
        return slider.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(slider) {
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
