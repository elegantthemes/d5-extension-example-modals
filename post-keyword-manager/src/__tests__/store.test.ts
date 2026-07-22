import {
	buildKeywordUpdate,
	getFocusKeywordFromSettings,
} from '../utils/keyword-settings';

describe( 'post keyword settings selector', () => {
	it( 'returns the focus keyword from settings data', () => {
		expect(
			getFocusKeywordFromSettings( { focusKeyword: 'divi tutorial' } )
		).toBe( 'divi tutorial' );
	} );

	it( 'returns an empty string for invalid settings data', () => {
		expect( getFocusKeywordFromSettings( null ) ).toBe( '' );
		expect( getFocusKeywordFromSettings( undefined ) ).toBe( '' );
		expect( getFocusKeywordFromSettings( 'keyword' ) ).toBe( '' );
	} );

	it( 'builds the next keyword settings row for persistence', () => {
		expect(
			buildKeywordUpdate( { focusKeyword: 'old' }, 'new keyword' )
		).toEqual( {
			focusKeyword: 'new keyword',
		} );
	} );
} );
