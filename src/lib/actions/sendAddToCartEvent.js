'use strict';

var logger = require('logger');

module.exports = function(settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'AddToCart', settings);
  logger.log('Queue command: fbq("track", "AddToCart", ' + JSON.stringify(settings) + ').');
};
