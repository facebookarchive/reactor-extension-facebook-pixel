'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'CompleteRegistration', settings);
  turbine.logger.log(
    'Queue command: fbq("track", "CompleteRegistration", ' +
      JSON.stringify(settings) +
      ').'
  );
};
