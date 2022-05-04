'use strict';

module.exports = function () {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'AddPaymentInfo', {}, { eventID: eventId });
  turbine.logger.log(
    `Queue command: fbq("track", "AddPaymentInfo") with eventId: ${eventId}.`
  );
};
