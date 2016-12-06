'use strict';

var window = require('window');
var loadScript = require('load-script');
var configuration = require('get-extension-configurations')()[0];
var logger = require('logger');
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

window.fbq('init', configuration.pixelId);

module.exports = fbq;
