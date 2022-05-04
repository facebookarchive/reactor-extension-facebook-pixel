'use strict';

module.exports = function () {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'InitiateCheckout', {}, { eventID: eventId });
  turbine.logger.log(
    `Queue command: fbq("track", "InitiateCheckout") with eventId: ${eventId}.`
  );
};
