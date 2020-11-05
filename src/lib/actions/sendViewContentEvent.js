'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'ViewContent', settings);
  turbine.logger.log(
    'Queue command: fbq("track", "ViewContent", ' +
      JSON.stringify(settings) +
      ').'
  );
};
