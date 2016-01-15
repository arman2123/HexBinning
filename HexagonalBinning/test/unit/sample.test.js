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

				it( "Labels are set correctly", function () {
					var element = $( "<div></div>" );
					var layout = JSON.parse( mockdata );

					sinon.stub( hexagonalBinning, "viz",
						function ( self, data, labels, measureMin1, measureMax1, measureMin2, measureMax2, width,
								   height, id, selections, binningMode, areaColor, colorpalette, showLegend, colorAxis,
								   maxRadius, minRadius, fillMesh, titleLayout, useStaticLayout, minXAxis, minYAxis,
								   maxXAxis, maxYAxis, centerHexagons, showNumber ) {

							// expecting binningMode flag to be 0
							expect( labels ).not.toBe( undefined );
							expect( labels.length ).toBe( 2 );
							expect( labels[0] ).toBe( "Defending" );
							expect( labels[1] ).toBe( "Heading" );
						} );

					// calling the paint with mock data
					hexagonalBinning.paint( element, layout );

					// checking whether 'viz' got called
					sinon.assert.called( hexagonalBinning.viz );

					hexagonalBinning.viz.restore();
				} );

				it( "Color binning set correctly.", function () {
					var element = $( "<div></div>" );
					var layout = JSON.parse( mockdata );

					// Setting the binning mode to "Color Binning" (i.e. 0)
					layout.binningMode = 0;

					// Setting the stub for 'viz' which is going to check whether
					// the correct params being passed to the visualization rendering function
					sinon.stub( hexagonalBinning, "viz",
						function ( self, data, labels,
								   measureMin1, measureMax1, measureMin2, measureMax2,
								   width, height, id, selections, binningMode,
								   areaColor, colorpalette, showLegend, colorAxis, maxRadius, minRadius, fillMesh,
								   titleLayout, useStaticLayout, minXAxis, minYAxis, maxXAxis, maxYAxis,
								   centerHexagons, showNumber ) {

							// expecting binningMode flag to be 0
							expect( binningMode ).toBe( 0 );

							// Additional checks specific to "Color binning" can go here...
							expect( 1 ).toBe( 1 ); // dummy test for now...
						} );

					// calling the paint with mock data
					hexagonalBinning.paint( element, layout );

					// checking whether 'viz' got called
					sinon.assert.called( hexagonalBinning.viz );

					hexagonalBinning.viz.restore();
				} );

				it( "Area binning set correctly.", function () {
					var element = $( "<div></div>" );
					var layout = JSON.parse( mockdata );

					// Setting the binning mode to "Area Binning" (i.e. 1)
					layout.binningMode = 1;

					// Setting the stub for 'viz' which is going to check whether
					// the correct params being passed to the visualization rendering function
					sinon.stub( hexagonalBinning, "viz",
						function ( self, data, labels,
								   measureMin1, measureMax1, measureMin2, measureMax2,
								   width, height, id, selections, binningMode,
								   areaColor, colorpalette, showLegend, colorAxis, maxRadius, minRadius, fillMesh,
								   titleLayout, useStaticLayout, minXAxis, minYAxis, maxXAxis, maxYAxis,
								   centerHexagons, showNumber ) {

							// expecting binningMode flag to be 0
							expect( binningMode ).toBe( 1 );

							// Additional checks specific to "Color binning" can go here...
							expect( 1 ).toBe( 1 ); // dummy test for now...
						} );

					// calling the paint with mock data
					hexagonalBinning.paint( element, layout );

					// checking whether 'viz' got called
					sinon.assert.called( hexagonalBinning.viz );

					hexagonalBinning.viz.restore();
				} );

			} );

		} );

	} );
