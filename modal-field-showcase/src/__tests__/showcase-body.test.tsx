import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

jest.mock( '../hooks', () => ( {
	useShowcaseSettings: () => ( {
		draft: {
			labelPrefix: '',
			notes: '',
			enablePolish: 'off',
			accentColor: '',
			layoutDensity: 'comfortable',
			emphasisScale: '50',
			readingMeasure: '45em',
			sectionPadding: {
				top: '',
				right: '',
				bottom: '',
				left: '',
				syncHorizontal: 'off',
				syncVertical: 'off',
			},
			cornerRadius: {
				topLeft: '',
				topRight: '',
				bottomLeft: '',
				bottomRight: '',
				sync: 'off',
			},
			borderAll: {
				style: 'solid',
				color: '#333333',
				width: '1px',
			},
			triToggle: {
				a: false,
				b: false,
				c: false,
			},
		},
		updateDraft: jest.fn(),
		postId: '42',
		saveDraft: jest.fn().mockResolvedValue( { ok: true } ),
		discardDraft: jest.fn(),
	} ),
} ) );

import { ShowcaseBody } from '../modal/showcase-body';

describe( 'ShowcaseBody tab panel fragment', () => {
	it( 'renders tabs, content panel group, and footer actions', () => {
		const markup = renderToStaticMarkup( <ShowcaseBody /> );

		expect( markup ).toContain( 'Content &amp; labels' );
		expect( markup ).toContain( 'Appearance tokens' );
		expect( markup ).toContain( 'field-showcase-group-copy' );
		expect( markup ).toContain( 'Labels &amp; copy' );
		expect( markup ).toContain( 'Save to post' );
		expect( markup ).toContain( 'Discard changes' );
		expect( markup ).toMatchSnapshot();
	} );
} );
