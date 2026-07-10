import { readFileSync } from 'fs';
import { resolve } from 'path';

describe( 'Post Keyword Manager smoke test', () => {
  it( 'registers the modal via divi.modalLibrary.modalMapping', () => {
    const indexPath = resolve( __dirname, '../index.jsx' );
    const indexContents = readFileSync( indexPath, 'utf8' );

    expect( indexContents ).toContain( "addFilter('divi.modalLibrary.modalMapping'" );
    expect( indexContents ).toContain( 'PostKeywordManager' );
    expect( indexContents ).toContain( 'divi/post-keyword-manager' );
  } );
} );
