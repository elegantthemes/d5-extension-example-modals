/**
 * Search + tab visibility helper for showcase group containers.
 *
 * @since 0.1.0
 */

/**
 * @param {Object} props Props.
 * @param {string} props.query Search query.
 * @param {string} props.activeTab Active tab id.
 * @param {string} props.tab Tab id for this group.
 * @param {string} props.title Group title.
 * @param {string[]} props.keywords Search keywords.
 * @return {boolean} Whether to show the group.
 */
export const groupVisible = ( props ) => {
	const { query, activeTab, tab, title, keywords } = props;
	const normalizedQuery = ( query || '' ).trim().toLowerCase();

	if ( activeTab !== tab ) {
		return false;
	}

	if ( ! normalizedQuery ) {
		return true;
	}

	if ( title.toLowerCase().includes( normalizedQuery ) ) {
		return true;
	}

	return keywords.some( ( keyword ) => keyword.toLowerCase().includes( normalizedQuery ) );
};
