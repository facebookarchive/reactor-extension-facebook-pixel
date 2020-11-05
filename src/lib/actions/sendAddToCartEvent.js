'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'AddToCart', settings);
  turbine.logger.log(
    'Queue command: fbq("track", "AddToCart", ' +
      JSON.stringify(settings) +
      ').'
  );
};
