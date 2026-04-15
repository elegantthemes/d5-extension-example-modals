# Modal tabs pattern (same as Modal Field Showcase)

This matches **`src/modal/component.jsx`** + **`src/modal/showcase-body.jsx`**: **manual `Tabs` / `Tab`** with React state, **one** `PanelContainer`, and **per-tab regions** toggled with `hidden` + `et-vb-modal-panel` classes. It does **not** use `WrapperContainer` `multiPanels` or `BodyPanelWrapperContainer`.

## 1. Modal shell (`component.jsx` style)

- Pass **`modalName`** (must match `modalMapping` / `open({ name })`).
- Pass **`modalActiveTab`** equal to your **`PanelContainer` `id`** so `GroupContainer` accordions stay in sync with `divi/modal-library` when “group settings into closed toggles” is used.
- Optionally subscribe **`modalGroup`** from the store and pass it through (required for `GroupContainer` in this modal).

```jsx
import React from 'react';

import { __ } from '@wordpress/i18n';

import { useSelect } from '@divi/data';
import { ErrorBoundary } from '@divi/error-boundary';
import { Header, WrapperContainer } from '@divi/modal';

import { MyModalBody } from './my-modal-body';

const MODAL_NAME = 'divi/my-custom-modal';
const PANEL_ID = 'my-custom-modal-main';

const EMPTY_MODAL_GROUP = {};

export const MyCustomModal = props => {
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
      key="et-vb-divi-modal--my-custom-modal"
      componentName="et-vb-divi-modal--my-custom-modal"
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
        modalActiveTab={PANEL_ID}
        modalGroup={modalGroup}
        bodySiblingHeight={bodySiblingHeight}
      >
        <Header name={__('My Modal', 'et_builder')} />
        <MyModalBody panelId={PANEL_ID} />
      </WrapperContainer>
    </ErrorBoundary>
  );
};
```

## 2. Body with tabs (`showcase-body.jsx` style)

- **`Tabs` / `Tab`** are **presentational**: you own **`useState`** for which logical tab is active.
- **`BodyContainer`** wraps the scrollable body.
- **Single `PanelContainer`** with **`id={panelId}`** and **`opened`** — same `id` as **`modalActiveTab`** on the wrapper.
- For each “tab”, use a **wrapper `div`** with:
  - **`hidden={activeTab !== '…'}`** (or conditional render), and
  - **`className`** including **`et-vb-modal-panel`** and **`et-vb-active`** when that tab is selected (matches core panel styling).

```jsx
import React, { useState } from 'react';

import { __ } from '@wordpress/i18n';

import { BodyContainer, PanelContainer, Tab, Tabs } from '@divi/modal';

const TAB_FIRST = 'first';
const TAB_SECOND = 'second';

/**
 * @param {Object} props Props.
 * @param {string} props.panelId Same id as WrapperContainer modalActiveTab + PanelContainer id.
 * @returns {React.ReactElement} Element.
 */
export const MyModalBody = ({ panelId }) => {
  const [activeTab, setActiveTab] = useState(TAB_FIRST);

  return (
    <>
      <Tabs>
        <Tab active={TAB_FIRST === activeTab} onClick={() => setActiveTab(TAB_FIRST)}>
          {__('First', 'et_builder')}
        </Tab>
        <Tab active={TAB_SECOND === activeTab} onClick={() => setActiveTab(TAB_SECOND)}>
          {__('Second', 'et_builder')}
        </Tab>
      </Tabs>
      <BodyContainer>
        <PanelContainer id={panelId} opened>
          <div
            className={
              TAB_FIRST === activeTab
                ? 'et-vb-modal-panel et-vb-active'
                : 'et-vb-modal-panel'
            }
            hidden={TAB_FIRST !== activeTab}
          >
            {/* Tab 1 content: GroupContainer, FieldWrapper, fields, etc. */}
          </div>
          <div
            className={
              TAB_SECOND === activeTab
                ? 'et-vb-modal-panel et-vb-active'
                : 'et-vb-modal-panel'
            }
            hidden={TAB_SECOND !== activeTab}
          >
            {/* Tab 2 content */}
          </div>
        </PanelContainer>
      </BodyContainer>
    </>
  );
};
```

## 3. Registration (reminder)

- Map the modal component under the same **`MODAL_NAME`**.
- Open with **`dispatch('divi/modal-library').open({ name: MODAL_NAME })`**.

## 4. What’s wrong with this snippet?

Some tutorials suggest **`multiPanels`** plus **`label`** on **`PanelContainer`** inside plain **`BodyContainer`**. Example:

```jsx
<WrapperContainer multiPanels modalName={name}>
  <BodyContainer>
    <PanelContainer id="panel1" label="Tab 1" opened>
      {/* First tab content */}
    </PanelContainer>
    <PanelContainer id="panel2" label="Tab 2" opened>
      {/* Second tab content */}
    </PanelContainer>
  </BodyContainer>
</WrapperContainer>
```

Problems:

1. **`multiPanels` is not “enable tabs.”** In core, it only activates a **wide split / multi-panel** layout when several conditions hold (including modal width and `panelSize`). It is easy to end up with **two panels visible at once** instead of one active tab.

2. **No tab strip is created.** The **`label`** on **`PanelContainer`** is used by **`BodyPanelWrapper` / `BodyPanelWrapperContainer`**, which scans children and renders **`Tabs` + `TabContainer`**. **`BodyContainer`** does **not** do that—so **`label` does nothing** for tabs in this structure.

3. **`opened` on both panels keeps both open.** Visibility is roughly `opened || isMultiPanels || modalActiveTab === id`. With **`opened`** on **each** panel, **both** stay mounted/visible regardless of tab intent.

4. **Missing `modalActiveTab` on the wrapper.** For store-driven panel switching (core pattern), the wrapper should know the active panel id; this snippet never sets it. Even if you dropped `opened` from one panel, you still would not get automatic tab UI without **`BodyPanelWrapperContainer`** or manual **`Tabs`** like in sections 1–2.

**If you want core-style auto-tabs from panel ids + labels**, use **`BodyPanelWrapperContainer`** (not raw **`BodyContainer`** alone), avoid **`opened`** on every panel, and set **`modalActiveTab`** on the wrapper—see the **`@divi/modal`** package README shipped with the Divi theme. **If you want the showcase-style pattern**, use sections 1–2 above instead.

## Reference in this repo

| Piece | File |
|--------|------|
| Shell + `modalGroup` / `modalActiveTab` | `src/modal/component.jsx` |
| Tabs + body + `PanelContainer` + panels | `src/modal/showcase-body.jsx` |
