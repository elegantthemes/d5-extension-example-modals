import React from 'react';

export const WrapperContainer = ( {
	children,
	modalName,
	draggable,
	resizable,
	expandable,
	snappable,
} ) => (
	<div
		data-testid="wrapper-container"
		data-modal-name={ modalName }
		data-draggable={ String( draggable ) }
		data-resizable={ String( resizable ) }
		data-expandable={ String( expandable ) }
		data-snappable={ String( snappable ) }
	>
		{ children }
	</div>
);

export const Header = ( { name } ) => (
	<header data-testid="modal-header">{ name }</header>
);

export const BodyContainer = ( { children } ) => (
	<div data-testid="modal-body">{ children }</div>
);

export const PanelContainer = ( { children, id, opened } ) => (
	<div data-testid="modal-panel" id={ id } data-opened={ String( opened ) }>
		{ children }
	</div>
);
