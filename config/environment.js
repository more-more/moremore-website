/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'moremore-website',
    environment: environment,
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src':  "'self'",
      'font-src':    "'self' fonts.gstatic.com",
      'connect-src': "'self' https://api.github.com",
      'img-src':     "'self' *",
      'style-src':   "'self' fonts.googleapis.com",
      'media-src':   "'self'"
    },

    githubOauthUrl: 'http://localhost:9999/authenticate/',

    torii: {
      sessionServiceName: 'session',
      providers: {
        'github-oauth2': {
          scope: 'user, gist',
          apiKey: '8398d19834fa96279abd'
        }
      }
    },

    moment: {
      includeLocales: ['ru']
    }

  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.contentSecurityPolicy['style-src']   += " 'unsafe-inline'";
    ENV.contentSecurityPolicy['script-src']  += " 'unsafe-inline'";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/moremore-website';
  }

  return ENV;
};
