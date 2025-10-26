import { addFilter, addAction } from '@wordpress/hooks';
import { PostKeywordManagerModal } from './modal/component';
import './icons/registerIcons';
import { registerCustomStore } from './custom-store';
import { dispatch } from '@divi/data';

/**
 * Register custom store after module library is ready.
 *
 * This ensures the store is available when the modal opens and prevents
 * any timing issues with store registration.
 *
 * @since 0.1.0
 */
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'postKeywordCustomStore', () => {
  registerCustomStore();
});

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
  // Update store with rendered content.
  // This makes the content available to the modal for display or analysis.
  dispatch('divi/post-keyword').updateRenderedContent(renderedContent);
  
  // Calculate word count from HTML.
  // We create a temporary DOM element to extract text content from HTML.
  // This is a simple approach - production plugins might want more sophisticated
  // text extraction that handles special cases like code blocks, etc.
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = renderedContent;
  
  // Extract text content (strips HTML tags).
  const text = tempDiv.textContent || tempDiv.innerText || '';
  
  // Count words by splitting on whitespace and filtering empty strings.
  // This is a basic word count - production plugins might want to:
  // - Handle hyphenated words
  // - Count numbers separately
  // - Exclude certain content (like navigation, footers)
  // - Handle multiple languages with different word boundaries
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Update store with word count.
  // The modal will reactively update when this value changes.
  dispatch('divi/post-keyword').updateWordCount(wordCount);
});

