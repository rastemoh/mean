(function () {
  'use strict';

  angular
    .module('pages.admin')
    .controller('PagesAdminController', PagesAdminController);

  PagesAdminController.$inject = ['$scope', '$state', '$window', 'pageResolve', 'Authentication', 'Notification'];

  function PagesAdminController($scope, $state, $window, page, Authentication, Notification) {
    var vm = this;

    vm.page = page;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.editorOptions = {
      toolbar: 'Default'
    };

    // Remove existing Page
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.page.$remove(function() {
          $state.go('admin.pages.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Page deleted successfully!' });
        });
      }
    }

    // Save Page
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.pageForm');
        return false;
      }

      // Create a new page, or update the current instance
      vm.page.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.pages.list'); // should we send the User to the list or the updated Page's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Page saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Page save error!' });
      }
    }
  }
}());
