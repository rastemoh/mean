(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('ArticlesService', ArticlesService);

  ArticlesService.$inject = ['$resource', '$log', 'FilesService'];

  function ArticlesService($resource, $log, File) {
    var Article = $resource('/api/articles/:articleId', {
      articleId: '@_id'
    }, {
      get: {
        method: 'GET',
        transformResponse: function(data) {
          var article = new Article();
          angular.merge(article, angular.fromJson(data));
          article.setFile();
          return article;
        }
      },
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: true,
        transformResponse: function (data) {
          var array = angular.fromJson(data);
          return array.map(function (item) {
            var article = new Article();
            angular.merge(article, item);
            article.setFile();
            return article;
          });
        }
      }
    });

    angular.extend(Article.prototype, {
      createOrUpdate: function () {
        var article = this;
        return createOrUpdate(article);
      },
      setFile: function () {
        if (this.file) {
          var file = new File();
          angular.merge(file, this.file);
          this.file = file;
        }
      },
      isEnglish: function () {
        if (this.lang) {
          if (this.lang === 'en') {
            return true;
          }
        }
        return false;
      },
      lang: 'fa' // default value for language
    });

    return Article;

    function createOrUpdate(article) {
      if (article._id) {
        return article.$update(onSuccess, onError);
      } else {
        return article.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(article) {
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
