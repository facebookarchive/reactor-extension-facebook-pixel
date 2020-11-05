'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendSearchEvent = require('../sendSearchEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Search Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendSearchEvent({ searchString: 'search' });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'track',
      'Search',
      // eslint-disable-next-line camelcase
      { search_string: 'search' }
    ]);
  });

  test('logs message to turbine', function () {
    sendSearchEvent({ searchString: 'search' });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "Search", {"search_string":"search"}).'
    ]);
  });
});
