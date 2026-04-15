import React from 'react';

import { __ } from '@wordpress/i18n';

import { useSelect } from '@divi/data';
import { ErrorBoundary } from '@divi/error-boundary';
import { Header, WrapperContainer } from '@divi/modal';

import { ShowcaseBody } from './showcase-body';

// Same string as the modal map and toolbar button so `modalName` / store selectors resolve one logical modal.
const MODAL_NAME = 'divi/modal-field-showcase';

/** Stable fallback when the modal has no `group` in the library store yet. */
const EMPTY_MODAL_GROUP = {};

/**
 * Top-level showcase modal: shell + composed body (tabs, search, footer).
 *
 * `GroupContainer` accordion state comes from `modalWrapperContext.modalGroup`, which must mirror
 * `divi/modal-library` (see Page Settings and module modals). Without this, when users enable
 * “Group Settings Into Closed Toggles”, groups stay closed because title clicks update the store
 * but the wrapper still passed the default `{}`.
 *
 * @param {Object} props Props from modal library.
 * @param {number} props.bodySiblingHeight Sibling chrome height.
 * @returns {React.ReactElement} Element.
 */
export const ModalFieldShowcaseModal = props => {
  const { bodySiblingHeight } = props;

  const modalGroup = useSelect(selectStore => {
    const group = selectStore('divi/modal-library').getModal(MODAL_NAME)?.group;

    if (!group) {
      return EMPTY_MODAL_GROUP;
    }

    return group;
  }, []);

  return (
    <ErrorBoundary
      key="et-vb-divi-modal--modal-field-showcase"
      componentName="et-vb-divi-modal--modal-field-showcase"
    >
      <WrapperContainer
        dimension={null}
        offset={null}
        snappable
        expandable
        draggable
        resizable
        centered={false}
        modalName={MODAL_NAME}
        modalActiveTab="field-showcase-panel"
        modalGroup={modalGroup}
        bodySiblingHeight={bodySiblingHeight}
      >
        <Header name={__('Modal Field Showcase', 'et_builder')} />
        <ShowcaseBody />
      </WrapperContainer>
    </ErrorBoundary>
  );
};
