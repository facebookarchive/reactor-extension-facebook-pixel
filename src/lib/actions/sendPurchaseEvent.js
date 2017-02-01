'use strict';

var logger = require('@turbine/logger');

module.exports = function(settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'Purchase', settings);
  logger.log('Queue command: fbq("track", "Purchase", ' + JSON.stringify(settings) + ').');
};
