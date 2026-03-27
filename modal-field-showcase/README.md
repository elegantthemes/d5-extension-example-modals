# Modal Field Showcase (Divi 5 example)

Third example in **D5 Extension Example: Modals**. It complements **Module Visibility** (options + builder bar) and **Post Keyword** (options + hooks) with a **kitchen-sink modal** aimed at issue-style documentation: tabs, in-modal search, footer actions, collapsible groups, many `@divi/field-library` controls, a small custom React control, and **per-post** persistence via `post_meta`.

## Issue checklist mapping (#48965)

| Request | How this example covers it |
|--------|----------------------------|
| Custom builder bar button | `src/add-toolbar-button.js` — `registerBuilderBarButton` |
| Custom modal | `src/index.jsx` + `src/modal/component.jsx` — `divi.modalLibrary.modalMapping` |
| Multiple tabs | `Tabs` / `Tab` + panel pattern (same structural idea as core **Add Module** modal) |
| Search bar | `SearchBar` + local React state filtering (inspector-style search in core uses `useSettingsSearch` from `@divi/modal`; see below) |
| Footer buttons | `Footer` — Discard (revert draft) / Save to post (REST) |
| Info + button | `DescriptionText` + `HelpButton` with no-op `onHelpClick` (placeholder; swap in real behavior). No `InfoBox` on `@divi/modal`. |
| Collapsible groups | `GroupContainer` with multiple `FieldWrapper` rows |
| Field types | See table below |
| Custom setting | `TriToggleCluster` — three independent booleans + summary |
| Post meta | Meta key `_d5_modal_field_showcase_v1` + REST `POST /divi/v1/modal-field-showcase-settings/update` |

## Field types demonstrated

| UI label | Package export | Value notes |
|----------|----------------|-------------|
| Label prefix | `Text` | String; `onChange` uses `{ inputValue }`. |
| Design notes | `TextArea` | String; `{ inputValue }`. |
| Layout density | `SelectContainer` | Static `options` map (like many `module.json` selects). |
| Enable polish | `Toggle` | `'on'` / `'off'` in the UI; stored as boolean in PHP meta. |
| Accent | `ColorPickerContainer` | Same as inspector: opens the color modal via `divi/modal-library`. Raw `ColorPicker` in `inline` mode has no `onPreviewButtonClick`. |
| Border style / color / width | `SelectContainer`, `ColorPickerContainer`, `RangeContainer` | Composed into `BorderStylesPreview` value. |
| Border preview | `BorderStylesPreview` | Read-only; **not** a full box-shadow module field (those expect module attrs). |
| Section padding | `Spacing` | Incremental `onChange` payloads merged via `src/utils/merge-spacing.js`. |
| Corner radius | `BorderRadius` | Merged via `src/utils/merge-border-radius.js`. |
| Emphasis scale | `RangeContainer` | `%` unit demo. |
| Reading measure | `NumericInput` | `em` unit demo. |
| Custom tri-toggle | Local JSX | Plain React state. |

## Discovering more field types (three methods)

1. **Field library index** — In the Divi theme repo, open  
   `includes/builder-5/visual-builder/packages/field-library/src/components/index.ts`  
   for named exports and the `map` object passed through the `divi.fieldLibrary.components.map` filter.

2. **Runtime filter** — `addFilter('divi.fieldLibrary.components.map', ...)` to register or wrap field groups (same pattern core uses).

3. **Production shapes** — Inspect `module.json` files under  
   `includes/builder-5/visual-builder/packages/module-library/src/components/**/module.json`  
   for real `name` / `props` / `type` combinations (e.g. CTA module).

## Core references for comparison

- Modal layout primitives: `includes/builder-5/visual-builder/packages/modal/src/components/index.ts`
- Command center (info-style UI in core): `modal-library` command center component (search for `et-vb-info-box` in core if you need markup parity).
- Inspector-style search hook: `BodyPanelWrapper` / `useSettingsSearch` (re-exported from `@divi/modal`; implementation is tied to module/settings stores — this plugin uses **local filter state** on purpose so the example stays self-contained).

## Persistence

- **Hydration:** `divi_visual_builder_settings_data` (priority **20**) adds `modalFieldShowcaseSettings` merged from `currentPage.id` + `get_post_meta( ..., '_d5_modal_field_showcase_v1' )`.
- **Save:** Footer calls `useFetch` → `POST /divi/v1/modal-field-showcase-settings/update` with `{ postId, data }`. Capability: `edit_posts` on the route; callback also checks `edit_post` for that ID.
- **New unsaved posts:** No post ID yet → console warning; user should save the page once so meta can attach.

## `GroupContainer` / accordion behavior

`GroupContainer` reads open/closed state from **`modalWrapperContext`**, which `Wrapper` fills from the **`modalGroup`** prop. That object must stay in sync with **`select('divi/modal-library').getModal(modalName).group`**. If you omit it, title clicks still dispatch `openGroup`, but the UI keeps the default `{}`, so with **Group Settings Into Closed Toggles** enabled in preferences every group stays collapsed. This example passes `modalGroup` and sets **`modalActiveTab`** to the same id as **`PanelContainer`** (`d5-modal-field-showcase`).

## Build

```bash
cd modal-field-showcase
npm install
npm run build
```

Or from the plugin root: `npm run build` (builds all three examples if each folder has `node_modules`).
