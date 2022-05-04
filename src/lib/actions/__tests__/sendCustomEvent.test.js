'use strict';

jest.mock('../../helpers/getFbQueue.js');

var setupTests = require('./setupTests');
var sendCustomEvent = require('../sendCustomEvent');
var getFbQueue = require('../../helpers/getFbQueue.js');

describe('Send Custom Event module', function () {
  setupTests.setup();

  test('add call to facebook queue', function () {
    sendCustomEvent({
      name: 'custom name',
      parameters: [{ key: 'a', value: 'b' }]
    });
    expect(getFbQueue.mock.calls[0]).toEqual([
      'trackCustom',
      'custom name',
      { a: 'b' },
      { eventID: setupTests.mockEventId }
    ]);
  });

  test('logs message to turbine', function () {
    sendCustomEvent({
      name: 'custom name',
      parameters: [{ key: 'a', value: 'b' }]
    });
    expect(turbine.logger.log.mock.calls[0]).toEqual([
      'Queue command: fbq("trackCustom", "custom name", {"a":"b"})' +
        ` with eventId: ${setupTests.mockEventId}.`
    ]);
  });
});
