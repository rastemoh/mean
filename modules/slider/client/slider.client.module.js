(function (app) {
  'use strict';

  app.registerModule('slider', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('slider.admin', ['core.admin', 'files']);
  app.registerModule('slider.admin.routes', ['core.admin.routes']);
  app.registerModule('slider.services', ['files.services']);
}(ApplicationConfiguration));
