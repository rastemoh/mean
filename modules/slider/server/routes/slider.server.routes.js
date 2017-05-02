'use strict';

/**
 * Module dependencies
 */
var SliderPolicy = require('../policies/slider.server.policy'),
  Slider = require('../controllers/slider.server.controller');

module.exports = function (app) {
  // slider collection routes
  app.route('/api/slider').all(SliderPolicy.isAllowed)
    .get(Slider.list)
    .post(Slider.create);

  // Single article routes
  app.route('/api/slider/:sliderId').all(SliderPolicy.isAllowed)
    .get(Slider.read)
    .put(Slider.update)
    .delete(Slider.delete);

  // Finish by binding the article middleware
  app.param('sliderId', Slider.sliderByID);
};
