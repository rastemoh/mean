(function () {
  'use strict';

  angular
    .module('files')
    .controller('FilesUploadController', FilesUploadController);

  FilesUploadController.$inject = ['$scope', 'Upload', '$timeout', 'Authentication', 'FilesService', 'Notification'];

  function FilesUploadController($scope, Upload, $timeout, Authentication, File, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.fileUploaded = false;
    vm.uploadFile = function (file, errFiles) {
      vm.f = file;
      vm.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: '/api/files/upload',
          data: { file: file } // add module: 'news' if needed
        });
        console.log('Uploading ...');
        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            console.log(response.data);
            vm.newFile = new File();
            vm.newFile.dir = response.data.dir;
            vm.newFile.filename = response.data.filename;
            vm.newFile.size = response.data.size;
            vm.fileUploaded = true;
          });
        }, function (response) {// catch
          if (response.status > 0)
            this.errorMsg = response.status + ': ' + response.data;
        }.bind(this), function (evt) {// progress
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total, 10));
        });
      }
    };

    vm.saveFile = function () {
      vm.newFile.createOrUpdate()
        .then(function (file) {
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i>The file saved successfully!' });
        })
        .catch(function (result) {
          Notification.error({ message: result.data.message, title: '<i class="glyphicon glyphicon-remove"></i> File save error!' });
        });
    };

    vm.dismiss = function () {
      vm.fileUploaded = false;
      vm.newFile = {};
      console.log('to remove the file');
    };
  }
}());
