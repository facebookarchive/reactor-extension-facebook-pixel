/* eslint-disable camelcase */
'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;
  var options = {
    search_string: settings.searchString
  };

  fbq('track', 'Search', options, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "Search", ${JSON.stringify(
      options
    )}) with eventId: ${eventId}.`
  );
};
