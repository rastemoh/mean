'use strict';

/**
 * Module dependencies
 */
var acl = require('acl'),
  lang = require('i18n');


// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke slider Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/slider',
      permissions: '*'
    }, {
      resources: '/api/slider/:sliderId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/slider',
      permissions: ['get']
    }, {
      resources: '/api/slider/:sliderId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/slider',
      permissions: ['get']
    }, {
      resources: '/api/slider/:sliderId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Slider Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an item is being processed and the current user created it then allow any manipulation
  if (req.item && req.user && req.item.user && req.item.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send(lang.__('Unexpected authorization error'));
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: lang.__('User is not authorized')
        });
      }
    }
  });
};
