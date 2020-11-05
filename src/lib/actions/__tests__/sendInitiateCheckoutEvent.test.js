'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendInitiateCheckoutEvent = require('../sendInitiateCheckoutEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Initiate Checkout Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendInitiateCheckoutEvent();
    expect(getFbQueue.mock.calls[0]).toEqual(['track', 'InitiateCheckout']);
  });

  test('logs message to turbine', function () {
    sendInitiateCheckoutEvent();
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "InitiateCheckout").'
    ]);
  });
});
