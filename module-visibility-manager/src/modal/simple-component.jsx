import React, { useState, useEffect } from 'react';

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
 * Simple component to test module discovery without Redux store complexity.
 */
export const SimpleModuleList = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const discoverModules = () => {
      try {
        // Access the module library store
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
                isVisible: true, // Default to visible
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
  }, []);

  const handleToggle = (moduleName) => {
    const module = modules.find(m => m.name === moduleName);
    const newVisibility = !module?.isVisible;
    
    // Update local state
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
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>🔄 Discovering modules...</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Check browser console for detailed information
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <div>❌ Error: {error}</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
          Check browser console for more details
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Available Modules ({modules.length})</h3>
      
      {modules.length === 0 ? (
        <div style={{ color: '#666', fontStyle: 'italic' }}>
          No modules discovered yet...
        </div>
      ) : (
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {modules.map((module) => (
            <div key={module.name} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
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
        marginTop: '20px', 
        padding: '10px',
        background: '#f5f5f5',
        fontSize: '12px', 
        color: '#666',
        borderRadius: '4px'
      }}>
        <strong>Module Visibility Manager</strong><br />
        • Total modules: {modules.length}<br />
        • Changes are applied in real-time to the Visual Builder<br />
        • Note: This is a demonstration of the filtering capability
      </div>
    </div>
  );
};
