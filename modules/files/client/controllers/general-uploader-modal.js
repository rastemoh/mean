(function () {
  'use strict';

  angular.module('files')
    .controller('FilesUploadModalController', fileUploaderModalController);

  fileUploaderModalController.$inject = ['Upload', '$timeout', 'FilesService', 'Notification', '$scope', 'moduleName'];
  function fileUploaderModalController(Upload, $timeout, File, Notification, $scope, moduleName) {
    var vm = this;
    vm.uploadFile = function (file, errFiles) {
      vm.f = file;
      vm.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: '/api/files/upload-file',
          data: {
            file: file,
            module: moduleName
          }
        });
        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            vm.newFile = new File();
            vm.newFile.dir = response.data.dir;
            vm.newFile.filename = response.data.filename;
            vm.newFile.size = response.data.size;
            vm.newFile.type = 'doc';
            vm.fileUploaded = true;
          });
        }, function (response) {// catch
          if (response.status > 0)
            vm.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {// progress
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
        });
      }
    };

    vm.saveFile = function () {
      vm.newFile.createOrUpdate()
        .then(function (file) {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>The file saved successfully!' });
          $scope.$close({ $value: file });
        })
        .catch(function (result) {
          Notification.error({
            message: result.data.message,
            title: '<i class="glyphicon glyphicon-remove"></i> File save error!'
          });
        });
    };
  }
}());
