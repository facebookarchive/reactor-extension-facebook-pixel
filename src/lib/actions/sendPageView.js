'use strict';

module.exports = function() {
  var fbq = require('../helpers/getFbQueue');

  fbq('track', 'PageView');
  turbine.logger.log('Queue command: fbq("track", "PageView").');
};
