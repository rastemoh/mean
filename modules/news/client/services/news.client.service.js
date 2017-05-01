(function () {
  'use strict';

  angular
    .module('news.services')
    .factory('NewsService', NewsService);

  NewsService.$inject = ['$resource', '$log', 'FilesService'];

  function NewsService($resource, $log, File) {
    var News = $resource('/api/news/:id', {
      id: '@_id'
    }, {
      get: {
        method: 'GET',
        transformResponse: function(data) {
          var news = new News();
          angular.merge(news, angular.fromJson(data));
          news.setImage();
          return news;
        }
      },
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function (data) {
          var array = angular.fromJson(data);
          return array.map(function (item) {
            var news = new News();
            angular.merge(news, item);
            news.setImage();
            return news;
          });
        }
      },
      update: {
        method: 'PUT'
      }
    });

    angular.extend(News.prototype, {
      createOrUpdate: function () {
        var news = this;
        return createOrUpdate(news);
      },
      setImage: function () {
        if (this.image) {
          var file = new File();
          angular.merge(file, this.image);
          this.image = file;
        }
      }
    });

    return News;

    function createOrUpdate(news) {
      if (news._id) {
        return news.$update(onSuccess, onError);
      } else {
        return news.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(news) {
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
