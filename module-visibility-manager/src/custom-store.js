import { registerStore, dispatch, select } from '@divi/data';

// Actions following Divi pattern: instant store updates, no side effects
const actions = {
  addItem: (item) => {
    console.log('🔍 STORE ACTION: addItem called with:', item);
    return {
      type: 'ADD_ITEM',
      item,
    };
  },

  removeItem: (itemId) => {
    console.log('🔍 STORE ACTION: removeItem called with:', itemId);
    return {
      type: 'REMOVE_ITEM',
      itemId,
    };
  },
};

// Simple reducer
const reducer = (state = { items: [] }, action) => {
  console.log('🔍 STORE REDUCER: Action received:', action.type, action);
  console.log('🔍 STORE REDUCER: Current state:', state);
  
  switch (action.type) {
    case 'ADD_ITEM':
      const newStateAdd = {
        ...state,
        items: [...state.items, action.item],
      };
      console.log('🔍 STORE REDUCER: New state after ADD_ITEM:', newStateAdd);
      return newStateAdd;
    case 'REMOVE_ITEM':
      const newStateRemove = {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId),
      };
      console.log('🔍 STORE REDUCER: New state after REMOVE_ITEM:', newStateRemove);
      return newStateRemove;
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
    console.log('🔍 EFFECT: ADD_ITEM triggered, saving to app preferences');
    
    // Save to app preferences (proper Divi 5 way)
    if (select('divi/app-preferences')) {
      try {
        dispatch('divi/app-preferences').set(['module', 'hiddenModules'], state.items);
        console.log('🔍 EFFECT: Saved to app preferences:', state.items);
      } catch (e) {
        console.log('🔍 EFFECT: App preferences save error:', e);
      }
    }
    
    // Temporary localStorage fallback
    try {
      localStorage.setItem('divi-module-visibility', JSON.stringify(state.items));
      console.log('🔍 EFFECT: Saved to localStorage fallback:', state.items);
    } catch (e) {
      console.log('🔍 EFFECT: localStorage error:', e);
    }
  },
  
  REMOVE_ITEM: (action, store) => {
    const state = store.getState();
    console.log('🔍 EFFECT: REMOVE_ITEM triggered, saving to app preferences');
    
    // Save to app preferences (proper Divi 5 way)
    if (select('divi/app-preferences')) {
      try {
        dispatch('divi/app-preferences').set(['module', 'hiddenModules'], state.items);
        console.log('🔍 EFFECT: Saved to app preferences:', state.items);
      } catch (e) {
        console.log('🔍 EFFECT: App preferences save error:', e);
      }
    }
    
    // Temporary localStorage fallback
    try {
      localStorage.setItem('divi-module-visibility', JSON.stringify(state.items));
      console.log('🔍 EFFECT: Saved to localStorage fallback:', state.items);
    } catch (e) {
      console.log('🔍 EFFECT: localStorage error:', e);
    }
  },
};

// Server sync moved to action creators

// Initial state following Divi 5 pattern - load from app preferences
const getInitialState = () => {
  console.log('🔍 STORE: Loading initial state...');
  
  // First try to load from app preferences (proper Divi 5 way)
  try {
    if (select('divi/app-preferences')) {
      const hiddenModules = select('divi/app-preferences').get(['module', 'hiddenModules']);
      if (hiddenModules) {
        console.log('🔍 STORE: Loaded from app preferences:', hiddenModules);
        return { items: hiddenModules };
      }
    }
  } catch (e) {
    console.log('🔍 STORE: App preferences not available yet:', e);
  }
  
  // Check backend data (PHP to JS)
  if (typeof window !== 'undefined' && window.ETBuilderBackend) {
    console.log('🔍 STORE: ETBuilderBackend available:', !!window.ETBuilderBackend);
    console.log('🔍 STORE: ETBuilderBackend keys:', Object.keys(window.ETBuilderBackend || {}));
    
    const customData = window.ETBuilderBackend?.moduleVisibilityData;
    if (customData) {
      console.log('🔍 STORE: Found backend data:', customData);
      return { items: customData };
    }
  }
  
  // Fallback to localStorage
  try {
    const stored = localStorage.getItem('divi-module-visibility');
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('🔍 STORE: Loaded from localStorage fallback:', parsed);
      return { items: parsed };
    }
  } catch (e) {
    console.log('🔍 STORE: localStorage error:', e);
  }
  
  console.log('🔍 STORE: No data found, using empty state');
  return { items: [] };
};

// Register the store
export const registerCustomStore = () => {
  console.log('🔍 STORE: Attempting to register custom store...');
  
  // Prevent double registration
  if (window.wp?.data?.select('divi/custom-test')) {
    console.log('🔍 STORE: Already registered, skipping');
    return;
  }
  
  const initialState = getInitialState();
  console.log('🔍 STORE: Initial state:', initialState);
  
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
        console.log('🔍 EFFECT ERROR:', e);
      }
    }
    
    return result;
  };
  
  console.log('🔍 STORE: Custom store registered with effects');
  
  // Test the store immediately
  setTimeout(() => {
    const testStore = window.divi?.data?.select('divi/custom-test');
    console.log('🔍 STORE: Testing store access:', !!testStore);
    if (testStore) {
      console.log('🔍 STORE: Test getItems():', testStore.getItems());
    }
  }, 100);
};
