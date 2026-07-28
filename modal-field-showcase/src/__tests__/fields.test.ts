import { getDefaultShowcaseSettings, SHOWCASE_SETTING_KEY } from '../constants';
import { groupVisible } from '../utils/group-visible';
import { mergeBorderRadiusChange } from '../utils/merge-border-radius';
import { mergeSpacingChange } from '../utils/merge-spacing';

describe( 'showcase field config', () => {
	it( 'exposes the settings key used by PHP hydration', () => {
		expect( SHOWCASE_SETTING_KEY ).toBe( 'modalFieldShowcaseSettings' );
	} );

	it( 'provides default settings with expected field keys', () => {
		const defaults = getDefaultShowcaseSettings();

		expect( defaults ).toMatchObject( {
			labelPrefix: '',
			notes: '',
			enablePolish: 'off',
			layoutDensity: 'comfortable',
			emphasisScale: '50',
			readingMeasure: '45em',
		} );
		expect( defaults.sectionPadding ).toHaveProperty( 'syncHorizontal', 'off' );
		expect( defaults.cornerRadius ).toHaveProperty( 'sync', 'off' );
		expect( defaults.triToggle ).toEqual( { a: false, b: false, c: false } );
	} );
} );

describe( 'mergeSpacingChange', () => {
	const previous = {
		top: '10px',
		right: '10px',
		bottom: '10px',
		left: '10px',
		syncHorizontal: 'off',
		syncVertical: 'off',
	};

	it( 'updates a single side when sync is off', () => {
		expect(
			mergeSpacingChange( previous, {
				value: '20px',
				side: 'top',
				syncHorizontal: 'off',
				syncVertical: 'off',
			} )
		).toMatchObject( { top: '20px', right: '10px' } );
	} );

	it( 'mirrors horizontal sides when sync is on', () => {
		expect(
			mergeSpacingChange( previous, {
				value: '24px',
				side: 'left',
				syncHorizontal: 'on',
				syncVertical: 'off',
			} )
		).toMatchObject( { left: '24px', right: '24px' } );
	} );
} );

describe( 'mergeBorderRadiusChange', () => {
	const previous = {
		topLeft: '4px',
		topRight: '4px',
		bottomLeft: '4px',
		bottomRight: '4px',
		sync: 'off',
	};

	it( 'updates one corner when sync is off', () => {
		expect(
			mergeBorderRadiusChange( previous, {
				inputValue: { value: '8px', side: 'topLeft', sync: 'off' },
			} )
		).toMatchObject( { topLeft: '8px', topRight: '4px' } );
	} );

	it( 'updates all corners when sync is on', () => {
		expect(
			mergeBorderRadiusChange( previous, {
				inputValue: { value: '12px', side: 'topRight', sync: 'on' },
			} )
		).toMatchObject( {
			topLeft: '12px',
			topRight: '12px',
			bottomLeft: '12px',
			bottomRight: '12px',
		} );
	} );
} );

describe( 'groupVisible', () => {
	const baseProps = {
		query: '',
		activeTab: 'content',
		tab: 'content',
		title: 'Labels & copy',
		keywords: [ 'label', 'text', 'notes' ],
	};

	it( 'shows groups on the active tab with no search query', () => {
		expect( groupVisible( baseProps ) ).toBe( true );
	} );

	it( 'hides groups on inactive tabs', () => {
		expect( groupVisible( { ...baseProps, tab: 'appearance' } ) ).toBe( false );
	} );

	it( 'matches group titles and keywords', () => {
		expect( groupVisible( { ...baseProps, query: 'notes' } ) ).toBe( true );
		expect( groupVisible( { ...baseProps, query: 'missing' } ) ).toBe( false );
	} );
} );
