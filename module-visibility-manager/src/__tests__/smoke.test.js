import { readFileSync } from 'fs';
import { resolve } from 'path';

describe( 'Module Visibility Manager smoke test', () => {
  it( 'registers the modal via divi.modalLibrary.modalMapping', () => {
    const indexPath = resolve( __dirname, '../index.jsx' );
    const indexContents = readFileSync( indexPath, 'utf8' );

    expect( indexContents ).toContain( "addFilter('divi.modalLibrary.modalMapping'" );
    expect( indexContents ).toContain( 'ModuleVisibilityManager' );
    expect( indexContents ).toContain( 'divi/module-visibility-manager' );
  } );
} );
