'use strict';

module.exports = function () {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'AddPaymentInfo');
  turbine.logger.log('Queue command: fbq("track", "AddPaymentInfo").');
};
