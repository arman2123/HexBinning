define( ["jquery", "hexagonalBinning", "senseUtils", "text!../data/layout2.data.json", "sinon"],
	function ( $, hexagonalBinning, senseUtils, mockdata, sinon ) {

		describe( 'Functional Test:', function () {
			var layout;

			beforeAll( function () {
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

			describe( 'Before rendering,', function () {
				var element, layout;

				beforeEach( function () {
					element = $( "<div></div>" );
					layout = JSON.parse( mockdata );
				} );

				afterEach( function () {

				} );

				it( "selected objects are loaded correctly.", function () {

					sinon.stub( hexagonalBinning, "viz",
						function ( self, data, labels, measureMin1, measureMax1, measureMin2, measureMax2, width,
								   height, id, selections, binningMode, areaColor, colorpalette, showLegend, colorAxis,
								   maxRadius, minRadius, fillMesh, titleLayout, useStaticLayout, minXAxis, minYAxis,
								   maxXAxis, maxYAxis, centerHexagons, showNumber ) {

							// 12 items are selected in the mock data
							expect( selections.dim1_count ).toBe( 12 );

							expect( data[0].Dim1 ).toBe( "Alexander Büttner" );
							expect( data[0].Dim1_key ).toBe( 175 );
							expect( data[0].Metric1 ).toBe( 70 );
							expect( data[0].Metric2 ).toBe( 70 );

							expect( data[4].Dim1 ).toBe( "Frank Lampard" );
							expect( data[4].Dim1_key ).toBe( 327 );
							expect( data[4].Metric1 ).toBe( 69 );
							expect( data[4].Metric2 ).toBe( 71 );

							expect( data[11].Dim1 ).toBe( "Nathaniel Chalobah" );
							expect( data[11].Dim1_key ).toBe( 242 );
							expect( data[11].Metric1 ).toBe( 69 );
							expect( data[11].Metric2 ).toBe( 68 );
						} );

					// calling the paint with mock data
					hexagonalBinning.paint( element, layout );

					// checking whether 'viz' got called
					sinon.assert.called( hexagonalBinning.viz );

					hexagonalBinning.viz.restore();

				} );

				it( "axis labels are set correctly.", function () {

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

				it( "color binning mode is set correctly.", function () {

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

				it( "area binning mode set correctly.", function () {

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

							// expecting binningMode flag to be 1
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

				it( "static layout set correctly.", function () {

					layout.useStaticLayout = 1;
					layout.minXAxis = 100;
					layout.minYAxis = 125;
					layout.maxXAxis = 350;
					layout.maxYAxis = 375;

					// Setting the stub for 'viz' which is going to check whether
					// the correct params being passed to the visualization rendering function
					sinon.stub( hexagonalBinning, "viz",
						function ( self, data, labels,
								   measureMin1, measureMax1, measureMin2, measureMax2,
								   width, height, id, selections, binningMode,
								   areaColor, colorpalette, showLegend, colorAxis, maxRadius, minRadius, fillMesh,
								   titleLayout, useStaticLayout, minXAxis, minYAxis, maxXAxis, maxYAxis,
								   centerHexagons, showNumber ) {

							expect( useStaticLayout ).toBe( 1 );
							expect( minXAxis ).toBe( 100 );
							expect( minYAxis ).toBe( 125 );
							expect( maxXAxis ).toBe( 350 );
							expect( maxYAxis ).toBe( 375 );

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
