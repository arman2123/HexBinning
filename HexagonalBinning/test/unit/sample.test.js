define( ["jquery", "text!../../HexagonalBinning.css", "sinon", "extension"],
	function ( $, css, sinon, extension ) {

		describe( 'Paint function', function () {

			beforeAll( function () {
				//sinon.stub( qlik, "table", function () {} );
			} );

			afterAll( function () {
				//qlik.table.restore();
			} );

			it( "always passes", function () {
				expect( 1 ).toBe( 1 );
			} );

		} );

	} );
