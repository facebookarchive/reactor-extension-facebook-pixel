'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendLeadEvent = require('../sendLeadEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Lead Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendLeadEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'Lead',
      { value: 5, currency: 'USD' },
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendLeadEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "Lead", {"value":5,"currency":"USD"})' +
        ` with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
