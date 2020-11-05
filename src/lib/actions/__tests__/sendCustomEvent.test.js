'use strict';

jest.mock('../../helpers/getFbQueue.js');

var sendCustomEvent = require('../sendCustomEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Custom Event module', function () {
  beforeEach(function () {
    global.turbine = { logger: { log: jest.fn() } };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('add call to facebook queue', function () {
    sendCustomEvent({
      name: 'custom name',
      parameters: [{ key: 'a', value: 'b' }]
    });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'trackCustom',
      'custom name',
      { a: 'b' }
    ]);
  });

  test('logs message to turbine', function () {
    sendCustomEvent({
      name: 'custom name',
      parameters: [{ key: 'a', value: 'b' }]
    });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("trackCustom", "custom name", {"a":"b"}).'
    ]);
  });
});
