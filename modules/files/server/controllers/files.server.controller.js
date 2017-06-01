'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  File = mongoose.model('File'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  fs = require('fs'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a file
 */
exports.create = function (req, res) {
  var file = new File(req.body);
  file.user = req.user;
  file.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(file);
    }
  });
};

/**
 * Upload a file
 */
exports.uploadImage = function (req, res) {
  // Filtering to upload only images
  var multerConfig = config.uploads.siteFiles.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  multerConfig.storage = require(path.resolve('./config/lib/multer')).storageFn;
  var upload = multer(multerConfig).single('file');
  var dir = config.uploads.siteFiles.image.dest;
  doUploadImage()
    .then(function () {
      checkImageModule()
        .then(function (dest) {
          if (dest) {
            dir = dest;
          }
          sendResponse();
        })
        .catch(sendResponse);
    })
    .catch(function (err) {
      res.status(422).send(err);
    });

  function sendResponse() {
    res.json({
      'dir': dir,
      'filename': req.file.filename,
      'size': req.file.size,
      'file-info': req.file
    });
  }

  function doUploadImage() {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }

  function checkImageModule() {
    return new Promise(function (resolve, reject) {
      if (req.body.module === 'news' || req.body.module === 'slider') {
        var module = req.body.module;
        fs.rename(config.uploads.siteFiles.image.dest + req.file.filename, config.uploads[module].image.dest + req.file.filename, function (err) {
          if (err) {
            console.log('error renaming file: ' + err);
            reject();
          } else {
            resolve(config.uploads[module].image.dest);
          }
        });
      } else {
        resolve();
      }
    });
  }
};

exports.uploadFile = function (req, res) {
  var multerConfig = config.uploads.siteFiles.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).anyFileFilter;
  multerConfig.storage = require(path.resolve('./config/lib/multer')).storageFn;
  var upload = multer(multerConfig).single('file');
  var dir = config.uploads.siteFiles.image.dest;
  doUploadFile()
    .then(function () {
      sendResponse();
    })
    .catch(function (err) {
      res.status(422).send(err);
    });

  function sendResponse() {
    res.json({
      'dir': dir,
      'filename': req.file.filename,
      'size': req.file.size,
      'file-info': req.file
    });
  }

  function doUploadFile() {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }

};

/**
 * Show the current file
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var file = req.file ? req.file.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the File model.
  file.isCurrentUserOwner = !!(req.user && file.user && file.user._id.toString() === req.user._id.toString());

  res.json(file);
};

/**
 * Update a file
 */
exports.update = function (req, res) {
  var file = req.file;

  file.title = req.body.title;
  file.content = req.body.content;
  file.keywords = req.body.keywords;
  file.url = req.body.url;
  file.type = req.body.type;
  file.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(file);
    }
  });
};

/**
 * Delete a file
 */
exports.delete = function (req, res) {
  var file = req.file;

  file.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      fs.unlink(path.resolve(file.path), function (err) {
        if (err) {
          console.log('error deleting file: ' + err);
        }
      });
      res.json(file);
    }
  });
};

/**
 * List of Files
 */
exports.list = function (req, res) {
  File.find().sort('-created').populate('user').exec(function (err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * File middleware
 */
exports.fileByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'File is invalid'
    });
  }

  File.findById(id).populate('user').exec(function (err, file) {
    if (err) {
      return next(err);
    } else if (!file) {
      return res.status(404).send({
        message: 'No file with that identifier has been found'
      });
    }
    req.file = file;
    next();
  });
};
