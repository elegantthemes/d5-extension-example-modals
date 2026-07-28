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

export const Tabs = ( { children } ) => (
	<div data-testid="modal-tabs">{ children }</div>
);

export const Tab = ( { children, active, onClick } ) => (
	<button type="button" data-testid="modal-tab" data-active={ String( active ) } onClick={ onClick }>
		{ children }
	</button>
);

export const SearchBar = ( { placeholder } ) => (
	<input data-testid="modal-search" placeholder={ placeholder } readOnly />
);

export const GroupContainer = ( { children, id, title } ) => (
	<section data-testid="modal-group" id={ id } data-title={ title }>
		{ children }
	</section>
);

export const FieldWrapper = ( { children, label } ) => (
	<div data-testid="field-wrapper" data-label={ label }>{ children }</div>
);

export const DescriptionText = ( { children } ) => (
	<p data-testid="description-text">{ children }</p>
);

export const HelpButton = () => <button type="button" data-testid="help-button">?</button>;

export const Footer = ( { buttons } ) => (
	<footer data-testid="modal-footer">
		{ buttons?.map( ( button ) => (
			<button key={ button.name } type="button" data-testid={ `footer-${ button.name }` }>
				{ button.label }
			</button>
		) ) }
	</footer>
);
