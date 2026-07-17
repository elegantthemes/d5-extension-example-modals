/**
 * Module visibility helpers shared by the reactive hook and unit tests.
 *
 * @since 0.1.0
 */

let hiddenModulesForFilter = [];

/**
 * Returns hidden module entries from divi/settings moduleVisibilitySettings.
 *
 * @param {Array<{nodeName: string, visible: boolean}>|*} settingsData Settings payload.
 * @return {Array<{nodeName: string, visible: boolean}>}
 */
export const getHiddenModulesFromSettings = ( settingsData ) => {
	if ( ! Array.isArray( settingsData ) ) {
		return [];
	}

	return settingsData.filter( ( item ) => ! item.visible );
};

/**
 * Removes hidden modules from the Add Module folder list.
 *
 * @param {Record<string, *>} moduleFolderList Module folder map.
 * @param {Array<{nodeName: string, visible: boolean}>} hiddenModules Hidden module entries.
 * @return {Record<string, *>}
 */
export const filterModuleFolderList = ( moduleFolderList, hiddenModules ) => {
	const filteredList = { ...moduleFolderList };

	hiddenModules.forEach( ( hiddenItem ) => {
		if ( hiddenItem.nodeName && filteredList[ hiddenItem.nodeName ] ) {
			delete filteredList[ hiddenItem.nodeName ];
		}
	} );

	return filteredList;
};

/**
 * Syncs hidden modules for the WordPress moduleList filter callback.
 *
 * @param {Array<{nodeName: string, visible: boolean}>} hiddenModules Hidden module entries.
 * @return {void}
 */
export const syncHiddenModulesForFilter = ( hiddenModules ) => {
	hiddenModulesForFilter = Array.isArray( hiddenModules ) ? hiddenModules : [];
};

/**
 * Filter callback registered on divi.modalLibrary.addModule.moduleList.
 *
 * @param {Record<string, *>} moduleFolderList Module folder map.
 * @return {Record<string, *>}
 */
export const applyModuleListVisibilityFilter = ( moduleFolderList ) => {
	return filterModuleFolderList( moduleFolderList, hiddenModulesForFilter );
};
