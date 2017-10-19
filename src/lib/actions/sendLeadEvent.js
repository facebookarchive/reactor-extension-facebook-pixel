'use strict';

module.exports = function(settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'Lead', settings);
  turbine.logger.log('Queue command: fbq("track", "Lead", ' + JSON.stringify(settings) + ').');
};
