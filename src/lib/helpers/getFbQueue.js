'use strict';

var window = require('@adobe/reactor-window');
var loadScript = require('@adobe/reactor-load-script');
var fbq;

var createFbQueue = function () {
  var fbq = function () {
    fbq.callMethod
      ? fbq.callMethod.apply(fbq, arguments)
      : fbq.queue.push(arguments);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  return fbq;
};

if (!window.fbq) {
  fbq = createFbQueue();

  window.fbq = fbq;
  if (!window._fbq) {
    window._fbq = fbq;
  }
}

loadScript('https://connect.facebook.net/en_US/fbevents.js').then(
  function () {
    turbine.logger.log('Meta Pixel Base Code was successfully loaded.');
  },
  function () {
    turbine.logger.error('Meta Pixel Base Code could not be loaded.');
  }
);

window.fbq(
  'init',
  turbine.getExtensionSettings().pixelId,
  {},
  { agent: 'adobe_launch' }
);

module.exports = window.fbq;
