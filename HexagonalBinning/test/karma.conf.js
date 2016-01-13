module.exports = function ( config ) {
	config.set( {

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '../',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine', 'requirejs'],

		// list of files / patterns to load in the browser
		files: [

			// included libraries
			{pattern: 'node_modules/jquery/dist/jquery.js', included: false},
			{pattern: 'node_modules/requirejs-text/text.js', included: false},
			{pattern: 'node_modules/sinon/pkg/sinon.js', included: false},

			// test items
			{pattern: 'test/**/*.test.js', included: false},
			{pattern: 'test/**/*.stub.js', included: false},
			{pattern: 'test/data/testdata.json', included: false},

			// code under test
			{pattern: 'HexagonalBinning.css', included: false},
			{pattern: 'HexagonalBinning.js', included: false},

			// external libraries
			{pattern: 'hexbin.js', included: false},
			{pattern: 'lasso_adj.js', included: false},
			{pattern: 'd3.min.js', included: false},
			{pattern: 'd3-legends.js', included: false},

			// qlik libraries
			{pattern: 'senseUtils.js', included: false},

			// requirejs configuration
			{pattern: 'test/require-config.js', included: true}
		],

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],

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
		browsers: ['Chrome'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		// Concurrency level
		// how many browser should be started simultanous
		concurrency: Infinity
	} )
};
