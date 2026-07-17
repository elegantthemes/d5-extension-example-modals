import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

jest.mock( '../modal/module-visibility-list', () => ( {
	ModuleVisibilityList: () => (
		<div data-testid="module-visibility-list-stub">Module list stub</div>
	),
} ) );

import { ModuleVisibilityManagerModal } from '../modal/component';

describe( 'ModuleVisibilityManagerModal', () => {
	it( 'renders the modal shell with header and body panel', () => {
		const markup = renderToStaticMarkup(
			<ModuleVisibilityManagerModal bodySiblingHeight={ 0 } />
		);

		expect( markup ).toContain( 'Module Visibility Manager' );
		expect( markup ).toContain( 'data-modal-name="divi/module-visibility-manager"' );
		expect( markup ).toContain( 'data-draggable="true"' );
		expect( markup ).toContain( 'data-resizable="true"' );
		expect( markup ).toContain( 'data-expandable="true"' );
		expect( markup ).toContain( 'data-snappable="true"' );
		expect( markup ).toContain( 'id="module-visibility-manager"' );
		expect( markup ).toMatchSnapshot();
	} );
} );
