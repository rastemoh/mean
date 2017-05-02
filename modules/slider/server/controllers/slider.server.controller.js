'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Slider = mongoose.model('Slider'),
  File = mongoose.model('File'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an item
 */
exports.create = function (req, res) {
  var item = new Slider(req.body);
  item.user = req.user;
  if (req.body.fileId) {
    File.findById(req.body.fileId, function (err, file) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        item.image = file;
        saveItem();
      }
    });
  } else {
    saveItem();
  }

  function saveItem() {
    item.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(item);
      }
    });
  }
};

/**
 * Show the current item
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var item = req.item ? req.item.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  item.isCurrentUserOwner = !!(req.user && item.user && item.user._id.toString() === req.user._id.toString());

  res.json(item);
};

/**
 * Update an item
 */
exports.update = function (req, res) {
  var item = req.item;

  item.title = req.body.title;
  item.link = req.body.link;
  // extend with other features
  if (req.body.fileId) {
    File.findById(req.body.fileId, function (err, file) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        item.image = file;
        saveItem();
      }
    });
  } else {
    saveItem();
  }
  // extend with other features
  function saveItem() {
    item.save(function (err) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(item);
      }
    });
  }
};

/**
 * Delete an item
 */
exports.delete = function (req, res) {
  var item = req.item;

  item.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(item);
    }
  });
};

/**
 * List of slider
 */
exports.list = function (req, res) {
  Slider.find().sort('-created').populate('user', 'displayName').populate('image').exec(function (err, slider) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(slider);
    }
  });
};

/**
 * Slider middleware
 */
exports.sliderByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Object is invalid'
    });
  }

  Slider.findById(id).populate('user', 'displayName').populate('image').exec(function (err, item) {
    if (err) {
      return next(err);
    } else if (!item) {
      return res.status(404).send({
        message: 'No slider with that identifier has been found'
      });
    }
    req.item = item;
    next();
  });
};
