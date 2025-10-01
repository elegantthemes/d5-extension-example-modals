import React from 'react';
import { useSelect } from '@divi/data';
import { addFilter } from '@wordpress/hooks';

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
// Global state to store current hidden modules
let currentHiddenModules = [];

// Register WordPress filter on module load to enable dynamic module filtering
addFilter(
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

export const useReactiveModuleFilter = () => {
  // Retrieve module visibility settings from Divi settings store
  const settingsData = useSelect(select => 
    select('divi/settings')?.getSetting('moduleVisibilitySettings', []), []
  );

  // Filter settings data to get only hidden modules
  const hiddenModules = Array.isArray(settingsData) 
    ? settingsData.filter(item => !item.visible)
    : [];

  // Update global state to provide current hidden modules to the filter
  currentHiddenModules = hiddenModules;

  return hiddenModules;
};
