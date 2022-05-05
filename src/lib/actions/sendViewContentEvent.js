'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'ViewContent', settings, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("track", "ViewContent", ${JSON.stringify(
      settings
    )}) with eventId: ${eventId}.`
  );
};
