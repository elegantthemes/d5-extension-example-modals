import React, { useState, useEffect } from 'react';
import { useSelect, useDispatch } from '@divi/data';

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

  // Use our custom reactive hook - this automatically handles filter updates!
  const hiddenModules = useReactiveModuleFilter();

  // Get additional store data
  const itemsCount = useSelect(select => {
    const customStore = select('divi/custom-test');
    return customStore?.getItemsCount() || 0;
  }, []);

  // Get dispatch actions
  const { addItem, removeItem } = useDispatch('divi/custom-test') || {};

  // Discover modules once on mount
  useEffect(() => {
    const discoverModules = () => {
      try {
        if (window.divi?.data?.select) {
          const moduleLibraryStore = window.divi.data.select('divi/module-library');
          
          if (moduleLibraryStore?.getModules) {
            const allModules = moduleLibraryStore.getModules();
            
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
                isVisible: true, // Default all to visible
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
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <div>Loading modules...</div>
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
        • Changes apply instantly to Insert Module dialog<br />
        • Uses reactive useSelect hook pattern (like Divi core)<br />
        • Filter automatically re-registers when store changes<br />
        • No manual triggers or page refresh required
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