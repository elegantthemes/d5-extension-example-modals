/**
 * Module Visibility Filter
 * Handles dynamic module filtering based on store data
 */

// Global variable to track current hidden modules
let currentHiddenModules = [];

/**
 * Update the hidden modules cache
 * This function is called by React components to update the filter
 */
export const updateHiddenModulesCache = (hiddenModules) => {
  currentHiddenModules = hiddenModules.map(item => item.name);
};

/**
 * Get current hidden modules from cache
 */
export const getHiddenModules = () => {
  return currentHiddenModules;
};

/**
 * Initialize the module visibility filter
 * This should be called once when the plugin loads
 */
export const initializeModuleFilter = () => {
  if (typeof window !== 'undefined' && window.vendor && window.vendor.wp && window.vendor.wp.hooks) {
    window.vendor.wp.hooks.addFilter(
      'divi.modalLibrary.addModule.moduleList',
      'moduleVisibilityManager',
      (moduleFolderList, moduleParams) => {
        // Create filtered list based on current store data
        const filteredList = { ...moduleFolderList };
        
        // Get current hidden modules directly from the store (Divi 5 pattern)
        let hiddenModules = [];
        try {
          if (window.divi?.data?.select) {
            const customStore = window.divi.data.select('divi/custom-test');
            if (customStore?.getItems) {
              hiddenModules = customStore.getItems() || [];
            }
          }
        } catch (e) {
          // Silent fallback to empty array
        }
        
        // Remove hidden modules from picker list
        hiddenModules.forEach(hiddenItem => {
          if (hiddenItem.name && filteredList[hiddenItem.name]) {
            delete filteredList[hiddenItem.name];
            console.log('🚫 UI FILTER: Hidden module from picker:', hiddenItem.name);
          }
        });
        
        if (hiddenModules.length > 0) {
          console.log('✅ UI FILTER: Applied module visibility to picker, hidden:', hiddenModules.length, 'modules');
        }
        
        return filteredList;
      },
      10 // Priority
    );
    
    console.log('✅ Module picker visibility filter registered');
    return true;
  }
  
  return false;
};

/**
 * Just log that the filter is ready - no manual refresh needed
 * The divi.modalLibrary.addModule.moduleList filter is called each time the modal opens
 */
export const applyModuleVisibilityChanges = (hiddenModules) => {
  console.log('🔄 Module visibility data updated, filter will apply on next modal open');
};
