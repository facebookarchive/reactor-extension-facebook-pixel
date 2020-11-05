'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'Purchase', settings);
  turbine.logger.log(
    'Queue command: fbq("track", "Purchase", ' + JSON.stringify(settings) + ').'
  );
};
