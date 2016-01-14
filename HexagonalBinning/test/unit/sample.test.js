define( ["jquery", "hexagonalBinning", "senseUtils", "text!../data/layout.data.json", "sinon"],
	function ( $, hexagonalBinning, senseUtils, mockdata, sinon ) {

		describe( 'Paint function', function () {
			var layout;

			beforeAll( function () {
				layout = JSON.parse( mockdata );
			} );

			it( "always passes", function () {
				expect( 1 ).toBe( 1 );
			} );

			it( "Call chain", function () {

				console.log( hexagonalBinning );
				console.log( senseUtils );

				var element = $( "<div></div>" );

				var spy = sinon.spy( senseUtils, "pageExtensionData" );

				console.log( layout );
				hexagonalBinning.paint( element, layout );

				assert( spy.called ).toBe( true );
			} );

		} );

	} );
