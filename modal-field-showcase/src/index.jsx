import { addFilter } from '@wordpress/hooks';

import { ModalFieldShowcaseModal } from './modal/component';
import './icons/registerIcons';

/**
 * Register the showcase modal mapping.
 *
 * @since 0.1.0
 */
addFilter('divi.modalLibrary.modalMapping', 'd5ModalFieldShowcase', modals => {
  modals.D5ModalFieldShowcase = {
    name: 'divi/modal-field-showcase',
    label: 'Modal Field Showcase',
    type: 'multiInstanceModal',
    component: ModalFieldShowcaseModal,
  };

  return modals;
});
