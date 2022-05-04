'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendAddPaymentInfoEvent = require('../sendAddPaymentInfoEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Add Payment Info Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendAddPaymentInfoEvent();
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'AddPaymentInfo',
      {},
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendAddPaymentInfoEvent();
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      `Queue command: fbq("track", "AddPaymentInfo") with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
