'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * File Schema
 */
var FileSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  filename: {
    type: String,
    default: '',
    trim: true,
    required: 'Filename cannot be blank'
  },
  dir: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['img', 'doc'],
    default: 'img'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  size: {
    type: Number,
    min: [0, 'file size can\'t be less than zero']
  },
  title: String
});

FileSchema.virtual('path')
  .get(function () {
    return this.dir + this.filename;
  });

mongoose.model('File', FileSchema);
