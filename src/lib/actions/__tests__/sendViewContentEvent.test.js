'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendViewContentEvent = require('../sendViewContentEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send View Content Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendViewContentEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'ViewContent',
      { value: 5, currency: 'USD' }
    ]);
  });

  test('logs message to turbine', function () {
    sendViewContentEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "ViewContent", {"value":5,"currency":"USD"}).'
    ]);
  });
});
