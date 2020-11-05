'use strict';

jest.mock('@adobe/reactor-window', function () {
  return {};
});

jest.mock('@adobe/reactor-load-script', function () {
  return jest.fn().mockResolvedValue(true);
});

describe('getFbQueue module', function () {
  beforeEach(function () {
    global.turbine = {
      logger: { log: jest.fn() },
      getExtensionSettings: function () {
        return { pixelId: '12345' };
      }
    };
  });

  afterEach(function () {
    jest.clearAllMocks();
    delete global.turbine;
  });

  test('returns the facebook queue', function () {
    var getFbQueue = require('../getFbQueue');
    expect(getFbQueue).toEqual(expect.any(Function));
  });
});
