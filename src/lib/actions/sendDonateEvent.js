'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'Donate', settings, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "Donate", ${JSON.stringify(
      settings
    )}) with eventId: ${eventId}.`
  );
};
