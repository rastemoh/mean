'use strict';

/**
 * Module dependencies
 */
var AgWorkshopPolicy = require('../policies/agWorkshop.server.policy'),
  AgWorkshop = require('../controllers/agWorkshop.server.controller');

module.exports = function (app) {
  // agWorkshop collection routes
  app.route('/api/agWorkshop').all(AgWorkshopPolicy.isAllowed)
    .get(AgWorkshop.list)
    .post(AgWorkshop.create);

  // Single article routes
  app.route('/api/agWorkshop/:agWorkshopId').all(AgWorkshopPolicy.isAllowed)
    .get(AgWorkshop.read)
    .put(AgWorkshop.update)
    .delete(AgWorkshop.delete);

  // Finish by binding the article middleware
  app.param('agWorkshopId', AgWorkshop.agWorkshopByID);
};
