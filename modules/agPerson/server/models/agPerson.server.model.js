'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var servicesList = ['درمان فردی', 'زوج درمانی', 'گروه درمانی', 'خانواده درمانی', 'ارزیابی swap', 'روانپزشک',
  'روانشناس کودک', 'مشاوره ازدواج', 'درمانگر روان‌پویشی', 'ارزیابی'];
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
    title: {
      type: String,
      enum: ['جناب آقای', 'سرکار خانم', 'دکتر']
    },
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
  specialty: {
    type: String,
    trim: true,
    default: ''
  },
  resume: {
    type: String,
    trim: true,
    default: ''
  },
  services: [{
    type: String,
    enum: servicesList
  }],
  type: [{
    type: String,
    enum: ['therapist', 'researcher', 'lecturer']
  }]
});
// virtual functions are available client side
AgPersonSchema.virtual('fullName')
  .get(function () {
    return (this.name.title ? this.name.title + ' ' : '') +
      (this.name.first ? this.name.first + ' ' : '') + this.name.last;
  });
AgPersonSchema.virtual('typeFa')
  .get(function () {
    var array = [];
    var lut = {
      therapist: 'درمانگر',
      researcher: 'پژوهشگر',
      lecturer: 'مدرس'
    };
    for (var prop in lut) {
      if (this.type.indexOf(prop) > -1) { // if the value is in type array
        array.push(lut[prop]);
      }
    }
    return array;
  });
AgPersonSchema.set('toJSON', { virtuals: true });// to pass the fullName to client side

mongoose.model('AgPerson', AgPersonSchema);
