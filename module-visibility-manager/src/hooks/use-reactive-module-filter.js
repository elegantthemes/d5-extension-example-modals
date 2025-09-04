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
  // Watch the custom store reactively using useSelect
  const hiddenModules = useSelect(select => {
    const customStore = select('divi/custom-test');
    const items = customStore?.getItems() || [];
    console.log('🔍 HOOK: useSelect - Store items:', items);
    return items;
  }, []); // No dependencies - always reactive to store changes
  
  console.log('🔍 HOOK: Rendered with hiddenModules:', hiddenModules);

  // Initialize the filter when component mounts and update when store changes
  useEffect(() => {
    console.log('🔍 HOOK: useEffect triggered with hiddenModules:', hiddenModules);
    
    if (typeof window !== 'undefined' && window.vendor && window.vendor.wp && window.vendor.wp.hooks) {
      console.log('🔍 HOOK: WordPress hooks available, registering filter');
      
      // Remove any existing filter first to prevent duplicates
      window.vendor.wp.hooks.removeFilter(
        'divi.modalLibrary.addModule.moduleList',
        'moduleVisibilityManager'
      );

      // Add the reactive filter
      window.vendor.wp.hooks.addFilter(
        'divi.modalLibrary.addModule.moduleList',
        'moduleVisibilityManager',
        (moduleFolderList, moduleParams) => {
          console.log('🔍 FILTER: Called with', Object.keys(moduleFolderList).length, 'modules');
          console.log('🔍 FILTER: Hidden modules:', hiddenModules);
          
          // Create filtered list based on current store data
          const filteredList = { ...moduleFolderList };
          
          // Remove hidden modules from picker list
          hiddenModules.forEach(hiddenItem => {
            if (hiddenItem.name && filteredList[hiddenItem.name]) {
              delete filteredList[hiddenItem.name];
              console.log('🔍 FILTER: Removed module:', hiddenItem.name);
            }
          });
          
          console.log('🔍 FILTER: Returning', Object.keys(filteredList).length, 'modules');
          return filteredList;
        },
        10 // Priority
      );
      
      console.log('🔍 HOOK: Filter registered successfully');
    } else {
      console.log('🔍 HOOK: WordPress hooks not available');
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
