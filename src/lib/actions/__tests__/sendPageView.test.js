'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendPageView = require('../sendPageView');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Page View module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendPageView();
    expect(getFbQueue.mock.calls[0]).toEqual(['track', 'PageView']);
  });

  test('logs message to turbine', function () {
    sendPageView();
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("track", "PageView").'
    ]);
  });
});
