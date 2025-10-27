import { useSelect, useDispatch } from '@divi/data';
import { debounce } from 'lodash';

/**
 * Custom hook for accessing post keyword data.
 *
 * Demonstrates how to create reusable hooks for accessing
 * Divi settings store data in a consistent way across components.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * Custom hooks are a powerful pattern for:
 * - Encapsulating data access logic
 * - Providing consistent interfaces across components
 * - Making components more testable
 * - Reducing code duplication
 *
 * This hook follows React hooks conventions:
 * - Name starts with "use"
 * - Can call other hooks (useSelect)
 * - Returns data in a consistent format
 *
 * Usage in components:
 * ```javascript
 * const { focusKeyword } = useKeywordData();
 * ```
 *
 * @since 0.1.0
 *
 * @returns {Object} Keyword data object with focusKeyword.
 */
export const useKeywordData = () => {
  const settingsData = useSelect(select =>
    select('divi/settings')?.getSetting('postKeywordSettings', { focusKeyword: '' }), []
  );

  return {
    focusKeyword: settingsData?.focusKeyword || '',
  };
};

/**
 * Custom hook for managing post keyword data with debounced persistence.
 *
 * Implements reactive keyword management for the Divi 5 Visual Builder.
 * Uses useSelect to monitor store changes and persists data to WordPress database
 * automatically, following Divi 5 best practices with debounced saves.
 *
 * The hook provides methods to update keyword data that automatically sync
 * to both the store (for immediate UI updates) and database (debounced for performance).
 *
 * @since 0.1.0
 *
 * @returns {Object} Object containing keyword data and update methods.
 */
export const usePostKeywordManager = () => {
  // Retrieve current post keyword settings from the store
  const keywordData = useSelect(select =>
    select('divi/settings')?.getSetting('postKeywordSettings', { focusKeyword: '' }), []
  );

  // Get settings store dispatcher for saving data
  const { add } = useDispatch('divi/settings');

  // Persist keyword data to WordPress database via REST API
  const saveToDatabase = async (data) => {
    try {
      const response = await fetch('/wp-json/divi/v1/post-keyword-settings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.wpApiSettings?.nonce || ''
        },
        body: JSON.stringify({ data })
      });

      if (!response.ok) {
        console.error('Post Keyword Manager - Save failed:', response.statusText);
      }
    } catch (error) {
      console.error('Post Keyword Manager - Save failed:', error);
    }
  };

  // Create debounced save function using Lodash
  const debouncedSaveToDatabase = debounce(saveToDatabase, 1000);

  // Combined update: store + database persistence
  const updateKeywordData = (newData) => {
    // 1. Update store immediately (for UI reactivity)
    add('postKeywordSettings', newData);

    // 2. Save to database (debounced using Lodash)
    debouncedSaveToDatabase(newData);
  };

  // Function to update focus keyword
  const updateFocusKeyword = (focusKeyword) => {
    const updatedData = {
      ...keywordData,
      focusKeyword
    };
    updateKeywordData(updatedData);
  };

  return {
    focusKeyword: keywordData?.focusKeyword || '',
    updateFocusKeyword,
  };
};

