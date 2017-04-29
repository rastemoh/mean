(function () {
  'use strict';

  angular
    .module('news.services')
    .factory('NewsService', NewsService);

  NewsService.$inject = ['$resource', '$log'];

  function NewsService($resource, $log) {
    var News = $resource('/api/news/:id', {
      id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(News.prototype, {
      createOrUpdate: function () {
        var news = this;
        return createOrUpdate(news);
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
