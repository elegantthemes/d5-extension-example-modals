import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect, useDispatch } from '@divi/data';

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
  console.log('📋 FORM: Rendering keyword form');

  // Get data from Redux stores (raw data only, no transformations).
  // Following the critical rule: NEVER transform data inside useSelect.
  const focusKeyword = useSelect(s => s('divi/post-keyword').getFocusKeyword(), []);
  const wordCount    = useSelect(s => s('divi/post-keyword').getWordCount(), []);
  const postTitle    = useSelect(s => s('divi/settings').getSetting(['post', 'title']), []);
  
  console.log('📋 FORM: Current data - keyword:', focusKeyword, 'wordCount:', wordCount, 'title:', postTitle);
  
  // Get dispatch function for updating the store.
  const { setFocusKeyword } = useDispatch('divi/post-keyword');
  
  /**
   * Handle keyword input change.
   *
   * This is called every time the user types in the keyword input field.
   * It dispatches an action to update the store, which will trigger the
   * effects pattern to save to localStorage/app preferences.
   *
   * @param {Event} event The input change event.
   */
  const handleKeywordChange = (event) => {
    const newKeyword = event.target.value;
    console.log('📋 FORM: Keyword changed to:', newKeyword);
    setFocusKeyword(newKeyword);
  };
  
  return (
    <div style={{ padding: '20px' }}>
      {/* Post Information Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginTop: 0, fontSize: '16px', fontWeight: '600' }}>
          {__('Post Information', 'et_builder')}
        </h3>
        <p style={{ margin: '8px 0' }}>
          <strong>{__('Title:', 'et_builder')}</strong>{' '}
          {postTitle || __('Untitled', 'et_builder')}
        </p>
        <p style={{ margin: '8px 0' }}>
          <strong>{__('Word Count:', 'et_builder')}</strong>{' '}
          <span style={{ fontSize: '18px', fontWeight: '600', color: '#2196F3' }}>
            {wordCount}
          </span>
        </p>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0' }}>
          {__('💡 Word count updates when you save (draft, publish, or preview).', 'et_builder')}
        </p>
      </div>
      
      {/* Focus Keyword Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          {__('Focus Keyword', 'et_builder')}
        </h3>
        <input
          type="text"
          value={focusKeyword}
          onChange={handleKeywordChange}
          placeholder={__('Enter your focus keyword...', 'et_builder')}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxSizing: 'border-box',
            fontFamily: 'inherit',
          }}
        />
        <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          {__('💡 This keyword is saved automatically as you type.', 'et_builder')}
        </p>
      </div>
      
      {/* Educational Information Box */}
      <div style={{ 
        padding: '16px', 
        backgroundColor: '#f0f8ff', 
        borderLeft: '4px solid #2196F3',
        borderRadius: '4px',
        marginTop: '24px',
      }}>
        <h4 style={{ marginTop: 0, fontSize: '14px', fontWeight: '600', color: '#1976D2' }}>
          {__('📚 How This Example Works', 'et_builder')}
        </h4>
        <ul style={{ marginBottom: 0, paddingLeft: '20px', fontSize: '13px', lineHeight: '1.6' }}>
          <li>
            {__('The word count updates via the ', 'et_builder')}
            <code style={{ 
              backgroundColor: '#e3f2fd', 
              padding: '2px 6px', 
              borderRadius: '3px',
              fontSize: '12px',
            }}>
              et.builder.content.change
            </code>
            {__(' hook', 'et_builder')}
          </li>
          <li>{__('This hook fires after save operations (draft, publish, preview)', 'et_builder')}</li>
          <li>{__('Third-party plugins can use this hook to analyze content', 'et_builder')}</li>
          <li>{__('Your focus keyword is saved to browser storage automatically', 'et_builder')}</li>
          <li>{__('Check the browser console to see detailed logging of hook events', 'et_builder')}</li>
        </ul>
      </div>
      
      {/* Developer Note */}
      <div style={{ 
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#fff3e0',
        borderLeft: '4px solid #ff9800',
        borderRadius: '4px',
      }}>
        <p style={{ margin: 0, fontSize: '12px', color: '#e65100' }}>
          <strong>{__('🔧 For Developers:', 'et_builder')}</strong>{' '}
          {__('Open the browser console to see detailed logs of hook events, store updates, and data flow. This example includes extensive logging for educational purposes.', 'et_builder')}
        </p>
      </div>
    </div>
  );
};

