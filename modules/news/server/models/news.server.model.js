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
  type: {
    type: String,
    enum: ['خبر', 'یادداشت'],
    default: 'خبر'
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

NewsSchema.query.byType = function(type) {
  if (!type) {
    return this.find();
  }
  return this.find({ type: type });
};

mongoose.model('News', NewsSchema);
