'use strict';

module.exports = function () {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;

  fbq('track', 'PageView', {}, { eventID: eventId });
  turbine.logger.log(
    `Queue command: fbq("track", "PageView") with eventId: ${eventId}.`
  );
};
