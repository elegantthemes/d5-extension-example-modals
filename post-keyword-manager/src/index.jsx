import { addFilter, addAction } from '@wordpress/hooks';
import { PostKeywordManagerModal } from './modal/component';
import './icons/registerIcons';
import { dispatch, select } from '@divi/data';

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
addAction('divi.rest.syncToServer.content.change', 'postKeywordManager', (renderedContent, postData) => {
  // Get our focus keyword from Divi settings
  const keywordData = select('divi/settings').getSetting('postKeywordSettings', { focusKeyword: '' });
  const focusKeyword = keywordData?.focusKeyword || '';

  // Perform keyword density analysis
  if (focusKeyword && renderedContent) {
    const textContent = renderedContent.replace(/<[^>]*>/g, '').toLowerCase();
    const keywordLower = focusKeyword.toLowerCase();
    const matches = textContent.match(new RegExp(keywordLower, 'g'));
    const keywordCount = matches ? matches.length : 0;
    const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;
    const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

    // Log keyword density analysis results for demonstration
    console.log('Post Keyword Manager - Keyword Density Analysis:', {
      focusKeyword,
      keywordCount,
      totalWords: wordCount,
      densityPercentage: keywordDensity.toFixed(2) + '%',
      postId: postData.postId,
    });

    // Provide SEO feedback based on density
    if (keywordDensity < 0.5) {
      console.warn(`SEO Warning: Low keyword density (${keywordDensity.toFixed(2)}%) for "${focusKeyword}". Consider adding more instances.`);
    } else if (keywordDensity > 3.0) {
      console.warn(`SEO Warning: High keyword density (${keywordDensity.toFixed(2)}%) for "${focusKeyword}". Possible keyword stuffing.`);
    } else {
      console.log(`SEO OK: Good keyword density (${keywordDensity.toFixed(2)}%) for "${focusKeyword}".`);
    }
  }
});

/**
 * Listen for real-time page settings changes via divi.pageSettings.store.setting.update hook.
 *
 * This hook fires immediately when page settings (post title, excerpt, featured image, etc.)
 * are changed in the Visual Builder, BEFORE save operations complete. This enables
 * real-time integrations and immediate feedback during editing.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * The divi.pageSettings.store.setting.update hook is designed for plugins that need
 * to react immediately to page settings changes during editing, not just after save.
 *
 * When to use this hook:
 * - Real-time preview updates
 * - Immediate analytics tracking
 * - Live validation feedback
 * - External API synchronization during editing
 * - Custom UI updates based on settings
 *
 * Hook Parameters:
 * @param {string} settingKey - The name of the setting being updated (e.g., 'postTitle', 'postExcerpt', 'postImage')
 * @param {string} newValue - The new value being set
 *
 * Comparison with et.builder.content.change:
 * - This hook: Fires immediately during editing, before save
 * - et.builder.content.change: Fires after save completes with rendered content
 *
 * Example Implementation:
 * This hook listener demonstrates real-time SEO analysis by checking if the focus keyword
 * appears in page title or excerpt as the user types. It provides immediate feedback
 * about keyword placement and SEO best practices.
 *
 * @since 0.1.0
 */
addAction('divi.pageSettings.store.setting.update', 'postKeywordManager', (settingKey, newValue) => {
  // Get focus keyword from Divi settings for real-time SEO analysis
  const keywordData = select('divi/settings').getSetting('postKeywordSettings', { focusKeyword: '' });
  const focusKeyword = keywordData?.focusKeyword || '';

  // Handle featured image changes - check alt and title
  if (settingKey === 'postImage') {
    const imageId = newValue || '';
    if (!imageId || imageId === '0') {
      console.warn('⚠️ SEO Warning: Featured image removed or not set.');
      return;
    }

    // Try to find the featured image in the DOM to check alt and title
    const featuredImage = document.querySelector('img.wp-post-image, img.attachment-post-thumbnail, .et_featured_image img');
    
    if (featuredImage) {
      const altText = featuredImage.getAttribute('alt') || '';
      const titleText = featuredImage.getAttribute('title') || '';
      
      console.log('📸 Featured Image Updated:', {
        imageId,
        alt: altText || '(empty)',
        title: titleText || '(empty)',
      });

      if (!altText) {
        console.warn('⚠️ SEO Warning: Featured image alt text is empty. Add descriptive alt text for better SEO and accessibility.');
      }
      if (!titleText) {
        console.warn('⚠️ SEO Warning: Featured image title is empty. Consider adding a title attribute.');
      }
      if (altText && titleText) {
        console.log('✅ SEO OK: Featured image has both alt text and title set.');
      }
    } else {
      console.log('📸 Featured Image Updated:', {
        imageId,
        note: 'Image element not found in DOM yet. Alt and title will be available after page renders.',
      });
    }
    return;
  }

  // Only analyze if we have a focus keyword and the setting is relevant for SEO
  if (!focusKeyword || !['postTitle', 'postExcerpt'].includes(settingKey)) {
    return;
  }

  // Check if focus keyword appears in the page title or excerpt
  const settingValue = (newValue || '').toLowerCase();
  const keywordLower = focusKeyword.toLowerCase();
  const containsKeyword = settingValue.includes(keywordLower);
  const keywordPosition = containsKeyword ? settingValue.indexOf(keywordLower) : -1;
  const isNearStart = keywordPosition >= 0 && keywordPosition < 60; // Within first 60 characters

  // Provide real-time SEO feedback
  if (settingKey === 'postTitle') {
    if (containsKeyword) {
      if (isNearStart) {
        console.log(`✅ SEO Tip: Focus keyword "${focusKeyword}" found near the start of page title - excellent for SEO!`);
      } else {
        console.log(`⚠️ SEO Tip: Focus keyword "${focusKeyword}" found in page title, but consider moving it closer to the beginning.`);
      }
    } else {
      console.warn(`⚠️ SEO Warning: Focus keyword "${focusKeyword}" not found in page title. Consider including it for better SEO.`);
    }
  } else if (settingKey === 'postExcerpt') {
    if (containsKeyword) {
      console.log(`✅ SEO Tip: Focus keyword "${focusKeyword}" found in page excerpt - good for SEO!`);
    } else {
      console.warn(`⚠️ SEO Warning: Focus keyword "${focusKeyword}" not found in page excerpt. Consider including it.`);
    }
  }
});

