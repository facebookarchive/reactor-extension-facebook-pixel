'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'FindLocation', settings, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "FindLocation", ${JSON.stringify(
      settings
    )}) with eventId: ${eventId}.`
  );
};
