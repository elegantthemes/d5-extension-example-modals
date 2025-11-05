import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@divi/data';
import { FieldWrapper } from '@divi/modal';
import { Text } from '@divi/field-library';
import { usePostKeywordManager } from '../hooks';
import './keyword-form.css';

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
  const {
    postTitle,
    postId,
    postType,
    postStatus,
    postExcerpt,
  } = useSelect(select => {
    const post = select('divi/settings').getSetting(['post']);

    return {
      postTitle:  post?.title ?? '',
      postId:     post?.id ?? '',
      postType:   post?.type ?? '',
      postStatus: post?.status ?? '',
      postExcerpt: post?.excerpt ?? '',
    };
  }, []);

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
    <div className="keyword-form-container" id="keyword-form-container">
      {/* Post Information Section */}
      <div className="keyword-form-post-info">
        <h4 className="keyword-form-post-info-title">
          {__('Post Information', 'et_builder')}
        </h4>
        <div className="keyword-form-post-info-content">
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
      <div className="keyword-form-notes">
        <h4 className="keyword-form-notes-title">
          {__('Notes', 'et_builder')}
        </h4>
        <p className="keyword-form-notes-text">
          {__('Keyword density analysis runs automatically when you save your post. Check the browser console for detailed SEO analysis results.', 'et_builder')}
        </p>
      </div>
    </div>
  );
};

