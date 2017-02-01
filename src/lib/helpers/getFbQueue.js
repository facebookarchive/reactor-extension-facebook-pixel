'use strict';

var window = require('@turbine/window');
var loadScript = require('@turbine/load-script');
var extensionSettings = require('@turbine/get-extension-settings')();
var logger = require('@turbine/logger');
var fbq;

var createFbQueue = function() {
  var fbq = function() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
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
    window._fbq =   fbq;
  }
}

loadScript('https://connect.facebook.net/en_US/fbevents.js').then(function() {
  logger.log('Facebook Pixel Base Code was successfully loaded.');
}, function() {
  logger.error('Facebook Pixel Base Code could not be loaded.');
});

window.fbq('init', extensionSettings.pixelId);

module.exports = fbq;
