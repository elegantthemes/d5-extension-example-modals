import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

jest.mock( '../modal/keyword-form', () => ( {
	KeywordForm: () => <div data-testid="keyword-form-stub">Keyword form stub</div>,
} ) );

import { PostKeywordManagerModal } from '../modal/component';

describe( 'PostKeywordManagerModal', () => {
	it( 'renders the modal shell with header and body panel', () => {
		const markup = renderToStaticMarkup(
			<PostKeywordManagerModal bodySiblingHeight={ 0 } />
		);

		expect( console ).toHaveLogged( '🎨 MODAL: Rendering Post Keyword Manager modal' );

		expect( markup ).toContain( 'Post Keyword Manager' );
		expect( markup ).toContain( 'data-modal-name="divi/post-keyword-manager"' );
		expect( markup ).toContain( 'data-draggable="true"' );
		expect( markup ).toContain( 'data-resizable="true"' );
		expect( markup ).toContain( 'data-expandable="true"' );
		expect( markup ).toContain( 'data-snappable="true"' );
		expect( markup ).toContain( 'id="post-keyword-manager"' );
		expect( markup ).toMatchSnapshot();
	} );
} );
