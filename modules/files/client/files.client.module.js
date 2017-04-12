(function (app) {
  'use strict';

  app.registerModule('files', ['core', 'ngFileUpload', 'angularUtils.directives.dirPagination']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('files.services');
  app.registerModule('files.routes', ['ui.router', 'core.routes', 'files.services']);
}(ApplicationConfiguration));
