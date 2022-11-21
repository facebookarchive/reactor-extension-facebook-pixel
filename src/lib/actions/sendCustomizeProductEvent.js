'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'CustomizeProduct', settings, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "CustomizeProduct", ${JSON.stringify(
      settings
    )}) with eventId: ${eventId}.`
  );
};
