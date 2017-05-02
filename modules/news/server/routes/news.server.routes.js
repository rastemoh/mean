'use strict';

/**
 * Module dependencies
 */
var NewsPolicy = require('../policies/news.server.policy'),
  News = require('../controllers/news.server.controller');

module.exports = function (app) {
  // news collection routes
  app.route('/api/news').all(NewsPolicy.isAllowed)
    .get(News.list)
    .post(News.create);

  // Single article routes
  app.route('/api/news/:newsId').all(NewsPolicy.isAllowed)
    .get(News.read)
    .put(News.update)
    .delete(News.delete);

  // Finish by binding the article middleware
  app.param('newsId', News.newsByID);
};
