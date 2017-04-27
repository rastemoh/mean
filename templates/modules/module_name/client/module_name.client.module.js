(function (app) {
  'use strict';

  app.registerModule('module_name', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('module_name.admin', ['core.admin']);
  app.registerModule('module_name.admin.routes', ['core.admin.routes']);
  app.registerModule('module_name.services');
  app.registerModule('module_name.routes', ['ui.router', 'core.routes', 'module_name.services']);
}(ApplicationConfiguration));
