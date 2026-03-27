import { addFilter } from '@wordpress/hooks';

import * as modalFieldShowcaseIcon from './index';

/**
 * Register showcase icon for the builder bar button.
 *
 * @since 0.1.0
 */
addFilter('divi.iconLibrary.icon.map', 'd5ModalFieldShowcaseIcons', icons => ({
  ...icons,
  [modalFieldShowcaseIcon.name]: modalFieldShowcaseIcon,
}));
