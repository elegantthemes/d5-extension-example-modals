import { SHOWCASE_SETTING_KEY, getDefaultShowcaseSettings } from '../constants';

describe( 'Modal Field Showcase smoke test', () => {
  it( 'exposes the settings key used by PHP hydration', () => {
    expect( SHOWCASE_SETTING_KEY ).toBe( 'modalFieldShowcaseSettings' );
  } );

  it( 'provides default settings with expected layout density', () => {
    const defaults = getDefaultShowcaseSettings();

    expect( defaults.layoutDensity ).toBe( 'comfortable' );
    expect( defaults.enablePolish ).toBe( 'off' );
  } );
} );
