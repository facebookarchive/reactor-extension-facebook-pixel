'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendPurchaseEvent = require('../sendPurchaseEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Purchase Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendPurchaseEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'Purchase',
      { value: 5, currency: 'USD' }
    ]);
  });

  test('logs message to turbine', function () {
    sendPurchaseEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "Purchase", {"value":5,"currency":"USD"}).'
    ]);
  });
});
