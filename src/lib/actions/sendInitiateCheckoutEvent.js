'use strict';

module.exports = function () {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'InitiateCheckout');
  turbine.logger.log('Queue command: fbq("track", "InitiateCheckout").');
};
