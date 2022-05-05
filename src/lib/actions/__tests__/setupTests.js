'use strict';
var mockEventId = '11111';

module.exports = {
  mockEventId: mockEventId,
  setup: function () {
    beforeEach(() => {
      global.turbine = {
        logger: { log: jest.fn() },
        getExtensionSettings: function () {
          return { eventId: mockEventId };
        }
      };
    });
    afterEach(() => {
      jest.clearAllMocks();
      delete global.turbine;
    });
  }
};
