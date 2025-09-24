import { useEffect } from 'react';
import { useSelect } from '@divi/data';

/**
 * Custom Hook for Reactive Module Filtering
 * 
 * This hook uses useSelect to watch store changes and updates the filter reactively.
 * Similar pattern to use-process-dynamic-content-title.ts in Divi core.
 * 
 * The hook automatically registers/unregisters the WordPress filter based on store changes,
 * ensuring that the Insert Module dialog shows only visible modules in real-time.
 * 
 * @since 0.1.0
 * 
 * @returns {Array} Array of hidden module objects from the store
 */
export const useReactiveModuleFilter = () => {
  // Watch the divi/settings store reactively using useSelect
  const hiddenModules = useSelect(select => {
    const settingsData = select('divi/settings')?.getSetting('d5ExtensionExampleModalsData', []);
    // Convert to the format expected by the filter (array of objects with 'name' property)
    return Array.isArray(settingsData) ? settingsData.map(item => ({
      name: item.nodeName,
      visible: item.visible
    })).filter(item => !item.visible) : []; // Only return hidden modules
  }); // No dependency array - always reactive to store changes
  

  // Initialize the filter when component mounts and update when store changes
  useEffect(() => {
    
    if (typeof window !== 'undefined' && window.vendor?.wp?.hooks) {
      
      // Add the reactive filter (removeFilter is handled in cleanup)
      window.vendor.wp.hooks.addFilter(
        'divi.modalLibrary.addModule.moduleList',
        'moduleVisibilityManager',
        (moduleFolderList, moduleParams) => {
          
          // Create filtered list based on current store data
          const filteredList = { ...moduleFolderList };
          
          // Remove hidden modules from picker list
          hiddenModules.forEach(hiddenItem => {
            if (hiddenItem.name && filteredList[hiddenItem.name]) {
              delete filteredList[hiddenItem.name];
            }
          });
          
          return filteredList;
        },
        10 // Priority
      );
      
    } else {
    }

    // Cleanup function to remove filter when component unmounts
    return () => {
      if (window.vendor?.wp?.hooks?.removeFilter) {
        window.vendor.wp.hooks.removeFilter(
          'divi.modalLibrary.addModule.moduleList',
          'moduleVisibilityManager'
        );
      }
    };
  }, [hiddenModules]); // Re-register filter when hiddenModules changes!

  return hiddenModules;
};
