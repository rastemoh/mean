(function (app) {
  'use strict';

  app.registerModule('agPerson', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('agPerson.admin', ['core.admin', 'files']);
  app.registerModule('agPerson.admin.routes', ['core.admin.routes']);
  app.registerModule('agPerson.services', ['files.services']);
  app.registerModule('agPerson.routes', ['ui.router', 'core.routes', 'agPerson.services']);
}(ApplicationConfiguration));
