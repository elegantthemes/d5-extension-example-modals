import React from 'react';
import { useSelect } from '@divi/data';

/**
 * Custom Hook for Reactive Module Filtering
 * 
 * This hook uses useSelect to watch store changes and updates the filter reactively.
 * Follows Divi 5 best practices by using focused selectors and processing data outside useSelect.
 * 
 * The hook automatically registers/unregisters the WordPress filter based on store changes,
 * ensuring that the Insert Module dialog shows only visible modules in real-time.
 * 
 * @since 0.1.0
 * 
 * @returns {Array} Array of hidden module objects from the store
 */
// Global state to store current hidden modules
let currentHiddenModules = [];

// Register filter once when module loads - no useEffect needed!
if (typeof window !== 'undefined' && window.vendor?.wp?.hooks) {
  window.vendor.wp.hooks.addFilter(
    'divi.modalLibrary.addModule.moduleList',
    'moduleVisibilityManager',
    (moduleFolderList, moduleParams) => {
      const filteredList = { ...moduleFolderList };
      let hiddenCount = 0;
      
      // Remove hidden modules from picker list
      currentHiddenModules.forEach(hiddenItem => {
        if (hiddenItem.nodeName && filteredList[hiddenItem.nodeName]) {
          delete filteredList[hiddenItem.nodeName];
          hiddenCount++;
        }
      });
      
      if (hiddenCount > 0) {
        console.log(`📊 Module Visibility Manager: ${hiddenCount} modules hidden from Add Module dialog`);
      }
      
      return filteredList;
    },
    10
  );
}

export const useReactiveModuleFilter = () => {
  // Split into focused selector - only get raw data from store
  const settingsData = useSelect(select => 
    select('divi/settings')?.getSetting('d5ExtensionExampleModalsData', []), []
  );

  // Process data outside useSelect - simple filtering without useMemo
  const hiddenModules = Array.isArray(settingsData) 
    ? settingsData.filter(item => !item.visible)
    : [];

  // Update global state whenever hidden modules change
  currentHiddenModules = hiddenModules;

  return hiddenModules;
};
