'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendSearchEvent = require('../sendSearchEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Search Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendSearchEvent({ searchString: 'search' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'Search',
      // eslint-disable-next-line camelcase
      { search_string: 'search' },
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendSearchEvent({ searchString: 'search' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "Search", {"search_string":"search"})' +
        ` with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
