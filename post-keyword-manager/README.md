# D5 Extension Example: Post Keyword Manager

An **educational example** demonstrating how to integrate with the `et.builder.content.change` hook in Divi 5 Visual Builder. This example shows third-party developers how to receive real-time content updates and manage post metadata.

## 🎯 **What You'll Learn**

### ✅ **Hook Integration**

* **How to listen** to the `et.builder.content.change` hook
* **When the hook fires** (after save operations: draft, publish, preview)
* **What data you receive** (rendered HTML content + post metadata)
* **How to process** the rendered content for analysis

### ✅ **Redux Store Patterns**

* **Creating custom Redux stores** that integrate with Divi 5
* **Implementing the effects pattern** for data persistence
* **Using app preferences** and localStorage for state management
* **Following best practices** for selectors and actions

### ✅ **Modal Development**

* **Building custom modals** with proper structure and error handling
* **Integrating with toolbar buttons** for easy access
* **Creating reactive UI** that updates when data changes
* **Following Divi's modal patterns** for consistency

### ✅ **WordPress Integration**

* **Using WordPress hooks** (`@wordpress/hooks`) for extensibility
* **Internationalization** with `@wordpress/i18n`
* **PHP integration** for script enqueuing and post meta
* **Following WordPress coding standards**

## 🚀 **Get Started**

### Installation

1. **Ensure prerequisites** are met:
   - WordPress with Divi theme installed
   - Divi 5 Visual Builder enabled
   - Node.js 20+ installed

2. **Install dependencies**:
   ```bash
   cd post-keyword-manager
   yarn install
   ```

3. **Build the plugin**:
   ```bash
   yarn build
   ```

4. **Activate** the parent plugin (`D5 Extension Example: Modals`) in WordPress Admin → Plugins

### Development Workflow

```bash
# Watch mode for development
yarn start

# Production build
yarn build

# Development build (with source maps)
yarn build:dev
```

## 📚 **How the et.builder.content.change Hook Works**

### Hook Overview

The `et.builder.content.change` hook is specifically designed for third-party plugins that need to analyze or process the rendered output of the Visual Builder.

**Location**: `visual-builder/packages/rest/src/store/effects/sync-to-server/index.ts`

**When it fires**:
- After successful save operations (draft, publish, preview)
- Only if at least one listener is registered (performance optimization)

**What you receive**:
```javascript
addAction('et.builder.content.change', 'your-namespace', (renderedContent, postData) => {
  // renderedContent: string - The fully rendered HTML
  // postData: object - Contains postId and other metadata
});
```

### Performance Optimization

The Visual Builder checks for listeners before requesting rendered content:

```typescript
const returnRenderedContent = hasAction('et.builder.content.change');
```

This means the server only generates rendered content when it's actually needed, improving performance for users who don't have SEO or content analysis plugins active.

### Use Cases

This hook is perfect for:
- **SEO analysis** (like Yoast SEO or Rank Math)
- **Content validation** and quality checks
- **Word count** and readability analysis
- **Accessibility checking**
- **Custom content indexing**
- **Content compliance** verification

## 🏗️ **Code Structure**

### File Organization

```
post-keyword-manager/
├── d5-extension-example-modal-post-keyword.php  # PHP integration
├── package.json                                 # Dependencies
├── webpack.config.js                            # Build configuration
├── README.md                                    # This file
└── src/
    ├── index.jsx                                # Main entry: modal + hook registration
    ├── add-toolbar-button.js                    # Toolbar button registration
    ├── custom-store.js                          # Redux store with effects
    ├── hooks/
    │   ├── index.js                             # Hooks barrel export
    │   └── use-keyword-data.js                  # Custom hook for store data
    ├── icons/
    │   ├── index.js                             # Icons barrel export
    │   ├── post-keyword/
    │   │   └── index.jsx                        # Icon component
    │   └── registerIcons.js                     # Icon registration
    └── modal/
        ├── component.jsx                        # Modal structure
        └── keyword-form.jsx                     # Form with keyword input
```

### Key Files Explained

#### `src/index.jsx` - Main Entry Point

This is where everything comes together:

```javascript
// Register the custom Redux store
addAction('divi.moduleLibrary.registerModuleLibraryStore.after', 'namespace', () => {
  registerCustomStore();
});

// Register the modal
addFilter('divi.modalLibrary.modalMapping', 'namespace', modals => {
  modals.YourModal = {
    name: 'divi/your-modal',
    label: 'Your Modal',
    type: 'multiInstanceModal',
    component: YourModalComponent,
  };
  return modals;
});

// Listen to the hook
addAction('et.builder.content.change', 'namespace', (renderedContent, postData) => {
  // Process the content
  // Update your store
});
```

#### `src/custom-store.js` - Redux Store

Implements the complete Redux pattern:

- **Actions**: Pure functions that return action objects
- **Reducer**: Handles state updates immutably
- **Selectors**: Extract data from state
- **Effects**: Handle side effects (persistence)
- **Initial State**: Load from storage

```javascript
const store = registerStore('divi/your-store', {
  actions,
  reducer,
  selectors,
  initialState,
});

// Apply effects pattern
store.dispatch = (action) => {
  const result = originalDispatch(action);
  if (effects[action.type]) {
    effects[action.type](action, store);
  }
  return result;
};
```

#### `src/modal/keyword-form.jsx` - React Component

Demonstrates proper data flow:

```javascript
// Read data from stores (raw data only)
const keyword = useSelect(s => s('divi/your-store').getKeyword(), []);

// Get dispatch functions
const { setKeyword } = useDispatch('divi/your-store');

// Handle user input
const handleChange = (event) => {
  setKeyword(event.target.value);
};
```

## 🔧 **Extending This Example**

### Adding More Analysis

```javascript
addAction('et.builder.content.change', 'your-plugin', (renderedContent, postData) => {
  // Extract text
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = renderedContent;
  const text = tempDiv.textContent;
  
  // Your custom analysis
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed
  const sentenceCount = text.split(/[.!?]+/).length;
  
  // Update your store
  dispatch('your-store').updateAnalysis({
    wordCount,
    readingTime,
    sentenceCount,
  });
});
```

### Saving to WordPress

```php
// In your PHP file
add_action('divi_visual_builder_rest_update_post', 'your_save_function');

function your_save_function($post_id) {
  // Verify nonce
  // Check capabilities
  // Sanitize input
  // Save to post meta
  update_post_meta($post_id, '_your_meta_key', $value);
}
```

### Adding More UI Elements

```jsx
// In your modal component
<div>
  <h3>SEO Score</h3>
  <ProgressBar value={seoScore} />
  
  <h3>Readability</h3>
  <ReadabilityIndicator level={readabilityLevel} />
  
  <h3>Keyword Density</h3>
  <KeywordDensityChart data={densityData} />
</div>
```

## 📋 **Testing Checklist**

### Hook Integration
- [ ] Hook fires when saving draft
- [ ] Hook fires when publishing
- [ ] Hook fires when previewing
- [ ] Rendered content is received correctly
- [ ] Post ID is available in postData

### UI Functionality
- [ ] Toolbar button appears
- [ ] Modal opens/closes correctly
- [ ] Modal is draggable
- [ ] Modal is resizable
- [ ] Data displays correctly

### Data Persistence
- [ ] Keyword saves to localStorage
- [ ] Keyword persists after page reload
- [ ] Word count updates after save
- [ ] No console errors

### Build Process
- [ ] `yarn install` completes
- [ ] `yarn build` creates bundle
- [ ] Bundle loads without errors
- [ ] No webpack warnings

## 🐛 **Troubleshooting**

### Hook Not Firing

**Problem**: The `et.builder.content.change` hook doesn't fire.

**Solutions**:
1. Check that you're saving the page (draft/publish/preview)
2. Verify the hook listener is registered correctly
3. Check browser console for errors
4. Ensure the plugin is activated

### Modal Not Opening

**Problem**: Clicking the toolbar button doesn't open the modal.

**Solutions**:
1. Check that the modal is registered correctly
2. Verify the modal name matches in all places
3. Check browser console for errors
4. Ensure the bundle loaded successfully

### Store Data Not Persisting

**Problem**: Data doesn't persist after page reload.

**Solutions**:
1. Check browser console for localStorage errors
2. Verify effects are running (check console logs)
3. Test in incognito mode (no localStorage restrictions)
4. Check app preferences integration

### Build Errors

**Problem**: Webpack build fails.

**Solutions**:
1. Delete `node_modules` and run `yarn install` again
2. Check Node.js version (should be 20+)
3. Verify webpack.config.js is correct
4. Check for syntax errors in source files

## 📖 **Additional Resources**

### Divi Documentation
- [Divi 5 Visual Builder Documentation](https://github.com/elegantthemes/Divi/tree/master/includes/builder-5/docs)
- [Modal Library Guide](https://github.com/elegantthemes/Divi/tree/master/includes/builder-5/docs/manual/packages/modal)
- [Redux Store Patterns](https://github.com/elegantthemes/Divi/tree/master/includes/builder-5/docs/manual/packages/data)

### WordPress Resources
- [@wordpress/hooks Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)
- [@wordpress/i18n Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)

### React Resources
- [React Hooks Documentation](https://react.dev/reference/react)
- [React Best Practices](https://react.dev/learn)

## 🎓 **Learning Path**

1. **Start Here**: Read this README thoroughly
2. **Explore the Code**: Open each file and read the comments
3. **Check the Console**: See the detailed logging in action
4. **Modify the Example**: Try adding new features
5. **Build Your Own**: Create your own modal and hook integration

## 💡 **Best Practices**

### Code Quality
- ✅ Use extensive comments for educational purposes
- ✅ Follow Divi coding standards
- ✅ Add console logging for debugging (remove in production)
- ✅ Handle errors gracefully with ErrorBoundary
- ✅ Validate and sanitize all user input

### Performance
- ✅ Don't transform data inside `useSelect`
- ✅ Use proper dependency arrays
- ✅ Memoize expensive calculations
- ✅ Only request rendered content when needed

### User Experience
- ✅ Provide clear feedback for user actions
- ✅ Use loading states for async operations
- ✅ Handle empty states gracefully
- ✅ Make UI responsive and accessible

## 📝 **License**

GPL2 - Same as WordPress and Divi

## 🤝 **Contributing**

This is an educational example. Feel free to:
- Use it as a template for your own plugins
- Modify it to suit your needs
- Share it with other developers
- Provide feedback for improvements

---

**Happy Coding!** 🚀

For questions or issues, refer to the Divi documentation or community forums.

