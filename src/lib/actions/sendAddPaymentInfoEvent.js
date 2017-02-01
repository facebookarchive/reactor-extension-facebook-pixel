'use strict';

var logger = require('@turbine/logger');

module.exports = function() {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'AddPaymentInfo');
  logger.log('Queue command: fbq("track", "AddPaymentInfo").');
};
