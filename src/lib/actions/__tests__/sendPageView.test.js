'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendPageView = require('../sendPageView');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Page View module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendPageView();
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'PageView',
      {},
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendPageView();
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      `Queue command: fbq("track", "PageView") with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
