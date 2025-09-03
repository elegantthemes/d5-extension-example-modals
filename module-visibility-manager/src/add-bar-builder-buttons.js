import { registerBuilderBarButton } from '@divi/app-ui';
import {
  dispatch,
  select,
} from '@divi/data';

registerBuilderBarButton({
  iconSvg: { name: 'module-visibility' },
  label:   'Module Visibility',
  order:   21,
  name:    'divi/module-visibility-manager',
  onClick: () => {
    // Check if the 'divi/module-visibility-manager' modal is currently active
    if (select('divi/modal-library').getModal('divi/module-visibility-manager')?.isActive) {
      // If the modal is active, close it
      dispatch('divi/modal-library').close({
        name: 'divi/module-visibility-manager',
      });
    } else {
      // If the modal is not active, open it
      dispatch('divi/modal-library').open({
        name: 'divi/module-visibility-manager',
      });
    }
  },
});
