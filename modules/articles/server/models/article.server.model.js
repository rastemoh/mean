'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
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
  file: {
    type: Schema.ObjectId,
    ref: 'File'
  },
  lang: {
    type: String,
    enum: ['en', 'fa'],
    default: 'fa'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  keywords: [{
    type: String,
    trim: true
  }]
});

mongoose.model('Article', ArticleSchema);
