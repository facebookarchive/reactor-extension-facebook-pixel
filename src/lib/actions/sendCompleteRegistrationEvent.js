'use strict';

var logger = require('@turbine/logger');

module.exports = function(settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'CompleteRegistration', settings);
  logger
    .log('Queue command: fbq("track", "CompleteRegistration", ' + JSON.stringify(settings) + ').');
};
