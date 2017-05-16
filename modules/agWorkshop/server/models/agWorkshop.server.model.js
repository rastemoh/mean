'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AgWorkshopSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true,
    required: 'عنوان نمی تواند خالی باشد'
  },
  summary: {
    type: String,
    trim: true,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  teachers: [{
    type: Schema.ObjectId,
    ret: 'AgPerson'
  }],
  image: {
    type: Schema.ObjectId,
    ref: 'File'
  },
  type: {
    type: String,
    enum: ['تخصصی', 'عمومی']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('AgWorkshop', AgWorkshopSchema);
