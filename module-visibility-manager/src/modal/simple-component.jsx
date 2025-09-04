import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from '@divi/data';
import { 
  initializeModuleFilter, 
  updateHiddenModulesCache, 
  applyModuleVisibilityChanges 
} from '../module-filter';

// Initialize the module filter when the component loads
initializeModuleFilter();

/**
 * Store Watcher Component - Triggers module library updates when store changes
 * This component uses useSelect to watch store changes and updates the module filter
 * Following the same pattern as AppFrameStyleContainer for admin bar updates
 */
const ModuleVisibilityWatcher = () => {
  // Watch the custom store for changes using useSelect (consistent with Divi 5 patterns)
  const { hiddenModules } = useSelect(select => {
    const customStore = select('divi/custom-test');
    if (!customStore) {
      return { hiddenModules: [] };
    }
    return {
      hiddenModules: customStore.getItems() || [],
    };
  }, []);

  // When hiddenModules changes, update the filter cache
  useEffect(() => {
    // Update the module filter cache with current store data
    updateHiddenModulesCache(hiddenModules);
    
    // Apply module visibility changes using official Divi 5 store actions
    applyModuleVisibilityChanges(hiddenModules);
  }, [hiddenModules]); // Re-run when hiddenModules changes (reactive to store)

  return null; // This component doesn't render anything, just watches store
};


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
    console.log('🔧 CHECKBOX CLICKED:', moduleName);
    
    const module = modules.find(m => m.name === moduleName);
    const newVisibility = !module?.isVisible;
    
    console.log('🔧 Current module:', module);
    console.log('🔧 New visibility will be:', newVisibility);
    console.log('🔧 Current hiddenModules:', hiddenModules);
    console.log('🔧 addItem/removeItem functions:', { addItem: !!addItem, removeItem: !!removeItem });
    
    if (newVisibility) {
      // Module is being checked (made visible) - remove from hidden list
      const hiddenModule = hiddenModules.find(item => item.name === moduleName);
      console.log('🔧 Found hidden module to remove:', hiddenModule);
      if (hiddenModule && removeItem) {
        console.log('🔧 Calling removeItem with id:', hiddenModule.id);
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
        console.log('🔧 Calling addItem with:', newHiddenModule);
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
   
      
      {/* Include the store watcher to trigger real-time updates */}
      <ModuleVisibilityWatcher />
      
      <ModuleVisibilityManager />
    </div>
  );
};