/* eslint-disable camelcase */
'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'Search', settings, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "Search", ${JSON.stringify(
      settings
    )}) with eventId: ${eventId}.`
  );
};
