define( ["jquery", "hexagonalBinning", "senseUtils", "text!../data/layout2.data.json", "sinon"],
	function ( $, hexagonalBinning, senseUtils, mockdata, sinon ) {

		describe( 'Unit test suite', function () {
			var layout;

			beforeAll( function () {

				// Getting the mock data
				layout = JSON.parse( mockdata );

				// Setup backendApi stub
				var backendApi = new Object();

				backendApi.eachDataRow = function ( callback ) {
					var lastrow = layout.qHyperCube.qcy;
					var rows = 0;
					callback( lastrow, 0 );
				};

				backendApi.getRowCount = function () {
					return layout.qHyperCube.qcy;
				};

				backendApi.getData = function ( requestPage ) {
					// do nothing...
				};

				hexagonalBinning.backendApi = backendApi;

			} );

			afterAll( function () {

			} );

			describe( 'Functional tests', function () {

				it( "Call chain", function () {
					var element = $( "<div></div>" );

					sinon.spy( senseUtils, "pageExtensionData" );
					sinon.spy( hexagonalBinning, "drawHex" );
					sinon.stub( hexagonalBinning, "viz" );

					// calling the paint with mock data
					hexagonalBinning.paint( element, layout );

					// checking the call chain
					sinon.assert.called( senseUtils.pageExtensionData );
					sinon.assert.called( hexagonalBinning.drawHex );
					sinon.assert.called( hexagonalBinning.viz );

					senseUtils.pageExtensionData.restore();
					hexagonalBinning.drawHex.restore();
					hexagonalBinning.viz.restore();
				} );

			} );

		} );

	} );
