'use strict';

var logger = require('logger');

module.exports = function(settings) {
  var fbq = require('../helpers/getFbQueue');

  var options = {
    'search_string': settings.searchString
  };

  fbq('track', 'Search', options);
  logger.log('Queue command: fbq("track", "Search", ' + JSON.stringify(options) + ').');
};
