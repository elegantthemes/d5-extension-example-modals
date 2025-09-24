# Testing the Divi Settings Integration

## What Was Implemented

### PHP Side (Complete ✅)
1. **Filter Registration**: Added `divi_visual_builder_settings_data` filter in the main plugin file
2. **Settings Function**: `d5_extension_example_modals_add_settings()` adds an empty array `d5ExtensionExampleModalsData`
3. **Script Enqueuing**: Added test script registration in the module visibility manager

### JavaScript Side (Complete ✅)
1. **Test Script**: Created `test-settings-access.js` that:
   - Accesses the Divi settings store
   - Logs the plugin data to console
   - Tests adding sample data
   - Provides manual testing functions

## How to Test

### Step 1: Activate the Plugin
1. Make sure the `D5 Extension Example: Modals` plugin is activated
2. Ensure you have Divi theme active with Divi 5 enabled

### Step 2: Open Divi Visual Builder
1. Edit any page/post with Divi 5 Visual Builder
2. Open the browser Developer Tools (F12)
3. Go to the Console tab

### Step 3: Check Console Output
You should see automatic console logs like:
```
D5 Extension Example Modals settings test script loaded
=== D5 Extension Example Modals - Settings Test ===
Plugin Data: []
Plugin Data Type: object
Plugin Data Length: 0
Our data key exists: true
✅ Successfully found our plugin data in Divi settings!
```

### Step 4: Manual Testing
You can also run these commands manually in the browser console:

```javascript
// Test access to the data
d5ExtensionTestSettings.testAccess()

// Test adding sample data
d5ExtensionTestSettings.testAddData()

// Direct access to the data
window.wp.data.select('divi/settings').getSetting('d5ExtensionExampleModalsData')

// Add your own test data
window.wp.data.dispatch('divi/settings').add('d5ExtensionExampleModalsData', [
    { nodeName: 'text', visible: true },
    { nodeName: 'image', visible: false }
])

// Check the data was added
window.wp.data.select('divi/settings').getSetting('d5ExtensionExampleModalsData')
```

## Expected Results

### ✅ Success Indicators:
- Console shows the test script loaded message
- `Our data key exists: true` appears in console
- You can access `d5ExtensionExampleModalsData` from the settings store
- Adding data works and persists during the session
- Data structure is an array that can contain objects like `{ nodeName: 'text', visible: true }`

### ❌ Failure Indicators:
- Console errors about missing stores or data
- `Our data key exists: false`
- Cannot access `d5ExtensionExampleModalsData`
- WordPress data package not available

## What This Proves

If the test is successful, it proves:

1. **PHP Integration Works**: The filter successfully adds data to Divi's settings
2. **JavaScript Access Works**: You can read data from `divi/settings` store
3. **Data Manipulation Works**: You can update the data and it persists in the store
4. **Architecture is Sound**: The foundation is ready for building the actual module visibility features

## Next Steps

Once this test passes, you can:

1. Replace the test script with your actual module visibility logic
2. Use the same pattern to store/retrieve which modules should be visible
3. Integrate this with your existing module filtering hooks
4. Build a UI to manage the visibility settings

## Troubleshooting

### If you see "WordPress data package not available"
- Make sure you're in the Divi 5 Visual Builder (not the WordPress admin or frontend)
- Check that `divi-data` dependency is loaded

### If you see "Divi settings store not available"
- Ensure `divi-settings` script is enqueued (it should be automatic in Divi 5)
- Try refreshing the Visual Builder

### If you see "Our data key exists: false"
- Check that the plugin is activated
- Verify the PHP filter is running (add a `wp_die()` temporarily in the function)
- Make sure you're testing in the Visual Builder, not regular admin pages
