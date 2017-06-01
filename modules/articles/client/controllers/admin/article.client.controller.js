(function () {
  'use strict';

  angular
    .module('articles.admin')
    .controller('ArticlesAdminController', ArticlesAdminController);

  ArticlesAdminController.$inject = ['$scope', '$state', '$window', 'articleResolve', 'Authentication', 'Notification', '$uibModal'];

  function ArticlesAdminController($scope, $state, $window, article, Authentication, Notification, $uibModal) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.showModal = showModal;
    vm.editorOptions = {
      toolbar: 'Default'
    };
    if (!vm.article._id) {
      vm.article.lang = 'fa';
    }

    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove(function() {
          $state.go('admin.articles.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> مقاله با موفقیت حذف شد!' });
        });
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // Create a new article, or update the current instance
      vm.article.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.articles.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> مقاله با موفقیت ذخیره شد!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> مشکل در ذخیره مقاله!' });
      }
    }

    function showModal () {
      var modalInstance = $uibModal.open({
        controller: 'FilesUploadModalController',
        templateUrl: '/modules/files/client/views/general-upload-modal.html',
        controllerAs: 'vm',
        resolve: {
          moduleName: function () {
            return 'article';
          }
        }
      });
      modalInstance.result
        .then(function (data) {
          vm.article.file = data.$value;
          console.log(vm.article.file);
          vm.fileId = data.$value._id;
        });
    }
  }
}());
