'use strict';

/**
 * Module dependencies
 */
var Module_namePolicy = require('../policies/module_name.server.policy'),
  Module_name = require('../controllers/module_name.server.controller');

module.exports = function (app) {
  // module_name collection routes
  app.route('/api/module_name').all(Module_namePolicy.isAllowed)
    .get(Module_name.list)
    .post(Module_name.create);

  // Single article routes
  app.route('/api/module_name/:module_nameId').all(Module_namePolicy.isAllowed)
    .get(Module_name.read)
    .put(Module_name.update)
    .delete(Module_name.delete);

  // Finish by binding the article middleware
  app.param('module_nameId', Module_name.module_nameByID);
};
