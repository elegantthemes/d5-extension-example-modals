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
};

// Simple reducer
const reducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
      };
    default:
      return state;
  }
};

// Simple selectors
const selectors = {
  getItems: (state) => state.items,
  getItemsCount: (state) => state.items.length,
};

// Effects for persistence (following Divi 5 pattern using applyEffects)
const effects = {
  // Persist to app preferences when items change
  ADD_ITEM: (action, store) => {
    const state = store.getState();
    
    // Save to app preferences (proper Divi 5 way)
    if (select('divi/app-preferences')) {
      try {
        dispatch('divi/app-preferences').set(['module', 'hiddenModules'], state.items);
      } catch (e) {
        // Silent error handling
      }
    }
    
    // Temporary localStorage fallback
    try {
      localStorage.setItem('divi-module-visibility', JSON.stringify(state.items));
    } catch (e) {
      // Silent error handling
    }
  },
  
  REMOVE_ITEM: (action, store) => {
    const state = store.getState();
    
    // Save to app preferences (proper Divi 5 way)
    if (select('divi/app-preferences')) {
      try {
        dispatch('divi/app-preferences').set(['module', 'hiddenModules'], state.items);
      } catch (e) {
        // Silent error handling
      }
    }
    
    // Temporary localStorage fallback
    try {
      localStorage.setItem('divi-module-visibility', JSON.stringify(state.items));
    } catch (e) {
      // Silent error handling
    }
  },
};

// Server sync moved to action creators

// Initial state following Divi 5 pattern - load from app preferences
const getInitialState = () => {
  // First try to load from app preferences (proper Divi 5 way)
  try {
    if (select('divi/app-preferences')) {
      const hiddenModules = select('divi/app-preferences').get(['module', 'hiddenModules']);
      if (hiddenModules) {
        return { items: hiddenModules };
      }
    }
  } catch (e) {
    // App preferences not available yet
  }
  
  // Check backend data (PHP to JS)
  if (typeof window !== 'undefined' && window.ETBuilderBackend) {
    const customData = window.ETBuilderBackend?.moduleVisibilityData;
    if (customData) {
      return { items: customData };
    }
  }
  
  // Fallback to localStorage
  try {
    const stored = localStorage.getItem('divi-module-visibility');
    if (stored) {
      const parsed = JSON.parse(stored);
      return { items: parsed };
    }
  } catch (e) {
    // localStorage error
  }
  
  return { items: [] };
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
