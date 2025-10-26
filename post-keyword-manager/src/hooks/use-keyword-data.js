import { useSelect } from '@divi/data';

/**
 * Custom hook for accessing keyword data.
 *
 * Demonstrates how to create reusable hooks for accessing
 * custom store data in a consistent way across components.
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
 * const { focusKeyword, wordCount, renderedContent } = useKeywordData();
 * ```
 *
 * @since 0.1.0
 *
 * @returns {Object} Keyword data object with focusKeyword, wordCount, and renderedContent.
 */
export const useKeywordData = () => {
  return useSelect(s => {
    const store = s('divi/post-keyword');
    
    // Return all keyword-related data in a single object.
    // This makes it easy to destructure only the data you need.
    return {
      focusKeyword:    store.getFocusKeyword(),
      wordCount:       store.getWordCount(),
      renderedContent: store.getRenderedContent(),
    };
  }, []);
};

