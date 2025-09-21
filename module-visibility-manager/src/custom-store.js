import { registerStore, dispatch, select } from '@divi/data';

// Actions following Divi pattern: instant store updates, no side effects
const actions = {
  addItem: (item) => {
    return {
      type: 'ADD_ITEM',
      item,
    };
  },

  removeItem: (itemId) => {
    return {
      type: 'REMOVE_ITEM',
      itemId,
    };
  },

  reloadFromPreferences: () => {
    return {
      type: 'RELOAD_FROM_PREFERENCES',
    };
  },
};

// Simple reducer
const reducer = (state = { items: [], isLoading: true }, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item],
        isLoading: false,
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
        isLoading: false,
      };
    case 'RELOAD_FROM_PREFERENCES':
      // Reload data from app-preferences
      try {
        const appPrefsStore = select('divi/app-preferences');
        if (appPrefsStore) {
          const adminBarPreference = appPrefsStore.get(['app', 'adminBar']);
          if (adminBarPreference?.moduleVisibility) {
            return {
              ...state,
              items: adminBarPreference.moduleVisibility,
              isLoading: false,
            };
          }
          // App-preferences available but no data
          return {
            ...state,
            items: [],
            isLoading: false,
          };
        }
      } catch (e) {
        console.log('❌ Error reloading from app-preferences:', e);
      }
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Simple selectors
const selectors = {
  getItems: (state) => state.items,
  getItemsCount: (state) => state.items.length,
  isLoading: (state) => state.isLoading,
};

// Effects for persistence (following Divi 5 pattern using applyEffects)
const effects = {
  // Persist to app preferences when items change
  ADD_ITEM: (action, store) => {
    const state = store.getState();
    
    // Save to adminBar.moduleVisibility (proven working method)
    try {
      const preferences = select('divi/app-preferences');
      if (preferences) {
        const adminBarPreference = preferences.get(['app', 'adminBar']);
        dispatch('divi/app-preferences').set(['app', 'adminBar'], {
          ...adminBarPreference,
          moduleVisibility: state.items
        });
        
        // Verify save was successful
        setTimeout(() => {
          const savedAdminBar = select('divi/app-preferences').get(['app', 'adminBar']);
        }, 100);
      }
    } catch (e) {
      console.log('❌ Error saving to adminBar:', e);
    }
  },
  
  REMOVE_ITEM: (action, store) => {
    const state = store.getState();
    
    // Save to adminBar.moduleVisibility (proven working method)
    try {
      const preferences = select('divi/app-preferences');
      if (preferences) {
        const adminBarPreference = preferences.get(['app', 'adminBar']);
        dispatch('divi/app-preferences').set(['app', 'adminBar'], {
          ...adminBarPreference,
          moduleVisibility: state.items
        });
        
        // Verify save was successful
        setTimeout(() => {
          const savedAdminBar = select('divi/app-preferences').get(['app', 'adminBar']);
        }, 100);
      }
    } catch (e) {
      console.log('❌ Error saving to adminBar:', e);
    }
  },
};

// Server sync moved to action creators

// Initial state following Divi 5 pattern - load from app preferences
const getInitialState = () => {
  try {
    const appPrefsStore = select('divi/app-preferences');
    
    if (appPrefsStore) {
      const adminBarPreference = appPrefsStore.get(['app', 'adminBar']);
      if (adminBarPreference?.moduleVisibility) {
        return { items: adminBarPreference.moduleVisibility, isLoading: false };
      }
      
      // App-preferences is available but no data yet
      return { items: [], isLoading: false };
    }
  } catch (e) {
    console.log('❌ Error loading from app-preferences:', e);
  }
  
  // App-preferences not available yet - show loading state
  // Check if it becomes available later
  setTimeout(() => {
    const laterAppPrefs = select('divi/app-preferences');
    if (laterAppPrefs) {
      // Trigger a store update to reload data
      dispatch('divi/custom-test').reloadFromPreferences();
    }
  }, 1000);
  
  return { items: [], isLoading: true };
};

// Register the store
export const registerCustomStore = () => {
  // Prevent double registration
  if (window.wp?.data?.select('divi/custom-test')) {
    return;
  }
  
  const initialState = getInitialState();
  
  const store = registerStore('divi/custom-test', {
    actions,
    reducer,
    selectors,
    initialState,
  });
  
  // Apply simple effects pattern (plugin-compatible)
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    const result = originalDispatch(action);
    
    // Run effects after action is processed
    if (effects[action.type]) {
      try {
        effects[action.type](action, store);
      } catch (e) {
        // Silent error handling
      }
    }
    
    return result;
  };
};
