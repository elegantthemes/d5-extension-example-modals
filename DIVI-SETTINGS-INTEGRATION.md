# Divi 5 Settings Integration - Quick Start

Simple guide to integrate plugin data with Divi 5's `divi/settings` store.

## 1. Register Data (PHP Side)

```php
<?php
// In your plugin's main PHP file
add_filter( 'divi_visual_builder_settings_data', 'd5_extension_example_modals_add_settings' );

function d5_extension_example_modals_add_settings( $settings ) {
    // Load saved data from database (or empty array for first time)
    $saved_data = get_option('d5_extension_example_modals_data', []);
    
    $settings['d5ExtensionExampleModalsData'] = $saved_data;
    return $settings;
}
```

## 2. Access & Update Data (JavaScript Side)

```javascript
import { useSelect, useDispatch } from '@divi/data';

const MyComponent = () => {
    // Get data from divi/settings store
    const pluginData = useSelect((select) => 
        select('divi/settings')?.getSetting('d5ExtensionExampleModalsData', []), 
        []
    );
    
    const { add } = useDispatch('divi/settings');
    
    // Update data in store
    const updateData = (newData) => {
        add('d5ExtensionExampleModalsData', newData);
    };
    
    // Example: Add entry
    const addEntry = () => {
        const newEntry = { nodeName: `module_${Date.now()}`, visible: true };
        updateData([...pluginData, newEntry]);
    };
    
    return (
        <div>
            <button onClick={addEntry}>Add Entry</button>
            <p>Total entries: {pluginData.length}</p>
        </div>
    );
};
```

## 3. Persist to Database (Optional - for permanent storage)

### PHP: Create REST Endpoint

```php
<?php
// Register REST endpoint
add_action('rest_api_init', 'd5_extension_register_rest_routes');

function d5_extension_register_rest_routes() {
    register_rest_route('divi/v1', '/d5-extension-data/update', [
        'methods'             => 'POST',
        'callback'            => 'd5_extension_save_data',
        'permission_callback' => function() { return current_user_can('edit_posts'); },
        'args'                => [
            'data' => ['required' => true],
        ],
    ]);
}

function d5_extension_save_data($request) {
    $data = $request->get_param('data');
    update_option('d5_extension_example_modals_data', $data);
    
    return new WP_REST_Response(['success' => true], 200);
}
```

### JavaScript: Auto-save to Database

```javascript
import { loggedFetch } from '@divi/rest';

// Auto-save function (using D5's logged fetch pattern)
const saveToDatabase = async (data) => {
    try {
        await loggedFetch({
            method: 'POST',
            restRoute: '/divi/v1/d5-extension-data/update',
            body: { data },
        });
        console.log('✅ Saved to database');
    } catch (error) {
        console.error('❌ Save failed:', error);
    }
};

// Combined update: store + database
const updateDataWithPersistence = (newData) => {
    // 1. Update store immediately
    add('d5ExtensionExampleModalsData', newData);
    
    // 2. Save to database (debounced)
    clearTimeout(window.saveTimeout);
    window.saveTimeout = setTimeout(() => saveToDatabase(newData), 1000);
};
```

## Summary

1. **PHP**: Register data via `divi_visual_builder_settings_data` filter
2. **JS**: Access with `useSelect('divi/settings')` and update with `dispatch('divi/settings').add()`
3. **Optional**: Add REST endpoint for database persistence using `@divi/rest`

Data flows: PHP → `window.DiviSettingsData` → `divi/settings` store → React components

**Note**: Without step 3, data is lost on page reload. Add persistence only when needed.