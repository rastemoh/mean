'use strict';

/**
 * Module dependencies
 */
var module_namePolicy = require('../policies/module_name.server.policy'),
  module_name = require('../controllers/module_name.server.controller');

module.exports = function (app) {
  // module_name collection routes
  app.route('/api/module_name').all(module_namePolicy.isAllowed)
    .get(module_name.list)
    .post(module_name.create);

  // Single article routes
  app.route('/api/module_name/:articleId').all(module_namePolicy.isAllowed)
    .get(module_name.read)
    .put(module_name.update)
    .delete(module_name.delete);

  // Finish by binding the article middleware
  app.param('articleId', module_name.articleByID);
};
