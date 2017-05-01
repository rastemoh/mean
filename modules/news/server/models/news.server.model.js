'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * News Schema
 */
var NewsSchema = new Schema({
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
  content: {
    type: String,
    default: '',
    trim: true
  },
  summary: {
    type: String,
    default: '',
    trim: true
  },
  image: {
    type: Schema.ObjectId,
    ref: 'File'
  },
  keywords: [{
    type: String,
    trim: true
  }],
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('News', NewsSchema);
