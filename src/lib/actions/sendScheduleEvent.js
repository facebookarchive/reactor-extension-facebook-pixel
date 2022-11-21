'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'Schedule', settings, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "Schedule", ${JSON.stringify(
      settings
    )}) with eventId: ${eventId}.`
  );
};
