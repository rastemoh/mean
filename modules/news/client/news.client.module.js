(function (app) {
  'use strict';

  app.registerModule('news', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('news.admin', ['core.admin', 'files']);
  app.registerModule('news.admin.routes', ['core.admin.routes']);
  app.registerModule('news.services', ['files.services']);
  app.registerModule('news.routes', ['ui.router', 'core.routes', 'news.services']);
}(ApplicationConfiguration));
