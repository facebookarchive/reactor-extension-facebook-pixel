'use strict';

module.exports = function(settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'AddToWishlist', settings);
  turbine.logger.log('Queue command: fbq("track", "AddToWishlist", ' + JSON.stringify(settings) + ').');
};
