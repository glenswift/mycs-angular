'use strict';

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            'build/js/lib/lib.min.js',
            'components/angular-mocks/angular-mocks.js',
            "packages/**/init.js",
            "packages/**/app.js",
            "packages/**/routes/*.js",
            "packages/**/controllers/*.js",
            "packages/**/services/*.js",
            "packages/**/filters/*.js",
            "packages/**/directives/**/*.js",
            "packages/cache/templateCache.js",
            'test/**/*.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "packages/**/init.js": "coverage",
            "packages/**/app.js": "coverage",
            "packages/**/routes/*.js": "coverage",
            "packages/**/controllers/*.js": "coverage",
            "packages/**/services/*.js": "coverage",
            "packages/**/filters/*.js": "coverage",
            "packages/**/directives/**/*.js": "coverage",
            "packages/cache/templateCache.js": "coverage"
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            type: 'html',
            dir: 'test/coverage/'
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'/*, 'Chrome', 'Firefox'*/],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};