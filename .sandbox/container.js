module.exports = {
  extensions: {
    'facebook-pixel': {
      displayName: 'Facebook Pixel',
      settings: {
        pixelId: '1234'
      }
    }
  },
  dataElements: {
    a: {
      settings: {
        path: 'a'
      },
      cleanText: false,
      forceLowerCase: false,
      modulePath: 'sandbox/javascriptVariable.js',
      storageDuration: ''
    }
  },
  rules: [
    {
      id: 'RL1607360789177',
      name: 'R1',
      events: [
        {
          modulePath: 'sandbox/pageTop.js',
          settings: {}
        }
      ],
      actions: [
        {
          modulePath: 'facebook-pixel/src/lib/actions/sendPurchaseEvent.js',
          settings: {
            value: '%a%'
          }
        }
      ]
    }
  ],
  property: {
    name: 'Sandbox property',
    settings: {
      domains: ['adobe.com', 'example.com'],
      linkDelay: 100,
      trackingCookieName: 'sat_track',
      undefinedVarsReturnEmpty: false
    }
  },
  company: {
    orgId: 'ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg'
  },
  buildInfo: {
    turbineVersion: '26.0.2',
    turbineBuildDate: '2020-12-07T17:06:50.245Z',
    buildDate: '2020-12-07T17:06:50.245Z',
    environment: 'development'
  }
};
