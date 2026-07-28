/**
 * Post keyword settings helpers shared by hooks and unit tests.
 *
 * @since 0.1.0
 */

/**
 * Returns the focus keyword from divi/settings postKeywordSettings.
 *
 * @param {{focusKeyword?: string}|*} settingsData Settings payload.
 * @return {string}
 */
export const getFocusKeywordFromSettings = ( settingsData ) => {
	if ( ! settingsData || 'object' !== typeof settingsData ) {
		return '';
	}

	return settingsData.focusKeyword || '';
};

/**
 * Builds the next keyword settings object for store + REST persistence.
 *
 * @param {{focusKeyword?: string}} current Current settings row.
 * @param {string} focusKeyword Updated focus keyword.
 * @return {{focusKeyword: string}}
 */
export const buildKeywordUpdate = ( current, focusKeyword ) => ( {
	...current,
	focusKeyword,
} );
