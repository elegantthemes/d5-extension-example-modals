import { registerStore, dispatch, select } from '@divi/data';

/**
 * Actions for the Post Keyword Manager store.
 *
 * Actions are pure functions that return action objects. They follow
 * the Divi pattern of instant store updates with no side effects.
 * Side effects are handled separately via the effects pattern.
 */
const actions = {
  /**
   * Set the focus keyword.
   *
   * @param {string} keyword The focus keyword to set.
   * @returns {Object} Action object.
   */
  setFocusKeyword: (keyword) => ({
    type: 'SET_FOCUS_KEYWORD',
    keyword,
  }),

  /**
   * Update the rendered content from et.builder.content.change hook.
   *
   * @param {string} content The rendered HTML content.
   * @returns {Object} Action object.
   */
  updateRenderedContent: (content) => ({
    type: 'UPDATE_RENDERED_CONTENT',
    content,
  }),

  /**
   * Update the word count calculated from rendered content.
   *
   * @param {number} count The word count.
   * @returns {Object} Action object.
   */
  updateWordCount: (count) => ({
    type: 'UPDATE_WORD_COUNT',
    count,
  }),
};

/**
 * Reducer for the Post Keyword Manager store.
 *
 * Handles state updates immutably. Each case returns a new state object
 * rather than mutating the existing state.
 *
 * @param {Object} state  Current state.
 * @param {Object} action Action object.
 * @returns {Object} New state.
 */
const reducer = (state = { focusKeyword: '', renderedContent: '', wordCount: 0 }, action) => {
  switch (action.type) {
    case 'SET_FOCUS_KEYWORD':
      return {
        ...state,
        focusKeyword: action.keyword,
      };

    case 'UPDATE_RENDERED_CONTENT':
      return {
        ...state,
        renderedContent: action.content,
      };

    case 'UPDATE_WORD_COUNT':
      return {
        ...state,
        wordCount: action.count,
      };

    default:
      return state;
  }
};

/**
 * Selectors for the Post Keyword Manager store.
 *
 * Selectors are pure functions that extract data from the store state.
 * They should not perform transformations - keep them simple and fast.
 */
const selectors = {
  /**
   * Get the focus keyword.
   *
   * @param {Object} state Store state.
   * @returns {string} Focus keyword.
   */
  getFocusKeyword: (state) => state.focusKeyword,

  /**
   * Get the rendered content.
   *
   * @param {Object} state Store state.
   * @returns {string} Rendered content.
   */
  getRenderedContent: (state) => state.renderedContent,

  /**
   * Get the word count.
   *
   * @param {Object} state Store state.
   * @returns {number} Word count.
   */
  getWordCount: (state) => state.wordCount,
};

/**
 * Effects for persistence.
 *
 * Effects run after actions are processed and handle side effects like
 * saving to localStorage or app preferences. This pattern keeps actions
 * pure while still allowing for persistence.
 */
const effects = {
  /**
   * Persist focus keyword when it changes.
   *
   * @param {Object} action Action object.
   * @param {Object} store  Store instance.
   */
  SET_FOCUS_KEYWORD: (action, store) => {
    const state = store.getState();
    
    // Save to app preferences (proper Divi 5 way).
    if (select('divi/app-preferences')) {
      try {
        dispatch('divi/app-preferences').set(['postKeyword', 'focusKeyword'], state.focusKeyword);
      } catch (e) {
        // Silently fail - app preferences may not be available yet.
      }
    }
    
    // Fallback to localStorage for persistence across sessions.
    try {
      localStorage.setItem('divi-post-keyword', JSON.stringify(state.focusKeyword));
    } catch (e) {
      // Silently fail - localStorage may not be available.
    }
  },
};

/**
 * Get initial state from storage.
 *
 * Attempts to load the focus keyword from app preferences first,
 * then falls back to localStorage if app preferences aren't available.
 *
 * @returns {Object} Initial state object.
 */
const getInitialState = () => {
  // Try to load from app preferences first (proper Divi 5 way).
  try {
    if (select('divi/app-preferences')) {
      const keyword = select('divi/app-preferences').get(['postKeyword', 'focusKeyword']);
      if (keyword) {
        return { focusKeyword: keyword, renderedContent: '', wordCount: 0 };
      }
    }
  } catch (e) {
    // App preferences not available yet - continue to fallback.
  }
  
  // Fallback to localStorage.
  try {
    const stored = localStorage.getItem('divi-post-keyword');
    if (stored) {
      const keyword = JSON.parse(stored);
      return { focusKeyword: keyword, renderedContent: '', wordCount: 0 };
    }
  } catch (e) {
    // localStorage error - use default state.
  }
  
  return { focusKeyword: '', renderedContent: '', wordCount: 0 };
};

/**
 * Register the Post Keyword Manager custom store.
 *
 * This function registers the store with the Divi data system and applies
 * the effects pattern for persistence. It should be called after the
 * module library is ready to ensure all dependencies are available.
 *
 * @since 0.1.0
 */
export const registerCustomStore = () => {
  // Prevent double registration.
  if (window.wp?.data?.select('divi/post-keyword')) {
    return;
  }
  
  const initialState = getInitialState();
  
  const store = registerStore('divi/post-keyword', {
    actions,
    reducer,
    selectors,
    initialState,
  });
  
  // Apply effects pattern (plugin-compatible).
  // This wraps the dispatch function to run effects after actions.
  const originalDispatch = store.dispatch;
  store.dispatch = (action) => {
    const result = originalDispatch(action);
    
    // Run effects after action is processed.
    if (effects[action.type]) {
      try {
        effects[action.type](action, store);
      } catch (e) {
        // Silently handle effect errors.
      }
    }
    
    return result;
  };
};

