'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Files Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/files',
      permissions: '*'
    }, {
      resources: '/api/files/upload-image',
      permissions: '*'
    }, {
      resources: '/api/files/upload-file',
      permissions: '*'
    }, {
      resources: '/api/files/:articleId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/files',
      permissions: []
    }, {
      resources: '/api/files/upload-image',
      permissions: []
    }, {
      resources: '/api/files/upload-file',
      permissions: []
    }, {
      resources: '/api/files/:articleId',
      permissions: []
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/files',
      permissions: []
    }, {
      resources: '/api/files/upload',
      permissions: []
    }, {
      resources: '/api/files/:articleId',
      permissions: []
    }]
  }]);
};


/**
 * Check If File Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If a file is being processed and the current user created it then allow any manipulation
  if (req.file && req.user && req.file.user && req.file.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
