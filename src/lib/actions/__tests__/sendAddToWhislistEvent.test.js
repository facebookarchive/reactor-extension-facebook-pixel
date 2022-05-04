'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendAddToWishlistEvent = require('../sendAddToWishlistEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Add To Wishlist Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendAddToWishlistEvent({ value: 5, currency: 'USD' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'AddToWishlist',
      { value: 5, currency: 'USD' },
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendAddToWishlistEvent({ value: 5, currency: 'USD' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "AddToWishlist", {"value":5,"currency":"USD"})' +
        ` with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
