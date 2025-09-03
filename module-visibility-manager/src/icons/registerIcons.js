import { addFilter } from '@wordpress/hooks';
import { moduleVisibility } from './index';

// Add module visibility icon to the icon library.
addFilter('divi.iconLibrary.icon.map', 'moduleVisibilityManager', icons => ({
  ...icons, // This is important. Without this, all other icons will be overwritten.
  [moduleVisibility.name]: moduleVisibility,
}));
