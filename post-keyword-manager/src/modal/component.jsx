import React from 'react';
import { __ } from '@wordpress/i18n';
import { WrapperContainer, Header, BodyContainer, PanelContainer } from '@divi/modal';
import { ErrorBoundary } from '@divi/error-boundary';
import { KeywordForm } from './keyword-form';

/**
 * Post Keyword Manager Modal Component.
 *
 * Demonstrates basic modal structure for managing post keywords
 * and displaying content statistics from et.builder.content.change hook.
 *
 * Educational Note for Third-Party Developers:
 * =============================================
 * This modal follows Divi's standard modal structure pattern:
 *
 * 1. ErrorBoundary: Wraps the entire modal to catch and handle errors gracefully
 * 2. WrapperContainer: Provides modal functionality (drag, resize, expand, snap)
 * 3. Header: Standard modal header with title and close button
 * 4. BodyContainer: Contains the modal content
 * 5. PanelContainer: Organizes content into collapsible panels
 *
 * Modal Features:
 * - draggable: User can drag the modal around the screen
 * - resizable: User can resize the modal
 * - expandable: User can expand/collapse the modal
 * - snappable: Modal snaps to screen edges when dragged near them
 *
 * @since 0.1.0
 *
 * @param {Object} props Component props.
 * @param {number} props.bodySiblingHeight Height of elements outside the body.
 * @returns {React.ReactElement}
 */
export const PostKeywordManagerModal = (props) => {
  const { bodySiblingHeight } = props;

  console.log('🎨 MODAL: Rendering Post Keyword Manager modal');

  return (
    <ErrorBoundary
      key="et-vb-divi-modal--post-keyword-manager"
      componentName="et-vb-divi-modal--post-keyword-manager"
    >
      <WrapperContainer
        dimension={null}
        offset={null}
        snappable
        expandable
        draggable
        resizable
        centered={false}
        modalName="divi/post-keyword-manager"
        bodySiblingHeight={bodySiblingHeight}
      >
        <Header name={__('Post Keyword Manager', 'et_builder')} />
        <BodyContainer>
          <PanelContainer id="post-keyword-manager" opened>
            <KeywordForm />
          </PanelContainer>
        </BodyContainer>
      </WrapperContainer>
    </ErrorBoundary>
  );
};

