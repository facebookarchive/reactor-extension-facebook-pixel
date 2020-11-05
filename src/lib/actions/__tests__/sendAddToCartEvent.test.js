'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendAddToCartEvent = require('../sendAddToCartEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Add To Cart Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendAddToCartEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'AddToCart',
      { value: 5, currency: 'USD' }
    ]);
  });

  test('logs message to turbine', function () {
    sendAddToCartEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "AddToCart", {"value":5,"currency":"USD"}).'
    ]);
  });
});
