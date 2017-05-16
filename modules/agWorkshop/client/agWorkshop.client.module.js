(function (app) {
  'use strict';

  app.registerModule('agWorkshop', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('agWorkshop.admin', ['core.admin', 'files']);
  app.registerModule('agWorkshop.admin.routes', ['core.admin.routes']);
  app.registerModule('agWorkshop.services', ['files.services']);
  app.registerModule('agWorkshop.routes', ['ui.router', 'core.routes', 'agWorkshop.services']);
}(ApplicationConfiguration));
