import { registerBuilderBarButton } from '@divi/app-ui';
import { dispatch, select } from '@divi/data';

const MODAL_NAME = 'divi/modal-field-showcase';

/**
 * Builder bar entry point for the showcase modal.
 *
 * @since 0.1.0
 */
registerBuilderBarButton({
  iconSvg: { name: 'd5-modal-field-showcase' },
  label: 'Field showcase',
  order: 23,
  name: MODAL_NAME,
  onClick: () => {
    const isActive = select('divi/modal-library').getModal(MODAL_NAME)?.isActive;

    if (isActive) {
      dispatch('divi/modal-library').close({
        name: MODAL_NAME,
      });
    } else {
      dispatch('divi/modal-library').open({
        name: MODAL_NAME,
      });
    }
  },
});
