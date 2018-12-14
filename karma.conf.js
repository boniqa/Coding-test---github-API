// Karma configuration
// Generated on Thu Dec 13 2018 12:00:26 GMT+0100 (Środkowoeuropejski czas stand.)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'angular.min.js',
      "angular-ui-router.js",
      "angular-animate.js",
      "ng-table.min.js",
      //files to be tested
      'app/app.js',
      'app/CommitController.js',
      'app/gitController.js',
      'app/ReleaseController.js',
      'app/repoService.js',
      'app/app.components.js',

      //pull in angular mocks

      'node_modules/angular-mocks/angular-mocks.js',
      //helpers
      'spec/helpers/*.js',
      //tests
      'spec/*.spec.js',

      // required html files
      // 'templates/commits.html',
      // 'templates/home.html',
      // 'templates/release.html'

    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'teamcity'],

     // optionally, configure the reporter
     coverageReporter: {
      reporters: [{
        type: 'html',
        dir: 'coverage/',
        subdir: 'report'
      },
      {
        type: 'teamcity',
      }]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

 // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome'],

    browsers: ['ChromeHeadless'],

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          ' --remote-debugging-port=9222',
        ]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}