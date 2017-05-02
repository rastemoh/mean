(function (app) {
  'use strict';

  app.registerModule('pages', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('pages.custom', ['pages', 'slider.services']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('pages.admin', ['core.admin', 'ngCkeditor']);
  app.registerModule('pages.admin.routes', ['core.admin.routes']);
  app.registerModule('pages.services');
  app.registerModule('pages.routes', ['ui.router', 'core.routes', 'pages.services']);
}(ApplicationConfiguration));
