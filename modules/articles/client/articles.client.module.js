(function (app) {
  'use strict';

  app.registerModule('articles', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('articles.admin', ['core.admin', 'files']);
  app.registerModule('articles.admin.routes', ['core.admin.routes']);
  app.registerModule('articles.services', ['files.services']);
  app.registerModule('articles.routes', ['ui.router', 'core.routes', 'articles.services']);
}(ApplicationConfiguration));
