import React from 'react';
import { __ } from '@wordpress/i18n';
import { WrapperContainer, Header, BodyContainer, PanelContainer } from '@divi/modal';
import { ErrorBoundary } from '@divi/error-boundary';

import { SimpleModuleList } from './simple-component';

/**
 * Module Visibility Manager Modal Component.
 * 
 * Empty modal canvas demonstrating basic modal structure
 * for managing which modules appear in the module library.
 *
 * @since 0.1.0
 *
 * @param {Object} props Component props.
 * @returns {React.ReactElement}
 */
export const ModuleVisibilityManagerModal = (props) => {
  const { bodySiblingHeight } = props;

  return (
    <ErrorBoundary
      key="et-vb-divi-modal--module-visibility-manager"
      componentName="et-vb-divi-modal--module-visibility-manager"
    >
      <WrapperContainer
        dimension={null}
        offset={null}
        snappable
        expandable
        draggable
        resizable
        centered={false}
        modalName="divi/module-visibility-manager"
        bodySiblingHeight={bodySiblingHeight}
      >
        <Header name={__('Module Visibility Manager', 'et_builder')} />
        <BodyContainer>
          <PanelContainer id="module-visibility-manager" opened>
            <SimpleModuleList />
          </PanelContainer>
        </BodyContainer>
      </WrapperContainer>
    </ErrorBoundary>
  );
};
