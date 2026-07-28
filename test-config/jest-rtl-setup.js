const { TextDecoder, TextEncoder } = require( 'util' );

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

require( '@testing-library/jest-dom' );
