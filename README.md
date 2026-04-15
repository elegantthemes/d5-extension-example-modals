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

### File Structure

```
d5-extension-example-modals/
├── d5-extension-example-modals.php
├── module-visibility-manager/   # Options API + custom store + module list modal
├── post-keyword-manager/        # Options API + Post Keyword modal + VB hooks
├── modal-field-showcase/        # Post meta + comprehensive modal UI (see README inside)
└── (each subfolder: package.json, webpack.config.js, src/, build/, styles/)
```

Deep dive for the third example: **`modal-field-showcase/README.md`** (issue checklist, field table, how to discover new field types in core).

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