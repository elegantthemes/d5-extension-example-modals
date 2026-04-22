# Module Visibility Manager (Divi 5 example)

First example in **D5 Extension Example: Modals**. It shows a **builder bar button**, a modal that edits **`moduleVisibilitySettings` on `divi/settings`**, and a **`divi.modalLibrary.addModule.moduleList`** filter so hidden modules disappear from the Add Module dialog. Settings persist in **`wp_options`** via REST (same pattern as the parent plugin’s other option-based examples).

## Package layout

This folder is its **own webpack package** (local `package.json` + `node_modules`). The parent plugin loads `d5-extension-example-modal-module-visibility.php` from the root `d5-extension-example-modals.php` file.

```
module-visibility-manager/
├── d5-extension-example-modal-module-visibility.php   # Registers VB scripts (PackageBuildManager)
├── package.json
├── webpack.config.js
├── build/                         # Webpack output (run `npm run build` here or from plugin root)
│   ├── bundle.js                  # Modal + modal map + icons
│   └── add-bar-builder-buttons.js # Thin entry: registerBuilderBarButton
└── src/
    ├── index.jsx                  # divi.modalLibrary.modalMapping → ModuleVisibilityManagerModal
    ├── add-bar-builder-buttons.js # Opens/closes modal from the bar
    ├── hooks/
    │   ├── index.js
    │   └── use-reactive-module-filter.js   # useSelect against divi/module library data
    ├── icons/
    │   ├── index.js
    │   ├── registerIcons.js       # divi.iconLibrary.icon.map
    │   └── module-visibility/     # SVG name + component for the bar
    └── modal/
        ├── component.jsx          # WrapperContainer, Header, BodyContainer, PanelContainer
        └── module-visibility-list.jsx
```

There is **no** `styles/` folder here; styling relies on Divi modal chrome and list markup classes.

## Build and run

From this folder:

```bash
npm install
npm run build
```

From the **plugin root** (after `npm run install:all` or installing here):

```bash
npm run build:module-visibility
```

See the root **`../README.md`** for full-plugin setup and learning goals.
