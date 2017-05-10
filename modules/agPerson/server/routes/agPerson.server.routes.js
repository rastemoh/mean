'use strict';

/**
 * Module dependencies
 */
var AgPersonPolicy = require('../policies/agPerson.server.policy'),
  AgPerson = require('../controllers/agPerson.server.controller');

module.exports = function (app) {
  // agPerson collection routes
  app.route('/api/agPerson').all(AgPersonPolicy.isAllowed)
    .get(AgPerson.list)
    .post(AgPerson.create);

  // Single article routes
  app.route('/api/agPerson/:agPersonId').all(AgPersonPolicy.isAllowed)
    .get(AgPerson.read)
    .put(AgPerson.update)
    .delete(AgPerson.delete);

  // Finish by binding the article middleware
  app.param('agPersonId', AgPerson.agPersonByID);
};
