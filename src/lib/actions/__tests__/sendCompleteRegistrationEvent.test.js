'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendCompleteRegistrationEvent = require('../sendCompleteRegistrationEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Complete Registration Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendCompleteRegistrationEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'CompleteRegistration',
      { value: 5, currency: 'USD' }
    ]);
  });

  test('logs message to turbine', function () {
    sendCompleteRegistrationEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "CompleteRegistration", {"value":5,"currency":"USD"}).'
    ]);
  });
});
