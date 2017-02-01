'use strict';

var logger = require('@turbine/logger');

module.exports = function() {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'InitiateCheckout');
  logger.log('Queue command: fbq("track", "InitiateCheckout").');
};
