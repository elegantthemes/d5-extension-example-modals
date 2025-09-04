import { addFilter, addAction } from '@wordpress/hooks';
import { ModuleVisibilityManagerModal } from './modal/component';
import './icons/registerIcons';
import { registerCustomStore } from './custom-store';

// Register custom store after module library is ready
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'moduleVisibilityCustomStore', () => {
  registerCustomStore();
  // Custom store registered via hook
});

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
