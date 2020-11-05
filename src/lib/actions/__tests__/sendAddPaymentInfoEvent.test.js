'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendAddPaymentInfoEvent = require('../sendAddPaymentInfoEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Add Payment Info Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendAddPaymentInfoEvent();
    expect(getFbQueue.mock.calls[0]).toEqual(['track', 'AddPaymentInfo']);
  });

  test('logs message to turbine', function () {
    sendAddPaymentInfoEvent();
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "AddPaymentInfo").'
    ]);
  });
});
