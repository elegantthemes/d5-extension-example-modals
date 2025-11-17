import { registerBuilderBarButton } from '@divi/app-ui';
import { dispatch, select } from '@divi/data';

/**
 * Register toolbar button for Post Keyword Manager.
 *
 * This adds a button to the Visual Builder toolbar that opens/closes
 * the Post Keyword Manager modal. The button follows Divi's standard
 * pattern for toolbar integration.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * The registerBuilderBarButton function is the standard way to add
 * custom buttons to the Divi Visual Builder toolbar. This provides
 * a consistent user experience and ensures your button integrates
 * properly with the builder's UI.
 *
 * Button Configuration:
 * - iconSvg: Reference to a registered icon (see registerIcons.js)
 * - label: Tooltip text shown on hover
 * - order: Position in toolbar (higher numbers appear later)
 * - name: Unique identifier for the button
 * - onClick: Handler function called when button is clicked
 *
 * @since 0.1.0
 */
registerBuilderBarButton({
  iconSvg: { name: 'post-keyword' },
  label:   'Post Keywords',
  order:   22, // After module-visibility-manager (21).
  name:    'divi/post-keyword-manager',
  onClick: () => {
    // Check if the modal is currently active.
    // This allows us to toggle the modal open/closed with the same button.
    const isActive = select('divi/modal-library').getModal('divi/post-keyword-manager')?.isActive;
    
    if (isActive) {
      // Close modal if already open.
      dispatch('divi/modal-library').close({
        name: 'divi/post-keyword-manager',
      });
    } else {
      // Open modal.
      dispatch('divi/modal-library').open({
        name: 'divi/post-keyword-manager',
      });
    }
  },
});

