'use strict';

/**
 * Module dependencies
 */
var pagesPolicy = require('../policies/pages.server.policy'),
  pages = require('../controllers/pages.server.controller');

module.exports = function (app) {
  // pages collection routes
  app.route('/api/pages').all(pagesPolicy.isAllowed)
    .get(pages.list)
    .post(pages.create);

  // Single article routes
  app.route('/api/pages/:pageUrl').all(pagesPolicy.isAllowed)
    .get(pages.read)
    .put(pages.update)
    .delete(pages.delete);

  // Finish by binding the article middleware
  // app.param('pageId', pages.pageByID);
  app.param('pageUrl', pages.pageByUrl);
};
