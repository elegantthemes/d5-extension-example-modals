import { addFilter } from '@wordpress/hooks';
import { postKeyword } from './index';

/**
 * Register custom icons with Divi icon library.
 *
 * This makes the icons available for use in toolbar buttons and other
 * UI elements throughout the Visual Builder.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * The divi.iconLibrary.icon.map filter is the standard way to add
 * custom icons to Divi. Icons are registered using the icon object
 * which contains name, viewBox, and component properties.
 *
 * IMPORTANT: Always spread the existing icons (...icons) to avoid
 * overwriting other registered icons!
 *
 * Usage in components:
 * - Toolbar buttons: iconSvg: { name: 'your-icon-name' }
 * - Other UI: Use the icon library utilities
 *
 * Icon Naming:
 * - Use kebab-case for icon names
 * - Make names descriptive and unique
 * - Prefix with your plugin name to avoid conflicts
 *
 * @since 0.1.0
 */
addFilter('divi.iconLibrary.icon.map', 'postKeywordIcons', icons => ({
  ...icons, // Important: spread existing icons to not overwrite them.
  [postKeyword.name]: postKeyword,
}));

