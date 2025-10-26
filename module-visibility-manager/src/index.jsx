import { addFilter } from '@wordpress/hooks';
import { ModuleVisibilityManagerModal } from './modal/component';
import './icons/registerIcons';

/**
 * Register the Module Visibility Manager modal with Divi 5.
 */
addFilter('divi.modalLibrary.modalMapping', 'moduleVisibilityManager', modals => {
  modals.ModuleVisibilityManager = {
    name:      'divi/module-visibility-manager',
    label:     'Module Visibility Manager',
    type:      'multiInstanceModal',
    component: ModuleVisibilityManagerModal,
  };
  return modals;
});
