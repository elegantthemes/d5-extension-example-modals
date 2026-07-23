# D5 Extension Example: Custom Modals

An **educational tutorial repository** that teaches developers how to create custom modals for Divi 5 Visual Builder. Learn through hands-on examples, complete code implementations, and step-by-step guidance for building professional modal-based extensions.

## 🎯 **What You'll Learn**

### ✅ **Modal Architecture Fundamentals**

* **How to structure** modal components with WrapperContainer, Header, and Body
* **Implementing drag, resize, expand, and snap** capabilities for professional UX
* **Error handling patterns** with ErrorBoundary integration

### ✅ **Redux Store Integration Techniques**

* **Creating custom Redux stores** that integrate seamlessly with Divi 5
* **Building reactive data patterns** using useSelect and useEffect hooks
* **Implementing persistent storage** with app preferences and fallback strategies
* **Managing real-time UI updates** without performance issues

### ✅ **Advanced WordPress Integration**

* **WordPress hooks mastery**: How to use `divi.modalLibrary.addModule.moduleList`
* **Plugin architecture patterns** for maintainable third-party extensions
* **Module filtering systems** that work with Divi's Insert Module dialog
* **Effects patterns** for data persistence without complex middleware

### ✅ **Professional Development Workflow**

* **Modern build processes** with webpack and proper external dependencies
* **PHP-JavaScript integration** following WordPress and Divi standards
* **Development-to-production** optimization strategies
* **Testing and debugging** techniques for modal-based extensions

## 🚀 **Get Started Learning**

### Tutorial Setup

1. **Clone this educational repository** to your local WordPress development environment
2. **Install dependencies** (each example has its own `package.json` and `node_modules`):
   - **All at once (recommended):** from the plugin root run `npm run install:all`.
   - **Or only what you need:** `cd` into `module-visibility-manager/`, `post-keyword-manager/`, or `modal-field-showcase/` and run `npm install` there.
3. **Build** from the plugin root:
   - **All examples:** `npm run build` (stops if any package fails).
   - **One example only** (avoids other packages’ errors blocking you):  
     `npm run build:module-visibility` · `npm run build:post-keyword` · `npm run build:modal-field-showcase`  
     Development builds: `npm run build:dev:module-visibility` (same pattern for the other two).
4. **Activate** in WordPress Admin → Plugins to see it in action

### Explore the Working Examples

1. **Open Divi Visual Builder** on a **saved** post (post ID required for the showcase meta example)
2. **Builder toolbar buttons** (examples):
   - **Module Visibility** — options-based persistence, module list
   - **Post Keywords** — options-based persistence, content hooks demo
   - **Field showcase** — tabs, search, footer save/discard, field-library samples, **post meta** persistence
3. **Click a button** to open the corresponding modal

#### What You'll Experience:

1. **Live module discovery** - See how the code dynamically finds all available modules
2. **Interactive controls** - Toggle module visibility and watch real-time updates
3. **Persistent state** - Learn how data survives page refreshes
4. **Professional UI** - Study the modal structure and user experience patterns

## 🏗️ **Tutorial Deep Dive**

### File structure

```
d5-extension-example-modals/
├── d5-extension-example-modals.php   # Loads examples, REST, divi_visual_builder_settings_data
├── package.json                      # Root: gulp zip + install/build orchestration for all three
├── module-visibility-manager/        # Example 1 — see README inside for tree
├── post-keyword-manager/             # Example 2 — see README inside for tree
└── modal-field-showcase/             # Example 3 — see README inside for tree
```

Each example folder is an **independent** npm package (`package.json`, `webpack.config.js`, `src/`, `build/`, optional `styles/`). **Per-folder READMEs** describe sources, outputs, and how that example differs from the others:

- **`module-visibility-manager/README.md`**
- **`post-keyword-manager/README.md`** (long-form hook tutorial + layout above the fold)
- **`modal-field-showcase/README.md`** (field showcase + layout + issue checklist)

### Learning Checkpoints - Study These Components

#### 1. **Custom Redux Store** (`custom-store.js`)

```javascript
const store = createReduxStore('divi/custom-test', {
  reducer: customReducer,
  actions: customActions,
  selectors: customSelectors,
});
```

#### 2. **Reactive Hook** (`use-reactive-module-filter.js`)

```javascript
export const useReactiveModuleFilter = () => {
  return useSelect(select => {
    return select('divi/custom-test').getItems();
  }, []);
};
```

#### 3. **Modal Component** (`component.jsx`)

```javascript
export const ModuleVisibilityManagerModal = (props) => (
  <ErrorBoundary>
    <WrapperContainer draggable resizable expandable snappable>
      <Header name={__('Module Visibility Manager', 'et_builder')} />
      <BodyContainer>
        <PanelContainer id="module-visibility-manager" opened>
          <ModuleVisibilityList />
        </PanelContainer>
      </BodyContainer>
    </WrapperContainer>
  </ErrorBoundary>
);
```

## 🎨 **Customization Examples**

### Adding Your Own Store

```javascript
// Create custom store
const myStore = createReduxStore('my-plugin/data', {
  reducer: myReducer,
  actions: myActions,
  selectors: mySelectors,
});

// Register with WordPress
register(myStore);
```

### Custom Modal Integration

```javascript
// Register your modal
addFilter('divi.modalLibrary.modalMapping', 'my-plugin', modals => ({
  ...modals,
  myCustomModal: MyModalComponent,
}));
```

### Module Filtering

```javascript
// Add module filter
addFilter('divi.modalLibrary.addModule.moduleList', 'my-plugin', 
  (modules) => modules.filter(module => myFilterLogic(module))
);
```

## 🔧 **Development Guidelines**

### Best Practices

1. **Always use ErrorBoundary** to prevent modal crashes
2. **Implement reactive patterns** with useSelect and useEffect
3. **Use proper Redux patterns** for state management
4. **Handle empty states gracefully** with helpful messaging
5. **Test with real data** in Visual Builder environment

### Common Patterns

* **Store Registration**: Use `register()` after store creation
* **Reactive Updates**: Use `useSelect` for automatic re-renders
* **Filter Integration**: Use WordPress hooks for module filtering
* **Persistent Storage**: Combine app preferences with localStorage fallback

### Build Process

Root scripts orchestrate installs and builds. Each example still has its **own** `node_modules` (no npm workspaces), so installs stay isolated and webpack configs do not fight over hoisting.

```bash
# Install dependencies in all three packages (one command from root)
npm run install:all

# Production build — all three (fails fast: first error stops the chain)
npm run build

# Production build — one package only
npm run build:module-visibility
npm run build:post-keyword
npm run build:modal-field-showcase

# Development builds — all three or one at a time
npm run build:dev
npm run build:dev:modal-field-showcase

# Watch mode (module-visibility only — use per-folder npm run start for others)
npm run start

# Create distribution package
npm run zip
```

**Note:** You can always `cd` into one example folder and run `npm install` / `npm run build` there; root scripts are a convenience wrapper around `npm --prefix <folder>`.

#### Future Architecture Recommendation

For better scalability when adding more modals, consider this structure:

```
d5-extension-example-modals/
├── package.json (with all build commands)
├── webpack.config.js (root-level build config)
├── src/
│   ├── module-visibility-manager/
│   │   ├── component.jsx
│   │   └── ...
│   └── future-modal/
│       ├── component.jsx
│       └── ...
└── build/
    ├── module-visibility-manager/
    └── future-modal/
```

This would allow:
- Single `npm run start` and `npm run build` commands from root
- Centralized build configuration
- Easier addition of new modals
- Consistent development workflow

#### Create Distribution Package

To create a distribution-ready zip file of the plugin:

```bash
npm run zip
```

This command will:
- Create a `d5-extension-example-modals.zip` file
- Exclude development files (`node_modules/`, `src/`, `.git/`, etc.)
- Include only production-ready plugin files
- Ready for distribution or installation

#### File Exclusions

The zip command automatically excludes:
- Development dependencies (`node_modules/`)
- Source files (`src/`)
- Git files (`.git/`, `.gitignore`)
- Build configuration files (`gulpfile.js`, `package.json`, etc.)
- IDE and system files (`.vscode/`, `.DS_Store`, etc.)

## Tests

The `test-config` folder holds shared Jest + React Testing Library configuration for JavaScript tests. Package tests live in each example’s `src/__tests__` folder. PHP unit tests use PHPUnit from the plugin root when the Track C harness (EX-06+) is merged.

### Local test prerequisites

Tests run locally against your WordPress and Divi installs. Set the following environment variables before running Jest tests that load Divi packages:

```bash
export DIVI_PATH=/absolute/path/to/wp-content/themes/Divi
export DIVIDIR=$DIVI_PATH/includes/builder-5/visual-builder/build
export WPDIR=/absolute/path/to/wordpress/root/folder
```

For PHP tests, copy `tests/php/.env.example` to `tests/php/.env` and update the database and WordPress paths for your environment.

Build assets before running tests:

```bash
npm run install:all
npm run build
composer install   # when composer.json is present (Track C harness)
npm test           # when root test scripts are present (Track C harness)
composer test      # when phpunit.xml is present (Track C harness)
```

### Manual VB testing

Track C **L3** documentation for flows automated tests do not cover: live Visual Builder integration, save/reload persistence, drag-and-resize modal chrome, and real Add Module / REST behavior inside WordPress + Divi. Each example below lists **capabilities you can test** manually in the Visual Builder.

#### Prerequisites

- Local WordPress with **Divi 5** active.
- This plugin cloned or symlinked into `wp-content/plugins/d5-extension-example-modals`.
- A **saved post or page** when testing **modal-field-showcase** (post meta persistence requires a post ID).

#### Build and activate

Run these commands from the plugin root before opening the Visual Builder:

```bash
npm run install:all
npm run build
```

Then in WordPress admin:

1. Go to **Plugins**.
2. Activate **D5 Extension Example: Modals**.
3. Create or open a test page, **save it once** (required for field showcase meta), and launch the **Visual Builder**.

#### Module Visibility (`divi/module-visibility-manager`)

Toolbar button in the Visual Builder. Settings persist in `wp_options` as `divi_module_visibility_settings`.

**What you can do:**

- Open the **Module Visibility** modal from the builder toolbar
- Browse all available modules in a checkbox list (for example **Blurb**, `divi/blurb`)
- Hide modules from the **Add Module** dialog by unchecking them — updates instantly, no page reload
- Show modules again by re-checking them — they return to **Add Module** right away
- Keep your visibility choices after reloading the Visual Builder or refreshing the browser
- Move and arrange the modal — drag, resize, expand, and snap it like other Divi modals

#### Post Keywords (`divi/post-keyword-manager`)

Toolbar button in the Visual Builder. Focus keyword persists in `wp_options` as `divi_post_keyword_settings`.

**What you can do:**

- Open the **Post Keywords** modal from the builder toolbar
- Review **Post Information** for the current page title, ID, type, and status
- Enter and edit a focus keyword — it saves automatically to the database as you type
- Reload the Visual Builder and confirm the keyword is still present
- Save the page and review keyword-density analysis output in the browser console (hook demo)

#### Field showcase (`divi/modal-field-showcase`)

Toolbar button in the Visual Builder. Settings persist in post meta `_d5_modal_field_showcase_v1` via REST. **Requires a saved post.**

**What you can do:**

- Open the **Field showcase** modal on a **saved** post (not a brand-new unsaved layout)
- Switch between **Content & labels** and **Appearance tokens** tabs
- Filter field groups with the search bar (for example, type `accent` to narrow the list)
- Edit fields locally, then click **Discard changes** to revert to the last saved state
- Edit fields and click **Save to post** to persist settings to post meta
- Reload the Visual Builder and confirm saved values are still shown in the modal
- Move and arrange the modal — drag, resize, expand, and snap it like other Divi modals

#### Related automated tests

| Package | Automated coverage |
|---------|-------------------|
| module-visibility-manager | Store selector + `moduleList` hook integration; modal shell snapshot; PHP bootstrap and settings hydration |
| post-keyword-manager | Keyword settings helpers; modal shell snapshot; PHP REST route and sanitize |
| modal-field-showcase | Field defaults, merge utils, `groupVisible`; showcase body snapshot; PHP REST and post-meta hydration |

Run `composer test` and `npm test` after `npm run build` for automated L1/L2 coverage when the Track C harness is available.

## 🐛 **Troubleshooting**

### Modal Doesn't Appear

* Check that plugin is activated
* Verify build completed successfully
* Check browser console for JavaScript errors

### Store Connection Issues

* Ensure store is registered before modal opens
* Check Redux DevTools for store state
* Verify useSelect dependencies are correct

### Module Filtering Not Working

* Check filter hook registration timing
* Verify filter function returns valid array
* Test with browser console logging

## 📚 **Related Documentation**

* **Divi 5 Modal Components**: [GitHub Repository](https://github.com/elegantthemes/d5-extension-example-modal-dev-clipboard)
* **Redux Store Architecture**: WordPress data module patterns
* **WordPress Hooks API**: Filter and action integration

## 🎯 **Current Status**

This implementation provides a working foundation for custom modal development with:

* ✅ **Complete modal structure** with proper Divi 5 integration
* ✅ **Custom Redux store** with reactive patterns
* ✅ **Module filtering system** with WordPress hooks
* ✅ **Persistent data storage** across sessions
* ✅ **Professional build process** for development and production

## 🔮 **Next Steps**

This example provides a **solid foundation**. For enhanced features:

1. **Server-side persistence** 🔜 **Coming Soon**: Replace localStorage with WordPress options/user meta
2. **Advanced UI features** 🔜 **Coming Soon**: Add search, categories, bulk operations
3. ✅ **Enhanced error handling**: Comprehensive validation and user feedback
4. ✅ **Performance optimization**: Lazy loading and caching strategies

---

**A working example** of custom modal integration with Divi 5 Visual Builder demonstrating store patterns, reactive filtering, and professional development practices.