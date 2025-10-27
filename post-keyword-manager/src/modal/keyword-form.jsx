import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@divi/data';
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
  console.log('📋 FORM: Rendering keyword form');

  // Use the custom hook for managing keyword data
  const { focusKeyword, updateFocusKeyword } = usePostKeywordManager();

  // Get post title from Divi settings
  const postTitle = useSelect(s => s('divi/settings').getSetting(['post', 'title']), []);

  console.log('📋 FORM: Current data - keyword:', focusKeyword, 'title:', postTitle);

  /**
   * Handle keyword input change.
   *
   * This is called every time the user types in the keyword input field.
   * It uses the custom hook to update both the store and persist to database.
   *
   * @param {Event} event The input change event.
   */
  const handleKeywordChange = (event) => {
    const newKeyword = event.target.value;
    console.log('📋 FORM: Keyword changed to:', newKeyword);
    updateFocusKeyword(newKeyword);
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
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0' }}>
          {__('💡 Focus keyword is saved automatically to WordPress database as you type.', 'et_builder')}
        </p>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0' }}>
          {__('🔍 Keyword density analysis runs automatically when you save. Check browser console for results.', 'et_builder')}
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
          {__('💡 This keyword is saved automatically to WordPress database as you type.', 'et_builder')}
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
            {__('The ', 'et_builder')}
            <code style={{
              backgroundColor: '#e3f2fd',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '12px',
            }}>
              et.builder.content.change
            </code>
            {__(' hook provides access to rendered content', 'et_builder')}
          </li>
          <li>{__('Plugin performs keyword density analysis when content is saved', 'et_builder')}</li>
          <li>{__('Analysis results and SEO feedback logged to browser console', 'et_builder')}</li>
          <li>{__('Demonstrates how plugins can analyze content via hooks', 'et_builder')}</li>
          <li>{__('All processing happens within the plugin (no core changes)', 'et_builder')}</li>
          <li>{__('Third-party plugins can implement similar analysis features', 'et_builder')}</li>
          <li>{__('Check browser console for keyword density analysis results', 'et_builder')}</li>
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
          {__('Open the browser console to see detailed logs of hook events, store updates, and debounced REST API calls. This example follows the same data management pattern as the Module Visibility Manager.', 'et_builder')}
        </p>
      </div>
    </div>
  );
};

