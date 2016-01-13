var TEST_REGEXP = /(spec|test)\.js$/i;
var allTestFiles = [];

Object.keys( window.__karma__.files ).forEach( function ( file ) {
	if ( TEST_REGEXP.test( file ) ) {
		// Normalize paths to RequireJS module names
		var normalizedTestModule = file.replace( /^\/base\/|\.js$/g, '' );
		allTestFiles.push( normalizedTestModule );
	}
} );

require.config( {
	// karma serves all files under the 'base' directory
	baseUrl: '/base',

	// module path mappings
	paths: {
		'jquery': 'node_modules/jquery/dist/jquery',
		'text': 'node_modules/requirejs-text/text',
		'sinon': 'node_modules/sinon/pkg/sinon',
		'extension': 'HexagonalBinning'
	},

	// loading all test files dynamically
	deps: allTestFiles,

	callback: window.__karma__.start
} );
