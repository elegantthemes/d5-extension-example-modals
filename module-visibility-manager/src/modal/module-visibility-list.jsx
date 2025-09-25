import React from 'react';
import { useSelect, useDispatch, select } from '@divi/data';

import { useReactiveModuleFilter } from '../hooks';


/**
 * Module Visibility Manager Component
 * 
 * Provides a user interface for managing module visibility in the Divi 5 Visual Builder.
 * Users can toggle individual modules on/off, and changes are applied in real-time to
 * the Add Module dialog while being persisted to the Divi settings store.
 */
const ModuleVisibilityManager = () => {
  // Access Divi 5's built-in module library for available modules
  const allModules = useSelect(select => 
    select('divi/module-library')?.getModules() || {}, []
  );

  // Retrieve current module visibility settings from the store
  const moduleVisibilityData = useSelect(select => 
    select('divi/settings')?.getSetting('moduleVisibilitySettings', []), []
  );

  // Get settings store dispatcher for saving data
  const { add } = useDispatch('divi/settings');

  // Persist module visibility data to WordPress database via REST API
  const saveToDatabase = async (data) => {
    try {
      // Convert immutable data to plain JavaScript array
      const plainData = Array.isArray(data) ? data.map(item => ({
        nodeName: item.nodeName,
        visible: Boolean(item.visible)
      })) : [];
      
      const response = await fetch('/wp-json/divi/v1/module-visibility-settings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.wpApiSettings?.nonce || ''
        },
        body: JSON.stringify({ data: plainData })
      });
      
      // if (response.ok) {
      //   const result = await response.json();
      //   if (result && result.success) {
      //     console.log('✅ Data saved to database');
      //   }
      // }
    } catch (error) {
      console.error('❌ Save failed:', error);
    }
  };

  // Combined update: store + database persistence
  const updateDataWithPersistence = (newData) => {
    // 1. Update store immediately (for UI reactivity)
    add('moduleVisibilitySettings', newData);
    
    // 2. Save to database (debounced)
    clearTimeout(window.d5ExtensionSaveTimeout);
    window.d5ExtensionSaveTimeout = setTimeout(() => saveToDatabase(newData), 1000);
  };


  // Function to toggle module visibility
  const toggleModuleVisibility = (moduleName, currentlyVisible) => {
    const currentData = select('divi/settings').getSetting('moduleVisibilitySettings', []);
    
    // Find existing entry or create new one
    const existingIndex = currentData.findIndex(item => item.nodeName === moduleName);
    let updatedData;
    
    if (existingIndex >= 0) {
      // Update existing entry
      updatedData = [...currentData];
      updatedData[existingIndex] = { nodeName: moduleName, visible: !currentlyVisible };
    } else {
      // Add new entry
      updatedData = [...currentData, { nodeName: moduleName, visible: !currentlyVisible }];
    }
    
    updateDataWithPersistence(updatedData);
  };

  // Use our custom reactive hook - this automatically handles filter updates!
  const hiddenModules = useReactiveModuleFilter();

  // Process modules using Divi 5's built-in data - simple and straightforward
  const modules = Object.entries(allModules).map(([name, moduleConfig]) => {
    // Find visibility setting for this module
    const visibilitySetting = moduleVisibilityData.find(item => item.nodeName === name);
    const isVisible = visibilitySetting ? visibilitySetting.visible : true; // Default to visible
    
    return {
      name,
      title: moduleConfig?.title || name.replace('divi/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      isVisible
    };
  });


  const handleToggle = (moduleName) => {
    const module = modules.find(m => m.name === moduleName);
    const currentlyVisible = module?.isVisible ?? true; // Default to visible if not found
    
    // Toggle module visibility using the simplified approach
    toggleModuleVisibility(moduleName, currentlyVisible);
  };

  // No loading/error states needed - Divi 5 handles this for us

  return (
    <div>
      <h4>📋 Available Modules ({modules.length})</h4>
      
      {modules.length === 0 ? (
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          No modules discovered yet...
        </div>
      ) : (
        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {modules.map((module) => (
            <div key={module.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #eee'
            }}>
              <div>
                <strong>{module.title}</strong>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  {module.name}
                </div>
              </div>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input
                  type="checkbox"
                  checked={module.isVisible}
                  onChange={() => handleToggle(module.name)}
                  style={{ marginRight: '8px' }}
                />
              </label>
            </div>
          ))}
        </div>
      )}
      
      {/* Info panel */}
      <div style={{ 
        marginTop: '15px', 
        padding: '10px',
        background: '#f5f5f5',
        fontSize: '12px', 
        color: '#666',
        borderRadius: '4px'
      }}>
        <strong>Module Visibility Manager</strong><br />
        • Total modules: {modules.length}<br />
        • Hidden modules: {hiddenModules.length}<br />
        • Data entries: {moduleVisibilityData.length}<br />
        • Uses Divi 5 built-in module library (simplified)<br />
        • Changes apply instantly to Insert Module dialog<br />
        • Lightweight state management without complex effects
      </div>
      
      {/* Store Debug Info */}
      {hiddenModules.length > 0 && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px',
          background: '#e8f5e8',
          fontSize: '12px', 
          color: '#333',
          borderRadius: '4px',
          borderLeft: '4px solid #4caf50'
        }}>
          <strong>Hidden Modules Store:</strong><br />
          {hiddenModules.map((item, index) => (
            <div key={`hidden-${item.name}-${index}`}>• {item.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Main Component - Module Visibility Manager with Custom Store Integration
 * Shows module visibility manager with integrated custom store functionality
 * Uses reactive useSelect pattern for instant filter updates
 */
export const ModuleVisibilityList = () => {
  return (
    <div style={{ padding: '20px' }}>
      <ModuleVisibilityManager />
    </div>
  );
};