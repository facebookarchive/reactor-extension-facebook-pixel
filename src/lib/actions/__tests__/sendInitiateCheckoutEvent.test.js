'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendInitiateCheckoutEvent = require('../sendInitiateCheckoutEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Initiate Checkout Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendInitiateCheckoutEvent();
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'InitiateCheckout',
      {},
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendInitiateCheckoutEvent();
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      `Queue command: fbq("track", "InitiateCheckout") with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
