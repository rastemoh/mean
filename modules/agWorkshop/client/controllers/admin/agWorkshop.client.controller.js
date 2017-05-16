(function () {
  'use strict';

  angular
    .module('agWorkshop.admin')
    .controller('AgWorkshopAdminController', AgWorkshopAdminController);

  AgWorkshopAdminController.$inject = ['$scope', '$state', '$window', 'agWorkshopResolve', 'Authentication', 'Notification', '$uibModal'];

  function AgWorkshopAdminController($scope, $state, $window, item, Authentication, Notification, $uibModal) {
    var vm = this;

    vm.item = item;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.showModal = showModal;
    vm.editorOptions = {
      toolbar: 'Default'
    };

    // Remove existing Item
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.item.$remove(function() {
          $state.go('admin.agWorkshop.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item deleted successfully!' });
        });
      }
    }

    // Save Item
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.itemForm');
        return false;
      }

      // Create a new item, or update the current instance
      vm.item.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.agWorkshop.list'); // should we send the User to the list or the updated Item's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Item saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Item save error!' });
      }
    }

    function showModal () {
      var modalInstance = $uibModal.open({
        controller: 'FilesUploadModalController',
        templateUrl: '/modules/files/client/views/upload-modal.client.view.html',
        controllerAs: 'vm',
        resolve: {
          moduleName: function () {
            return '';
          }
        }
      });
      modalInstance.result
        .then(function (data) {
          vm.item.image = data.$value;
          vm.item.fileId = data.$value._id;
        });
    }
  }
}());
