import React from 'react';

const fieldStub = ( name ) => ( props ) => (
	<input data-testid={ `field-${ name }` } value={ props.value || '' } readOnly />
);

export const Text = fieldStub( 'text' );
export const TextArea = fieldStub( 'textarea' );
export const Toggle = fieldStub( 'toggle' );
export const NumericInput = fieldStub( 'numeric' );
export const RangeContainer = fieldStub( 'range' );
export const SelectContainer = fieldStub( 'select' );
export const ColorPickerContainer = fieldStub( 'color' );
export const Spacing = fieldStub( 'spacing' );
export const BorderRadius = fieldStub( 'border-radius' );
export const BorderStylesPreview = () => <div data-testid="border-styles-preview" />;
