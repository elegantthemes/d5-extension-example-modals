import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from '@divi/data';

// Apply module visibility filter using the Divi 5 pattern
if (typeof window !== 'undefined' && window.vendor && window.vendor.wp && window.vendor.wp.hooks) {
  window.vendor.wp.hooks.addFilter(
    'divi.moduleLibrary.moduleMapping',
    'moduleVisibilityManager',
    (moduleMapping) => {
      // Example: Hide the audio module
      // In a full implementation, this would be dynamic based on user settings
      const filteredMapping = { ...moduleMapping };
      delete filteredMapping['divi/audio'];
      
      return filteredMapping;
    },
    10 // Priority
  );
}


/**
 * Module Visibility Manager Component
 * Component to test module discovery and visibility management
 * Now integrated with custom store for persistence
 */
const ModuleVisibilityManager = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get data from custom store for hidden modules
  const { items: hiddenModules, itemsCount } = useSelect(select => {
    const customStore = select('divi/custom-test');
    if (!customStore) {
      return { items: [], itemsCount: 0 };
    }
    return {
      items: customStore.getItems(),
      itemsCount: customStore.getItemsCount(),
    };
  }, []);

  // Get dispatch actions
  const { addItem, removeItem } = useDispatch('divi/custom-test') || {};

  useEffect(() => {
    const discoverModules = () => {
      try {
        // Access the module library store
        if (window.divi?.data?.select) {
          const moduleLibraryStore = window.divi.data.select('divi/module-library');
          
          if (moduleLibraryStore?.getModules) {
            const allModules = moduleLibraryStore.getModules();
            
            // Create a set of hidden module names for quick lookup
            const hiddenModuleNames = new Set(hiddenModules.map(item => item.name));
            
            // Transform modules to our format
            const moduleList = Object.entries(allModules || {}).map(([name, config]) => {
              let title = name;
              let category = 'unknown';
              
              try {
                if (moduleLibraryStore.getModuleTitle) {
                  title = moduleLibraryStore.getModuleTitle(name) || name;
                }
                if (moduleLibraryStore.getModuleCategory) {
                  category = moduleLibraryStore.getModuleCategory(name) || 'unknown';
                }
              } catch (e) {
                // Silent catch
              }
              
              return {
                name,
                title,
                category,
                isVisible: !hiddenModuleNames.has(name), // Check if module is in hidden list
              };
            });

            setModules(moduleList);
            setError(null);
          } else {
            throw new Error('Module library store not available');
          }
        } else {
          throw new Error('Divi data store not available');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Try to discover modules immediately
    discoverModules();
    
    // If it fails, try again after a short delay (in case stores aren't ready yet)
    if (modules.length === 0) {
      const timer = setTimeout(discoverModules, 1000);
      return () => clearTimeout(timer);
    }
  }, [hiddenModules]); // Add hiddenModules as dependency

  const handleToggle = (moduleName) => {
    const module = modules.find(m => m.name === moduleName);
    const newVisibility = !module?.isVisible;
    
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

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div>🔄 Discovering modules...</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Check browser console for detailed information
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', color: 'red' }}>
        <div>❌ Error: {error}</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Check browser console for more details
        </div>
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
                {module.isVisible ? '✅ Visible' : '❌ Hidden'}
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
        • Changes are applied in real-time to the Visual Builder<br />
        • Hidden modules are stored in custom store for persistence<br />
        • Note: This is a demonstration of the filtering capability
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
 */
export const SimpleModuleList = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>📋 Module Visibility Manager</h3>
      <p style={{ 
        marginBottom: '20px', 
        fontSize: '14px', 
        color: '#666' 
      }}>
        Manage module visibility in the Visual Builder. Hidden modules are stored persistently using the custom store.
      </p>
      
      <ModuleVisibilityManager />
    </div>
  );
};