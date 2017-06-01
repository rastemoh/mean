'use strict';

/**
 * Module dependencies
 */
var filesPolicy = require('../policies/files.server.policy'),
  files = require('../controllers/files.server.controller');

module.exports = function (app) {
  // files collection routes
  app.route('/api/files').all(filesPolicy.isAllowed)
    .get(files.list)
    .post(files.create);

  app.route('/api/files/upload-image').all(filesPolicy.isAllowed)
    .post(files.uploadImage);

  app.route('/api/files/upload-file').all(filesPolicy.isAllowed)
    .post(files.uploadFile);

  // Single article routes
  app.route('/api/files/:fileId').all(filesPolicy.isAllowed)
    .get(files.read)
    .put(files.update)
    .delete(files.delete);

  // Finish by binding the article middleware
  app.param('fileId', files.fileByID);
};
