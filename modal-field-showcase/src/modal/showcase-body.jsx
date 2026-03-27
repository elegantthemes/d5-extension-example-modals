import React, { useMemo, useRef, useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
  BorderStylesPreview,
  ColorPickerContainer,
  NumericInput,
  RangeContainer,
  SelectContainer,
  Spacing,
  Text,
  TextArea,
  Toggle,
  BorderRadius,
} from '@divi/field-library';

import {
  BodyContainer,
  DescriptionText,
  FieldWrapper,
  Footer,
  GroupContainer,
  HelpButton,
  PanelContainer,
  SearchBar,
  Tab,
  Tabs,
} from '@divi/modal';

import { useShowcaseSettings } from '../hooks';
import { mergeBorderRadiusChange } from '../utils/merge-border-radius';
import { mergeSpacingChange } from '../utils/merge-spacing';

import './showcase-body.css';

const TAB_CONTENT = 'content';
const TAB_APPEARANCE = 'appearance';

/**
 * @param {Object} props Props.
 * @param {string} props.query Search query.
 * @param {string} props.activeTab Active tab id.
 * @returns {boolean} Whether to show the group.
 */
const groupVisible = (props) => {
  const { query, activeTab, tab, title, keywords } = props;
  const q = (query || '').trim().toLowerCase();

  if (activeTab !== tab) {
    return false;
  }

  if (!q) {
    return true;
  }

  if (title.toLowerCase().includes(q)) {
    return true;
  }

  return keywords.some(k => k.toLowerCase().includes(q));
};

/**
 * Three independent toggles with a combined summary (tutorial custom control).
 *
 * @param {Object} props Props.
 * @param {{a: boolean, b: boolean, c: boolean}} props.value Toggle state.
 * @param {Function} props.onChange Change handler.
 * @returns {React.ReactElement} Element.
 */
const TriToggleCluster = ({ value, onChange }) => {
  const toggle = key => () => {
    onChange({
      ...value,
      [key]: !value[key],
    });
  };

  const summary = `A:${value.a ? 1 : 0} B:${value.b ? 1 : 0} C:${value.c ? 1 : 0}`;

  return (
    <div className="d5-showcase-tri-toggle">
      <p className="d5-showcase-tri-toggle__summary" aria-live="polite">
        {summary}
      </p>
      <div className="d5-showcase-tri-toggle__buttons">
        {['a', 'b', 'c'].map(key => (
          <button
            key={key}
            type="button"
            className={
              value[key]
                ? 'd5-showcase-tri-toggle__btn d5-showcase-tri-toggle__btn--on'
                : 'd5-showcase-tri-toggle__btn'
            }
            onClick={toggle(key)}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Main modal body: tabs, search, groups, fields, footer actions.
 *
 * @returns {React.ReactElement} Element.
 */
export const ShowcaseBody = () => {
  const {
    draft,
    updateDraft,
    postId,
    saveDraft,
    discardDraft,
  } = useShowcaseSettings();

  const [activeTab, setActiveTab] = useState(TAB_CONTENT);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const borderPreviewValue = useMemo(
    () => ({
      all: {
        style: draft.borderAll.style,
        color: draft.borderAll.color,
        width: draft.borderAll.width,
      },
    }),
    [draft.borderAll],
  );

  const footerButtons = useMemo(
    () => [
      {
        name: 'discard',
        label: __('Discard changes', 'et_builder'),
        onClick: () => {
          discardDraft();
        },
      },
      {
        name: 'save',
        label: __('Save to post', 'et_builder'),
        buttonColor: 'primary',
        onClick: () => {
          void saveDraft();
        },
      },
    ],
    [discardDraft, saveDraft],
  );

  const q = searchQuery;

  return (
    <>
      <Tabs>
        <Tab active={TAB_CONTENT === activeTab} onClick={() => setActiveTab(TAB_CONTENT)}>
          {__('Content & labels', 'et_builder')}
        </Tab>
        <Tab active={TAB_APPEARANCE === activeTab} onClick={() => setActiveTab(TAB_APPEARANCE)}>
          {__('Appearance tokens', 'et_builder')}
        </Tab>
      </Tabs>
      <BodyContainer>
        <PanelContainer id="d5-modal-field-showcase" opened>
          <div className="d5-showcase-infobox" role="note">
            <div className="d5-showcase-infobox__action">
              <HelpButton onHelpClick={() => { }} />
            </div>
            <p className="d5-showcase-infobox__text">
              {__(
                'HelpButton is for demo. Connect onHelpClick to your help action.',
                'et_builder',
              )}
            </p>
          </div>
          {!postId ? (
            <DescriptionText>
              {__(
                'Save the page once so WordPress assigns a post ID. Until then, changes stay in this session only.',
                'et_builder',
              )}
            </DescriptionText>
          ) : null}
          <SearchBar
            placeholder={__('Filter settings…', 'et_builder')}
            searchInputRef={searchInputRef}
            onSearchInputChange={setSearchQuery}
            isSearchActive={q.length > 0}
          />
          <div
            className={
              TAB_CONTENT === activeTab
                ? 'et-vb-modal-panel et-vb-active'
                : 'et-vb-modal-panel'
            }
            hidden={TAB_CONTENT !== activeTab}
          >
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_CONTENT,
              title: 'Labels & copy',
              keywords: ['label', 'text', 'textarea', 'notes', 'prefix', 'copy'],
            }) ? (
              <GroupContainer id="d5-showcase-copy" title={__('Labels & copy', 'et_builder')}>
                <FieldWrapper
                  label={__('Label prefix (Text)', 'et_builder')}
                  description={__('Prepended to generated placeholders in this tutorial narrative.', 'et_builder')}
                >
                  <Text
                    name="d5ShowcaseLabel"
                    value={draft.labelPrefix}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        labelPrefix: params.inputValue || '',
                      }));
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Design notes (TextArea)', 'et_builder')}
                  description={__('Longer copy for collaborators.', 'et_builder')}
                >
                  <TextArea
                    name="d5ShowcaseNotes"
                    value={draft.notes}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        notes: params.inputValue || '',
                      }));
                    }}
                  />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_CONTENT,
              title: 'Layout mode',
              keywords: ['layout', 'density', 'select', 'polish', 'toggle'],
            }) ? (
              <GroupContainer id="d5-showcase-layout" title={__('Layout mode', 'et_builder')}>
                <FieldWrapper
                  label={__('Layout density (Select)', 'et_builder')}
                  description={__('Static options map like module.json select fields.', 'et_builder')}
                >
                  <SelectContainer
                    name="d5ShowcaseDensity"
                    value={draft.layoutDensity}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        layoutDensity: params.inputValue || 'comfortable',
                      }));
                    }}
                    options={{
                      comfortable: { label: __('Comfortable', 'et_builder') },
                      compact: { label: __('Compact', 'et_builder') },
                      spacious: { label: __('Spacious', 'et_builder') },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Enable polish pass (Toggle)', 'et_builder')}
                  description={__('Example on/off value persisted as boolean server-side.', 'et_builder')}
                >
                  <Toggle
                    name="d5ShowcasePolish"
                    value={draft.enablePolish}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        enablePolish: params.inputValue || 'off',
                      }));
                    }}
                  />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
          </div>
          <div
            className={
              TAB_APPEARANCE === activeTab
                ? 'et-vb-modal-panel et-vb-active'
                : 'et-vb-modal-panel'
            }
            hidden={TAB_APPEARANCE !== activeTab}
          >
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Color & border',
              keywords: ['accent', 'color', 'border', 'preview', 'shadow', 'stroke'],
            }) ? (
              <GroupContainer id="d5-showcase-color-border" title={__('Color & border', 'et_builder')}>
                <FieldWrapper
                  label={__('Accent (ColorPicker)', 'et_builder')}
                  description={__('Hex or empty for transparent intent.', 'et_builder')}
                >
                  <ColorPickerContainer
                    name="d5ShowcaseAccent"
                    value={draft.accentColor}
                    defaultValue=""
                    onChange={params => {
                      const next = undefined === params.inputValue ? '' : params.inputValue;
                      updateDraft(d => ({
                        ...d,
                        accentColor: next || '',
                      }));
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Border style (Select)', 'et_builder')}
                  description={__('Feeds the read-only BorderStylesPreview below.', 'et_builder')}
                >
                  <SelectContainer
                    name="d5ShowcaseBorderStyle"
                    value={draft.borderAll.style}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        borderAll: {
                          ...d.borderAll,
                          style: params.inputValue || 'solid',
                        },
                      }));
                    }}
                    options={{
                      solid: { label: __('Solid', 'et_builder') },
                      dashed: { label: __('Dashed', 'et_builder') },
                      dotted: { label: __('Dotted', 'et_builder') },
                      none: { label: __('None', 'et_builder') },
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Border color (ColorPicker)', 'et_builder')}
                >
                  <ColorPickerContainer
                    name="d5ShowcaseBorderColor"
                    value={draft.borderAll.color}
                    defaultValue="#333333"
                    onChange={params => {
                      const next = undefined === params.inputValue ? '' : params.inputValue;
                      updateDraft(d => ({
                        ...d,
                        borderAll: {
                          ...d.borderAll,
                          color: next || '#333333',
                        },
                      }));
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Border width (Range)', 'et_builder')}
                  description={__('Standalone shadow fields are module-bound; this preview stands in for stroke weight.', 'et_builder')}
                >
                  <RangeContainer
                    name="d5ShowcaseBorderWidth"
                    value={draft.borderAll.width}
                    defaultValue="1px"
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        borderAll: {
                          ...d.borderAll,
                          width: params.inputValue || '0px',
                        },
                      }));
                    }}
                    min={0}
                    max={16}
                    allowedUnits={['px']}
                    cssProperty="border-width"
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Border preview (BorderStylesPreview)', 'et_builder')}
                  description={__('Read-only preview; edit using the fields above.', 'et_builder')}
                >
                  <BorderStylesPreview value={borderPreviewValue} />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Spacing & radius',
              keywords: ['spacing', 'padding', 'margin', 'radius', 'corner'],
            }) ? (
              <GroupContainer id="d5-showcase-spacing" title={__('Spacing & radius', 'et_builder')}>
                <FieldWrapper
                  label={__('Section padding (Spacing)', 'et_builder')}
                  description={__('Uses merge helper for incremental onChange payloads.', 'et_builder')}
                >
                  <Spacing
                    name="d5ShowcaseSpacing"
                    cssProperty="padding"
                    value={draft.sectionPadding}
                    defaultValue={{
                      top: '',
                      right: '',
                      bottom: '',
                      left: '',
                      syncHorizontal: 'off',
                      syncVertical: 'off',
                    }}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        sectionPadding: mergeSpacingChange(d.sectionPadding, params.inputValue),
                      }));
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Corner radius (BorderRadius)', 'et_builder')}
                >
                  <BorderRadius
                    name="d5ShowcaseRadius"
                    value={draft.cornerRadius}
                    defaultValue={{
                      topLeft: '',
                      topRight: '',
                      bottomLeft: '',
                      bottomRight: '',
                      sync: 'off',
                    }}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        cornerRadius: mergeBorderRadiusChange(d.cornerRadius, params),
                      }));
                    }}
                  />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Fine tuning',
              keywords: ['emphasis', 'range', 'reading', 'numeric', 'measure'],
            }) ? (
              <GroupContainer id="d5-showcase-fine" title={__('Fine tuning', 'et_builder')}>
                <FieldWrapper
                  label={__('Emphasis scale (Range)', 'et_builder')}
                  description={__('0–100 for decorative weight.', 'et_builder')}
                >
                  <RangeContainer
                    name="d5ShowcaseEmphasis"
                    value={draft.emphasisScale}
                    defaultValue="50"
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        emphasisScale: params.inputValue || '0',
                      }));
                    }}
                    min={0}
                    max={100}
                    allowedUnits={['%']}
                    defaultUnit="%"
                  />
                </FieldWrapper>
                <FieldWrapper
                  label={__('Reading measure (NumericInput)', 'et_builder')}
                  description={__('Max line width in em units.', 'et_builder')}
                >
                  <NumericInput
                    name="d5ShowcaseMeasure"
                    value={draft.readingMeasure}
                    defaultValue="45em"
                    defaultUnit="em"
                    allowedUnits={['em']}
                    onChange={params => {
                      updateDraft(d => ({
                        ...d,
                        readingMeasure: params.inputValue || '',
                      }));
                    }}
                  />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Custom control',
              keywords: ['custom', 'toggle', 'tri', 'bit', 'flags'],
            }) ? (
              <GroupContainer id="d5-showcase-custom" title={__('Custom control', 'et_builder')}>
                <FieldWrapper
                  label={__('Three independent toggles', 'et_builder')}
                  description={__(
                    'Plain React buttons with combined state (not a field-library type). Useful for bespoke UX.',
                    'et_builder',
                  )}
                >
                  <TriToggleCluster
                    value={draft.triToggle}
                    onChange={next => {
                      updateDraft(d => ({
                        ...d,
                        triToggle: next,
                      }));
                    }}
                  />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
          </div>
        </PanelContainer>
      </BodyContainer>
      <Footer buttons={footerButtons} />
    </>
  );
};
