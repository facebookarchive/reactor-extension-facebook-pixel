'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendCompleteRegistrationEvent = require('../sendCompleteRegistrationEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Complete Registration Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendCompleteRegistrationEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'CompleteRegistration',
      { value: 5, currency: 'USD' },
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendCompleteRegistrationEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "CompleteRegistration", {"value":5,"currency":"USD"})' +
        ` with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
