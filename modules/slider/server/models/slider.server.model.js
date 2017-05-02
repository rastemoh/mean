'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Slider Schema
 */
var SliderSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  image: {
    type: Schema.ObjectId,
    ref: 'File'
  },
  link: {
    type: String,
    trim: true,
    default: ''
  }
});

mongoose.model('Slider', SliderSchema);
