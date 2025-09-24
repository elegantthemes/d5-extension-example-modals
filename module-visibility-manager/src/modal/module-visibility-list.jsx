import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch, select } from '@divi/data';

import { useReactiveModuleFilter } from '../hooks';


/**
 * Module Visibility Manager Component
 * Component to test module discovery and visibility management
 * Now uses reactive useSelect pattern for instant filter updates
 */
const ModuleVisibilityManager = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Test divi/settings access
  const pluginData = useSelect((select) => {
    const data = select('divi/settings')?.getSetting('d5ExtensionExampleModalsData', []);
    console.log('Plugin data from divi/settings:', data);
    return data;
  }, []);

  // Get dispatch to add new data
  const { add } = useDispatch('divi/settings');

  // Auto-save function using regular fetch with WordPress REST API
  const saveToDatabase = async (data) => {
    try {
      // Convert immutable data to plain JavaScript array
      const plainData = Array.isArray(data) ? data.map(item => ({
        nodeName: item.nodeName,
        visible: Boolean(item.visible)
      })) : [];
      
      const response = await fetch('/wp-json/divi/v1/d5-extension-data/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.wpApiSettings?.nonce || ''
        },
        body: JSON.stringify({ data: plainData })
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result && result.success) {
          console.log('✅ Data saved to database');
        }
      }
    } catch (error) {
      console.error('❌ Save failed:', error);
    }
  };

  // Combined update: store + database persistence
  const updateDataWithPersistence = (newData) => {
    // 1. Update store immediately (for UI reactivity)
    add('d5ExtensionExampleModalsData', newData);
    
    // 2. Save to database (debounced)
    clearTimeout(window.d5ExtensionSaveTimeout);
    window.d5ExtensionSaveTimeout = setTimeout(() => saveToDatabase(newData), 1000);
  };

  // Function to add a dummy entry (now with persistence)
  const addDummyEntry = () => {
    const currentData = select('divi/settings').getSetting('d5ExtensionExampleModalsData', []);
    const newEntry = { nodeName: `module_${Date.now()}`, visible: Math.random() > 0.5 };
    const updatedData = [...currentData, newEntry];
    
    updateDataWithPersistence(updatedData);
  };

  // Use our custom reactive hook - this automatically handles filter updates!
  const hiddenModules = useReactiveModuleFilter();

  // Get additional store data
  const { itemsCount, storeIsLoading } = useSelect(select => {
    const customStore = select('divi/custom-test');
    return {
      itemsCount: customStore?.getItemsCount() || 0,
      storeIsLoading: customStore?.isLoading() || false,
    };
  }, []);

  // Get dispatch actions
  const { addItem, removeItem } = useDispatch('divi/custom-test') || {};

  // Discover modules once on mount
  useEffect(() => {
    const discoverModules = () => {
      // Clear any previous errors
      setError(null);
      
      // Check for essential dependencies first
      if (!select) {
        setError('Divi data select function not available');
        setIsLoading(false);
        return;
      }
      
      try {
        const moduleLibraryStore = select('divi/module-library');
        
        if (!moduleLibraryStore) {
          setError('Module library store not available');
          setIsLoading(false);
          return;
        }
        
        if (!moduleLibraryStore.getModules || typeof moduleLibraryStore.getModules !== 'function') {
          setError('Module library getModules method not available');
          setIsLoading(false);
          return;
        }
        
        const allModules = moduleLibraryStore.getModules();
            
            // Transform modules to our format
            const moduleList = Object.entries(allModules || {}).map(([name, config]) => {
              let title = name;
              let category = 'unknown';
              
              // Use if-else for anticipated checks instead of expensive try-catch
              if (moduleLibraryStore.getModuleTitle && typeof moduleLibraryStore.getModuleTitle === 'function') {
                const moduleTitle = moduleLibraryStore.getModuleTitle(name);
                if (moduleTitle && typeof moduleTitle === 'string') {
                  title = moduleTitle;
                }
              }
              
              if (moduleLibraryStore.getModuleCategory && typeof moduleLibraryStore.getModuleCategory === 'function') {
                const moduleCategory = moduleLibraryStore.getModuleCategory(name);
                if (moduleCategory && typeof moduleCategory === 'string') {
                  category = moduleCategory;
                }
              }
              
              return {
                name,
                title,
                category,
                isVisible: true, // Default all to visible
              };
            });

            setModules(moduleList);
            setIsLoading(false);
      } catch (err) {
        // Handle unexpected errors only (store access issues, etc.)
        const errorMessage = err?.message || 'Unexpected error occurred while discovering modules';
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    discoverModules();
  }, []); // Only run once on mount

  // Update visibility based on hidden modules (separate effect)
  useEffect(() => {
    const hiddenModuleNames = new Set(hiddenModules.map(item => item.name));
    
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        isVisible: !hiddenModuleNames.has(module.name)
      }))
    );
  }, [hiddenModules]); // Update visibility when hiddenModules changes

  const handleToggle = (moduleName) => {
    const module = modules.find(m => m.name === moduleName);
    const newVisibility = !module?.isVisible;
    
    // Add dummy entry to divi/settings when toggling
    addDummyEntry();
    
    if (newVisibility) {
      // Module is being checked (made visible) - remove from hidden list
      const hiddenModule = hiddenModules.find(item => item.name === moduleName);
      if (hiddenModule && removeItem) {
        removeItem(hiddenModule.id);
      }
    } else {
      // Module is being unchecked (made hidden) - add to hidden list
      if (addItem) {
        const newHiddenModule = {
          id: Date.now(),
          name: moduleName,
          created: new Date().toLocaleTimeString()
        };
        addItem(newHiddenModule);
      }
    }
    
    // Update local state immediately for better UX
    setModules(prevModules => 
      prevModules.map(m => 
        m.name === moduleName 
          ? { ...m, isVisible: newVisibility }
          : m
      )
    );
  };

  if (isLoading || storeIsLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>
          {storeIsLoading ? 'Loading preferences...' : 'Loading modules...'}
        </div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
          {storeIsLoading && 'Waiting for Divi app-preferences store...'}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red', padding: '20px' }}>
        <div>Error loading modules: {error}</div>
      </div>
    );
  }

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
                  {module.name} • {module.category}
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
        • Hidden modules: {itemsCount}<br />
        • Store status: {storeIsLoading ? 'Loading preferences...' : 'Ready'}<br />
        • Changes apply instantly to Insert Module dialog<br />
        • Uses Divi 5 adminBar.moduleVisibility persistence<br />
        • Filter automatically re-registers when store changes
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
          {hiddenModules.map(item => (
            <div key={item.id}>• {item.name} (added: {item.created})</div>
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