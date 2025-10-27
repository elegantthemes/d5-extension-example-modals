import { addFilter, addAction } from '@wordpress/hooks';
import { PostKeywordManagerModal } from './modal/component';
import './icons/registerIcons';
import { dispatch } from '@divi/data';

/**
 * Register the Post Keyword Manager modal with Divi 5.
 *
 * This makes the modal available to be opened via the toolbar button.
 * The modal is registered as a multiInstanceModal, which means multiple
 * instances can be open simultaneously.
 *
 * @since 0.1.0
 */
addFilter('divi.modalLibrary.modalMapping', 'postKeywordManager', modals => {
  modals.PostKeywordManager = {
    name:      'divi/post-keyword-manager',
    label:     'Post Keyword Manager',
    type:      'multiInstanceModal',
    component: PostKeywordManagerModal,
  };
  
  return modals;
});

/**
 * Listen for content changes via et.builder.content.change hook.
 *
 * This is the key integration point for third-party plugins that need to
 * analyze page content. The hook fires after successful save operations
 * (draft, publish, preview) and provides the fully rendered HTML content.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * The et.builder.content.change hook is specifically designed for plugins
 * that need to analyze or process the rendered output of the Visual Builder.
 *
 * When to use this hook:
 * - SEO analysis (like Yoast or Rank Math)
 * - Content validation
 * - Word count or readability analysis
 * - Accessibility checking
 * - Custom content indexing
 *
 * Hook Parameters:
 * @param {string} renderedContent - The fully rendered HTML content as a string
 * @param {object} postData - Post metadata object containing:
 *   - postId: The ID of the post being saved
 *
 * Performance Note:
 * The hook only fires when at least one listener is registered. This is
 * an optimization to avoid generating rendered content when it's not needed.
 * The Visual Builder checks for listeners using hasAction() before requesting
 * the rendered content from the server.
 *
 * @since 0.1.0
 */
addAction('et.builder.content.change', 'postKeywordManager', (renderedContent, postData) => {
  // Hook is registered for educational purposes to demonstrate how third-party
  // plugins can listen to content changes. The focus keyword is now managed
  // through the Divi settings store and persisted via REST API.

  // For educational purposes, log that the hook fired.
  // Remove this in production code.
  console.log('📋 HOOK: et.builder.content.change fired for Post Keyword Manager');
});

