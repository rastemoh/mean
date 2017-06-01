'use strict';
var multer = require('multer'),
  path = require('path'),
  config = require(path.resolve('./config/config'));

module.exports.imageFileFilter = function (req, file, callback) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/gif') {
    var err = new Error();
    err.code = 'UNSUPPORTED_MEDIA_TYPE';
    return callback(err, false);
  }
  callback(null, true);
};

module.exports.anyFileFilter = function (req, file, callback) {
  callback(null, true);
};

module.exports.storageFn = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploads.siteFiles.image.dest);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
