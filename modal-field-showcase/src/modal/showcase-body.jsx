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

// Local filter for tutorial clarity: core inspector uses `useSettingsSearch` + the modal tab store; this example keeps search state in React and hides whole `GroupContainer` blocks when nothing matches.
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
    <div className="field-showcase-tri-toggle">
      <p className="field-showcase-tri-toggle__summary" aria-live="polite">
        {summary}
      </p>
      <div className="field-showcase-tri-toggle__buttons">
        {['a', 'b', 'c'].map(key => (
          <button
            key={key}
            type="button"
            className={
              value[key]
                ? 'field-showcase-tri-toggle__btn field-showcase-tri-toggle__btn--on'
                : 'field-showcase-tri-toggle__btn'
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
  // `updateDraft` = in-memory edits; `saveDraft` / `discardDraft` = commit or revert against the server-backed baseline (see `use-showcase-settings.js`).
  const {
    draft,
    updateDraft,
    postId,
    saveDraft,
    discardDraft,
  } = useShowcaseSettings();

  // Pure presentation state: not persisted; tabs + search reset when the modal closes because the component unmounts.
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

  // `Footer` expects a stable descriptor list; memo avoids re-creating closures on every render when `draft` changes.
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
      {/* @divi/modal — Tabs: primary navigation between Content and Appearance field sets. */}
      <Tabs>
        <Tab active={TAB_CONTENT === activeTab} onClick={() => setActiveTab(TAB_CONTENT)}>
          {__('Content & labels', 'et_builder')}
        </Tab>
        <Tab active={TAB_APPEARANCE === activeTab} onClick={() => setActiveTab(TAB_APPEARANCE)}>
          {__('Appearance tokens', 'et_builder')}
        </Tab>
      </Tabs>
      <BodyContainer>
        <PanelContainer id="field-showcase-panel" opened>
          {/* HelpButton (with caption): supported alternative to a bespoke “info box” component. */}
          <div className="field-showcase-infobox" role="note">
            <div className="field-showcase-infobox__action">
              <HelpButton onHelpClick={() => { }} />
            </div>
            <p className="field-showcase-infobox__text">
              {__(
                'HelpButton is for demo. Connect onHelpClick to your help action.',
                'et_builder',
              )}
            </p>
          </div>
          {/* DescriptionText: contextual copy when the layout is not persisted yet (no post ID). */}
          {!postId ? (
            <DescriptionText>
              {__(
                'Save the page once so WordPress assigns a post ID. Until then, changes stay in this session only.',
                'et_builder',
              )}
            </DescriptionText>
          ) : null}
          {/* SearchBar: drives `searchQuery`; `groupVisible` hides whole groups when labels/keywords do not match. */}
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
            {/* --- Tab "Content & labels": Text, TextArea --- */}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_CONTENT,
              title: 'Labels & copy',
              keywords: ['label', 'text', 'textarea', 'notes', 'prefix', 'copy'],
            }) ? (
              <GroupContainer id="field-showcase-group-copy" title={__('Labels & copy', 'et_builder')}>
                {/* Field: Text (@divi/field-library). */}
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
                {/* Field: TextArea (@divi/field-library). */}
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
            {/* --- Same tab: Select, Toggle --- */}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_CONTENT,
              title: 'Layout mode',
              keywords: ['layout', 'density', 'select', 'polish', 'toggle'],
            }) ? (
              <GroupContainer id="field-showcase-group-layout" title={__('Layout mode', 'et_builder')}>
                {/* Field: SelectContainer (@divi/field-library). */}
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
                {/* Field: Toggle (@divi/field-library). */}
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
            {/* --- Tab "Appearance": ColorPicker, Select, Range, BorderStylesPreview --- */}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Color & border',
              keywords: ['accent', 'color', 'border', 'preview', 'shadow', 'stroke'],
            }) ? (
              <GroupContainer id="field-showcase-group-color-border" title={__('Color & border', 'et_builder')}>
                {/* Field: ColorPickerContainer (opens shared color UI like the inspector). */}
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
                {/* Field: SelectContainer (border style options). */}
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
                {/* Field: ColorPickerContainer (second picker: border stroke color). */}
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
                {/* Field: RangeContainer (numeric range with units; here border width). */}
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
                {/* Field: BorderStylesPreview (read-only composite preview from border state above). */}
                <FieldWrapper
                  label={__('Border preview (BorderStylesPreview)', 'et_builder')}
                  description={__('Read-only preview; edit using the fields above.', 'et_builder')}
                >
                  <BorderStylesPreview value={borderPreviewValue} />
                </FieldWrapper>
              </GroupContainer>
            ) : null}
            {/* --- Spacing, BorderRadius --- */}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Spacing & radius',
              keywords: ['spacing', 'padding', 'margin', 'radius', 'corner'],
            }) ? (
              <GroupContainer id="field-showcase-group-spacing" title={__('Spacing & radius', 'et_builder')}>
                {/* Field: Spacing (@divi/field-library); merges partial onChange via helper. */}
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
                {/* Field: BorderRadius (@divi/field-library). */}
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
            {/* --- Range (again), NumericInput --- */}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Fine tuning',
              keywords: ['emphasis', 'range', 'reading', 'numeric', 'measure'],
            }) ? (
              <GroupContainer id="field-showcase-group-fine" title={__('Fine tuning', 'et_builder')}>
                {/* Field: RangeContainer (percentage emphasis). */}
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
                {/* Field: NumericInput (@divi/field-library). */}
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
            {/* --- Custom control: plain React (not field-library) --- */}
            {groupVisible({
              query: q,
              activeTab,
              tab: TAB_APPEARANCE,
              title: 'Custom control',
              keywords: ['custom', 'toggle', 'tri', 'bit', 'flags'],
            }) ? (
              <GroupContainer id="field-showcase-group-custom" title={__('Custom control', 'et_builder')}>
                <FieldWrapper
                  label={__('Three independent toggles', 'et_builder')}
                  description={__(
                    'Plain React buttons with combined state (not a field-library type). Useful for bespoke UX.',
                    'et_builder',
                  )}
                >
                  {/* TriToggleCluster: bespoke buttons + local state shape (see component above). */}
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
      {/* Footer: primary/secondary actions wired in `footerButtons` (save hits REST + `divi/settings`). */}
      <Footer buttons={footerButtons} />
    </>
  );
};
