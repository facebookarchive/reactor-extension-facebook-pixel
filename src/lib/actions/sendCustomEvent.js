'use strict';

module.exports = function (settings) {
  var fbq = require('../helpers/getFbQueue');
  var eventId = turbine.getExtensionSettings().eventId;
  var options = (settings.parameters || []).reduce(function (
    allParameters,
    parameter
  ) {
    allParameters[parameter.key] = parameter.value;

    return allParameters;
  },
  {});

  fbq('trackCustom', settings.name, options, {
    eventID: eventId
  });
  turbine.logger.log(
    `Queue command: fbq("trackCustom", "${settings.name}", ${JSON.stringify(
      options
    )}) with eventId: ${eventId}.`
  );
};
