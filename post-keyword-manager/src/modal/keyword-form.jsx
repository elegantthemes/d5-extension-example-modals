import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@divi/data';
import { FieldWrapper } from '@divi/modal';
import { Text } from '@divi/field-library';
import { usePostKeywordManager } from '../hooks';

/**
 * Keyword Form Component.
 *
 * Displays post information, word count from et.builder.content.change hook,
 * and provides input for focus keyword management.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * This component demonstrates several important Divi patterns:
 *
 * 1. useSelect Hook:
 *    - Used to read data from Redux stores
 *    - Returns raw data only (no transformations inside useSelect)
 *    - Automatically re-renders when store data changes
 *    - Empty dependency array [] means "select once and subscribe to changes"
 *
 * 2. useDispatch Hook:
 *    - Used to get action dispatchers from Redux stores
 *    - Provides functions to update store state
 *
 * 3. Data Flow:
 *    - User types keyword → onChange handler → dispatch action → store updates
 *    - Hook fires → store updates → useSelect detects change → component re-renders
 *
 * Performance Note:
 * We follow the critical rule of NOT transforming data inside useSelect.
 * All data transformations happen outside the selector using useMemo.
 * This prevents unnecessary re-renders caused by new object references.
 *
 * @since 0.1.0
 *
 * @returns {React.ReactElement}
 */
export const KeywordForm = () => {
  // Use the custom hook for managing keyword data
  const { focusKeyword, updateFocusKeyword } = usePostKeywordManager();

  // Get post data from Divi settings store
  // Available post data includes: title, excerpt, content, status, type, id, etc.
  const postTitle = useSelect(s => s('divi/settings').getSetting(['post', 'title']), []);
  const postId = useSelect(s => s('divi/settings').getSetting(['post', 'id']), []);
  const postType = useSelect(s => s('divi/settings').getSetting(['post', 'type']), []);
  const postStatus = useSelect(s => s('divi/settings').getSetting(['post', 'status']), []);
  const postExcerpt = useSelect(s => s('divi/settings').getSetting(['post', 'excerpt']), []);

  /**
   * Handle keyword input change.
   *
   * This is called every time the user types in the keyword input field.
   * It uses the custom hook to update both the store and persist to database.
   *
   * Note: The Text component from @divi/field-library passes an object with
   * inputValue property, not a standard DOM event.
   *
   * @param {Object} params The change callback parameters.
   * @param {string} [params.inputValue] The new input value.
   */
  const handleKeywordChange = (params) => {
    const newKeyword = params.inputValue || '';
    updateFocusKeyword(newKeyword);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      {/* Post Information Section */}
      <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '4px', border: '1px solid #e1e8ed' }}>
        <h4 style={{ marginTop: 0, fontSize: '14px', fontWeight: '600', color: '#2b5aa0' }}>
          {__('Post Information', 'et_builder')}
        </h4>
        <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#666' }}>
          <p><strong>{__('Title:', 'et_builder')}</strong> {postTitle || __('No title available', 'et_builder')}</p>
          <p><strong>{__('ID:', 'et_builder')}</strong> {postId || __('N/A', 'et_builder')}</p>
          <p><strong>{__('Type:', 'et_builder')}</strong> {postType || __('N/A', 'et_builder')}</p>
          <p><strong>{__('Status:', 'et_builder')}</strong> {postStatus || __('N/A', 'et_builder')}</p>
          {postExcerpt && (
            <p><strong>{__('Excerpt:', 'et_builder')}</strong> {postExcerpt.substring(0, 100)}...</p>
          )}
        </div>
      </div>

      {/* Focus Keyword Section */}
      <FieldWrapper
        label={__('Focus Keyword', 'et_builder')}
        description={__('This keyword is saved automatically to WordPress database as you type. Analysis runs when you save your post.', 'et_builder')}
        id="post-keyword-focus-keyword"
      >
        <Text
          name="focusKeyword"
          value={focusKeyword}
          onChange={handleKeywordChange}
          placeholder={__('Enter your focus keyword...', 'et_builder')}
        />
      </FieldWrapper>

      {/* Notes Section - Simple display after text fields */}
      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
        <h4 style={{ marginTop: 0, fontSize: '14px', fontWeight: '600', color: '#666' }}>
          {__('Notes', 'et_builder')}
        </h4>
        <p style={{ margin: '8px 0', fontSize: '13px', lineHeight: '1.5', color: '#666' }}>
          {__('Keyword density analysis runs automatically when you save your post. Check the browser console for detailed SEO analysis results.', 'et_builder')}
        </p>
      </div>

      
    </div>
  );
};

