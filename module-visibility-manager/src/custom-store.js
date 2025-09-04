import { registerStore, dispatch } from '@divi/data';
import { loggedFetch } from '@divi/rest';

// Actions with server sync (following Divi pattern)
const actions = {
  addItem: (item) => {
    // Dispatch the action first to update the store
    const action = {
      type: 'ADD_ITEM',
      item,
    };
    
    // Use real Divi sync-to-server endpoint with proper payload format
    setTimeout(() => {
      try {
        // Save to localStorage as backup
        const currentItems = JSON.parse(localStorage.getItem('divi-custom-items') || '[]');
        const newItems = [...currentItems, item];
        localStorage.setItem('divi-custom-items', JSON.stringify(newItems));
        
        // Use real Divi endpoint with minimal required payload
        loggedFetch({
          method: 'POST',
          restRoute: '/divi/v1/sync-to-server',
          data: {
            // Required fields (minimal)
            post_id: window.ETBuilderBackend?.post_id || 0,
            syncType: 'draft',
            // Add our custom data to preferences
            preferences: {
              ...window.divi?.data?.select('divi/app-preferences')?.getAll() || {},
              customModuleData: newItems,
            },
            content: {
              post_content: '',
            },
          },
        }, true);
        
        console.log('✅ Synced to real Divi endpoint:', item);
      } catch (e) {
        console.log('❌ Save error:', e);
      }
    }, 0);
    
    return action;
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
    default:
      return state;
  }
};

// Simple selectors
const selectors = {
  getItems: (state) => state.items,
  getItemsCount: (state) => state.items.length,
};

// Server sync moved to action creators

// Initial state loaded from localStorage (fallback until server ready)
const getInitialState = () => {
  try {
    // Load from localStorage
    const savedItems = JSON.parse(localStorage.getItem('divi-custom-items') || '[]');
    if (savedItems.length > 0) {
      console.log('📂 Loaded from localStorage:', savedItems.length, 'items');
      return { items: savedItems };
    }
  } catch (e) {
    console.log('⚠️ Error loading from localStorage:', e);
  }
  
  // Default state if no saved data
  return {
    items: [{ id: 1, name: 'Initial Item', created: new Date().toLocaleTimeString() }],
  };
};

// Register the store
export const registerCustomStore = () => {
  // Prevent double registration
  if (window.wp?.data?.select('divi/custom-test')) {
    console.log('⚠️ Store already registered');
    return;
  }
  
  registerStore('divi/custom-test', {
    actions,
    reducer,
    selectors,
    initialState: getInitialState(),
  });
  
  console.log('✅ Custom store registered with server sync: divi/custom-test');
};
