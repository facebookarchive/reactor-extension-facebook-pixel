/* eslint-disable camelcase */
'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');

  var options = {
    search_string: settings.searchString
  };

  fbq('track', 'Search', options);
  turbine.logger.log(
    'Queue command: fbq("track", "Search", ' + JSON.stringify(options) + ').'
  );
};
