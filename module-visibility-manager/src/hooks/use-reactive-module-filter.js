import { useSelect } from '@divi/data';
import { addFilter } from '@wordpress/hooks';

import {
	applyModuleListVisibilityFilter,
	getHiddenModulesFromSettings,
	syncHiddenModulesForFilter,
} from '../utils/module-visibility';

/**
 * Custom Hook for Reactive Module Filtering
 *
 * Implements real-time module visibility control for the Divi 5 Visual Builder.
 * Uses useSelect to monitor store changes and applies filtering to the Add Module dialog
 * automatically, following Divi 5 best practices with focused selectors.
 *
 * The hook registers a WordPress filter on module load that dynamically filters
 * the module list based on user preferences stored in the Divi settings store.
 *
 * @since 0.1.0
 *
 * @returns {Array} Array of hidden module objects from the store
 */
addFilter(
	'divi.modalLibrary.addModule.moduleList',
	'moduleVisibilityManager',
	applyModuleListVisibilityFilter,
	10
);

export const useReactiveModuleFilter = () => {
	const settingsData = useSelect( ( select ) =>
		select( 'divi/settings' )?.getSetting( 'moduleVisibilitySettings', [] ), []
	);

	const hiddenModules = getHiddenModulesFromSettings( settingsData );

	syncHiddenModulesForFilter( hiddenModules );

	return hiddenModules;
};
