(function () {
  'use strict';

  angular
    .module('files')
    .controller('FilesUploadController', FilesUploadController);

  FilesUploadController.$inject = ['$state', 'Upload', '$timeout', 'Authentication', 'FilesService', 'Notification'];

  function FilesUploadController($state, Upload, $timeout, Authentication, File, Notification) {
    var vm = this;
    vm.authentication = Authentication;
    vm.fileUploaded = false;
    vm.urls = {
      file: '/api/files/upload-file',
      image: '/api/files/upload-image'
    };
    vm.uploadFile = function (file, errFiles) {
      vm.f = file;
      vm.errFile = errFiles && errFiles[0];
      if (file) {
        file.upload = Upload.upload({
          url: vm.type === 'doc' ? vm.urls.file : vm.urls.image,
          data: { file: file }
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
            vm.newFile.type = vm.type;
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
        .then(function () {
          Notification.success({ message: '<i class="fa fa-check"></i>فایل با موفقیت ذخیره شد!' });
          $timeout(function() { $state.go('files.list');}, 500);
        })
        .catch(function (result) {
          Notification.error({ message: result.data.message, title: '<i class="fa fa-remove"></i> بروز خطا در ذخیره سازی فایل!' });
        });
    };

    vm.dismiss = function () {
      vm.fileUploaded = false;
      vm.newFile = {};
    };
  }
}());
