'use strict';

var logger = require('logger');

module.exports = function() {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'InitiateCheckout');
  logger.log('Queue command: fbq("track", "InitiateCheckout").');
};
