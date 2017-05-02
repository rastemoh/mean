'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var AgPersonSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: {
    first: {
      type: String,
      trim: true,
      default: ''
    },
    last: {
      type: String,
      trim: true,
      required: 'ورود نام خانوادگی اجباری است.'
    }
  },
  image: {
    type: Schema.ObjectId,
    ref: 'File'
  },
  resume: {
    type: String,
    trim: true,
    default: ''
  },
  type: [{
    type: String,
    enum: ['therapist', 'researcher', 'lecturer']
  }]
});

AgPersonSchema.virtual('fullName')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  });

AgPersonSchema.set('toJSON', { virtuals: true });//to pass the fullName to client side

mongoose.model('AgPerson', AgPersonSchema);
