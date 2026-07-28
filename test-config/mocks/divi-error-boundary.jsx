import React from 'react';

export const ErrorBoundary = ( { children } ) => (
	<div data-testid="error-boundary">{ children }</div>
);
