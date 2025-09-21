/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/custom-store.js":
/*!*****************************!*\
  !*** ./src/custom-store.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   registerCustomStore: () => (/* binding */ registerCustomStore)\n/* harmony export */ });\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_0__);\n\n\n// Actions following Divi pattern: instant store updates, no side effects\nconst actions = {\n  addItem: item => {\n    return {\n      type: 'ADD_ITEM',\n      item\n    };\n  },\n  removeItem: itemId => {\n    return {\n      type: 'REMOVE_ITEM',\n      itemId\n    };\n  },\n  reloadFromPreferences: () => {\n    return {\n      type: 'RELOAD_FROM_PREFERENCES'\n    };\n  }\n};\n\n// Simple reducer\nconst reducer = (state = {\n  items: [],\n  isLoading: true\n}, action) => {\n  switch (action.type) {\n    case 'ADD_ITEM':\n      return {\n        ...state,\n        items: [...state.items, action.item],\n        isLoading: false\n      };\n    case 'REMOVE_ITEM':\n      return {\n        ...state,\n        items: state.items.filter(item => item.id !== action.itemId),\n        isLoading: false\n      };\n    case 'RELOAD_FROM_PREFERENCES':\n      // Reload data from app-preferences\n      try {\n        const appPrefsStore = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences');\n        if (appPrefsStore) {\n          const adminBarPreference = appPrefsStore.get(['app', 'adminBar']);\n          if (adminBarPreference?.moduleVisibility) {\n            return {\n              ...state,\n              items: adminBarPreference.moduleVisibility,\n              isLoading: false\n            };\n          }\n          // App-preferences available but no data\n          return {\n            ...state,\n            items: [],\n            isLoading: false\n          };\n        }\n      } catch (e) {\n        console.log('❌ Error reloading from app-preferences:', e);\n      }\n      return {\n        ...state,\n        isLoading: false\n      };\n    default:\n      return state;\n  }\n};\n\n// Simple selectors\nconst selectors = {\n  getItems: state => state.items,\n  getItemsCount: state => state.items.length,\n  isLoading: state => state.isLoading\n};\n\n// Effects for persistence (following Divi 5 pattern using applyEffects)\nconst effects = {\n  // Persist to app preferences when items change\n  ADD_ITEM: (action, store) => {\n    const state = store.getState();\n\n    // Save to adminBar.moduleVisibility (proven working method)\n    try {\n      const preferences = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences');\n      if (preferences) {\n        const adminBarPreference = preferences.get(['app', 'adminBar']);\n        (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('divi/app-preferences').set(['app', 'adminBar'], {\n          ...adminBarPreference,\n          moduleVisibility: state.items\n        });\n\n        // Verify save was successful\n        setTimeout(() => {\n          const savedAdminBar = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences').get(['app', 'adminBar']);\n        }, 100);\n      }\n    } catch (e) {\n      console.log('❌ Error saving to adminBar:', e);\n    }\n  },\n  REMOVE_ITEM: (action, store) => {\n    const state = store.getState();\n\n    // Save to adminBar.moduleVisibility (proven working method)\n    try {\n      const preferences = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences');\n      if (preferences) {\n        const adminBarPreference = preferences.get(['app', 'adminBar']);\n        (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('divi/app-preferences').set(['app', 'adminBar'], {\n          ...adminBarPreference,\n          moduleVisibility: state.items\n        });\n\n        // Verify save was successful\n        setTimeout(() => {\n          const savedAdminBar = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences').get(['app', 'adminBar']);\n        }, 100);\n      }\n    } catch (e) {\n      console.log('❌ Error saving to adminBar:', e);\n    }\n  }\n};\n\n// Server sync moved to action creators\n\n// Initial state following Divi 5 pattern - load from app preferences\nconst getInitialState = () => {\n  try {\n    const appPrefsStore = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences');\n    if (appPrefsStore) {\n      const adminBarPreference = appPrefsStore.get(['app', 'adminBar']);\n      if (adminBarPreference?.moduleVisibility) {\n        return {\n          items: adminBarPreference.moduleVisibility,\n          isLoading: false\n        };\n      }\n\n      // App-preferences is available but no data yet\n      return {\n        items: [],\n        isLoading: false\n      };\n    }\n  } catch (e) {\n    console.log('❌ Error loading from app-preferences:', e);\n  }\n\n  // App-preferences not available yet - show loading state\n  // Check if it becomes available later\n  setTimeout(() => {\n    const laterAppPrefs = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.select)('divi/app-preferences');\n    if (laterAppPrefs) {\n      // Trigger a store update to reload data\n      (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('divi/custom-test').reloadFromPreferences();\n    }\n  }, 1000);\n  return {\n    items: [],\n    isLoading: true\n  };\n};\n\n// Register the store\nconst registerCustomStore = () => {\n  // Prevent double registration\n  if (window.wp?.data?.select('divi/custom-test')) {\n    return;\n  }\n  const initialState = getInitialState();\n  const store = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.registerStore)('divi/custom-test', {\n    actions,\n    reducer,\n    selectors,\n    initialState\n  });\n\n  // Apply simple effects pattern (plugin-compatible)\n  const originalDispatch = store.dispatch;\n  store.dispatch = action => {\n    const result = originalDispatch(action);\n\n    // Run effects after action is processed\n    if (effects[action.type]) {\n      try {\n        effects[action.type](action, store);\n      } catch (e) {\n        // Silent error handling\n      }\n    }\n    return result;\n  };\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/custom-store.js?\n}");

/***/ }),

/***/ "./src/hooks/index.js":
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useReactiveModuleFilter: () => (/* reexport safe */ _use_reactive_module_filter__WEBPACK_IMPORTED_MODULE_0__.useReactiveModuleFilter)\n/* harmony export */ });\n/* harmony import */ var _use_reactive_module_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-reactive-module-filter */ \"./src/hooks/use-reactive-module-filter.js\");\n\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/hooks/index.js?\n}");

/***/ }),

/***/ "./src/hooks/use-reactive-module-filter.js":
/*!*************************************************!*\
  !*** ./src/hooks/use-reactive-module-filter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useReactiveModuleFilter: () => (/* binding */ useReactiveModuleFilter)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n/**\n * Custom Hook for Reactive Module Filtering\n * \n * This hook uses useSelect to watch store changes and updates the filter reactively.\n * Similar pattern to use-process-dynamic-content-title.ts in Divi core.\n * \n * The hook automatically registers/unregisters the WordPress filter based on store changes,\n * ensuring that the Insert Module dialog shows only visible modules in real-time.\n * \n * @since 0.1.0\n * \n * @returns {Array} Array of hidden module objects from the store\n */\nconst useReactiveModuleFilter = () => {\n  // Watch the custom store reactively using useSelect\n  const hiddenModules = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {\n    const customStore = select('divi/custom-test');\n    const items = customStore?.getItems() || [];\n    console.log('🔍 HOOK: useSelect - Store items:', items);\n    return items;\n  }, []); // No dependencies - always reactive to store changes\n\n  console.log('🔍 HOOK: Rendered with hiddenModules:', hiddenModules);\n\n  // Initialize the filter when component mounts and update when store changes\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    console.log('🔍 HOOK: useEffect triggered with hiddenModules:', hiddenModules);\n    if (typeof window !== 'undefined' && window.vendor?.wp?.hooks) {\n      console.log('🔍 HOOK: WordPress hooks available, registering filter');\n\n      // Add the reactive filter (removeFilter is handled in cleanup)\n      window.vendor.wp.hooks.addFilter('divi.modalLibrary.addModule.moduleList', 'moduleVisibilityManager', (moduleFolderList, moduleParams) => {\n        console.log('🔍 FILTER: Called with', Object.keys(moduleFolderList).length, 'modules');\n        console.log('🔍 FILTER: Hidden modules:', hiddenModules);\n\n        // Create filtered list based on current store data\n        const filteredList = {\n          ...moduleFolderList\n        };\n\n        // Remove hidden modules from picker list\n        hiddenModules.forEach(hiddenItem => {\n          if (hiddenItem.name && filteredList[hiddenItem.name]) {\n            delete filteredList[hiddenItem.name];\n            console.log('🔍 FILTER: Removed module:', hiddenItem.name);\n          }\n        });\n        console.log('🔍 FILTER: Returning', Object.keys(filteredList).length, 'modules');\n        return filteredList;\n      }, 10 // Priority\n      );\n      console.log('🔍 HOOK: Filter registered successfully');\n    } else {\n      console.log('🔍 HOOK: WordPress hooks not available');\n    }\n\n    // Cleanup function to remove filter when component unmounts\n    return () => {\n      if (window.vendor?.wp?.hooks?.removeFilter) {\n        window.vendor.wp.hooks.removeFilter('divi.modalLibrary.addModule.moduleList', 'moduleVisibilityManager');\n      }\n    };\n  }, [hiddenModules]); // Re-register filter when hiddenModules changes!\n\n  return hiddenModules;\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/hooks/use-reactive-module-filter.js?\n}");

/***/ }),

/***/ "./src/icons/index.js":
/*!****************************!*\
  !*** ./src/icons/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   moduleVisibility: () => (/* reexport module object */ _module_visibility__WEBPACK_IMPORTED_MODULE_0__)\n/* harmony export */ });\n/* harmony import */ var _module_visibility__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./module-visibility */ \"./src/icons/module-visibility/index.jsx\");\n\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/icons/index.js?\n}");

/***/ }),

/***/ "./src/icons/module-visibility/index.jsx":
/*!***********************************************!*\
  !*** ./src/icons/module-visibility/index.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   component: () => (/* binding */ component),\n/* harmony export */   name: () => (/* binding */ name),\n/* harmony export */   viewBox: () => (/* binding */ viewBox)\n/* harmony export */ });\n// Icon data.\nconst name = 'module-visibility'; // Unique name.\nconst viewBox = '0 0 24 24'; // You will need to adjust this to match your SVG.\nconst component = (color = '#A2B0C1') => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"path\", {\n  d: \"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\",\n  strokeWidth: \"2\",\n  strokeLinecap: \"round\",\n  strokeLinejoin: \"round\",\n  stroke: color,\n  fill: \"none\"\n}), /*#__PURE__*/React.createElement(\"circle\", {\n  cx: \"12\",\n  cy: \"12\",\n  r: \"3\",\n  strokeWidth: \"2\",\n  strokeLinecap: \"round\",\n  strokeLinejoin: \"round\",\n  stroke: color,\n  fill: color\n})); // Eye SVG icon without the svg tag.\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/icons/module-visibility/index.jsx?\n}");

/***/ }),

/***/ "./src/icons/registerIcons.js":
/*!************************************!*\
  !*** ./src/icons/registerIcons.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/icons/index.js\");\n\n\n\n// Add module visibility icon to the icon library.\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('divi.iconLibrary.icon.map', 'moduleVisibilityManager', icons => ({\n  ...icons,\n  // This is important. Without this, all other icons will be overwritten.\n  [_index__WEBPACK_IMPORTED_MODULE_1__.moduleVisibility.name]: _index__WEBPACK_IMPORTED_MODULE_1__.moduleVisibility\n}));\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/icons/registerIcons.js?\n}");

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal/component */ \"./src/modal/component.jsx\");\n/* harmony import */ var _icons_registerIcons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/registerIcons */ \"./src/icons/registerIcons.js\");\n/* harmony import */ var _custom_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-store */ \"./src/custom-store.js\");\n\n\n\n\n\n// Register custom store after module library is ready\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addAction)('divi.moduleLibrary.registerModuleLibraryStore.after', 'moduleVisibilityCustomStore', () => {\n  (0,_custom_store__WEBPACK_IMPORTED_MODULE_3__.registerCustomStore)();\n  // Custom store registered via hook\n});\n\n/**\n * Register the Module Visibility Manager modal with Divi 5.\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('divi.modalLibrary.modalMapping', 'moduleVisibilityManager', modals => {\n  modals.ModuleVisibilityManager = {\n    name: 'divi/module-visibility-manager',\n    label: 'Module Visibility Manager',\n    type: 'multiInstanceModal',\n    component: _modal_component__WEBPACK_IMPORTED_MODULE_1__.ModuleVisibilityManagerModal\n  };\n  return modals;\n});\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/index.jsx?\n}");

/***/ }),

/***/ "./src/modal/component.jsx":
/*!*********************************!*\
  !*** ./src/modal/component.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModuleVisibilityManagerModal: () => (/* binding */ ModuleVisibilityManagerModal)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _divi_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @divi/modal */ \"@divi/modal\");\n/* harmony import */ var _divi_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_divi_modal__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _divi_error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @divi/error-boundary */ \"@divi/error-boundary\");\n/* harmony import */ var _divi_error_boundary__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_divi_error_boundary__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _module_visibility_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./module-visibility-list */ \"./src/modal/module-visibility-list.jsx\");\n\n\n\n\n\n\n/**\n * Module Visibility Manager Modal Component.\n * \n * Empty modal canvas demonstrating basic modal structure\n * for managing which modules appear in the module library.\n *\n * @since 0.1.0\n *\n * @param {Object} props Component props.\n * @returns {React.ReactElement}\n */\nconst ModuleVisibilityManagerModal = props => {\n  const {\n    bodySiblingHeight\n  } = props;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_error_boundary__WEBPACK_IMPORTED_MODULE_3__.ErrorBoundary, {\n    key: \"et-vb-divi-modal--module-visibility-manager\",\n    componentName: \"et-vb-divi-modal--module-visibility-manager\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.WrapperContainer, {\n    dimension: null,\n    offset: null,\n    snappable: true,\n    expandable: true,\n    draggable: true,\n    resizable: true,\n    centered: false,\n    modalName: \"divi/module-visibility-manager\",\n    bodySiblingHeight: bodySiblingHeight\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.Header, {\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Module Visibility Manager', 'et_builder')\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.BodyContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.PanelContainer, {\n    id: \"module-visibility-manager\",\n    opened: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_module_visibility_list__WEBPACK_IMPORTED_MODULE_4__.ModuleVisibilityList, null)))));\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/modal/component.jsx?\n}");

/***/ }),

/***/ "./src/modal/module-visibility-list.jsx":
/*!**********************************************!*\
  !*** ./src/modal/module-visibility-list.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModuleVisibilityList: () => (/* binding */ ModuleVisibilityList)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks */ \"./src/hooks/index.js\");\n\n\n\n\n/**\n * Module Visibility Manager Component\n * Component to test module discovery and visibility management\n * Now uses reactive useSelect pattern for instant filter updates\n */\nconst ModuleVisibilityManager = () => {\n  const [modules, setModules] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);\n  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n  const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n\n  // Use our custom reactive hook - this automatically handles filter updates!\n  const hiddenModules = (0,_hooks__WEBPACK_IMPORTED_MODULE_2__.useReactiveModuleFilter)();\n\n  // Get additional store data\n  const {\n    itemsCount,\n    storeIsLoading\n  } = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {\n    const customStore = select('divi/custom-test');\n    return {\n      itemsCount: customStore?.getItemsCount() || 0,\n      storeIsLoading: customStore?.isLoading() || false\n    };\n  }, []);\n\n  // Get dispatch actions\n  const {\n    addItem,\n    removeItem\n  } = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('divi/custom-test') || {};\n\n  // Discover modules once on mount\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const discoverModules = () => {\n      // Clear any previous errors\n      setError(null);\n\n      // Check for essential dependencies first\n      if (!_divi_data__WEBPACK_IMPORTED_MODULE_1__.select) {\n        setError('Divi data select function not available');\n        setIsLoading(false);\n        return;\n      }\n      try {\n        const moduleLibraryStore = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.select)('divi/module-library');\n        if (!moduleLibraryStore) {\n          setError('Module library store not available');\n          setIsLoading(false);\n          return;\n        }\n        if (!moduleLibraryStore.getModules || typeof moduleLibraryStore.getModules !== 'function') {\n          setError('Module library getModules method not available');\n          setIsLoading(false);\n          return;\n        }\n        const allModules = moduleLibraryStore.getModules();\n\n        // Transform modules to our format\n        const moduleList = Object.entries(allModules || {}).map(([name, config]) => {\n          let title = name;\n          let category = 'unknown';\n\n          // Use if-else for anticipated checks instead of expensive try-catch\n          if (moduleLibraryStore.getModuleTitle && typeof moduleLibraryStore.getModuleTitle === 'function') {\n            const moduleTitle = moduleLibraryStore.getModuleTitle(name);\n            if (moduleTitle && typeof moduleTitle === 'string') {\n              title = moduleTitle;\n            }\n          }\n          if (moduleLibraryStore.getModuleCategory && typeof moduleLibraryStore.getModuleCategory === 'function') {\n            const moduleCategory = moduleLibraryStore.getModuleCategory(name);\n            if (moduleCategory && typeof moduleCategory === 'string') {\n              category = moduleCategory;\n            }\n          }\n          return {\n            name,\n            title,\n            category,\n            isVisible: true // Default all to visible\n          };\n        });\n        setModules(moduleList);\n        setIsLoading(false);\n      } catch (err) {\n        // Handle unexpected errors only (store access issues, etc.)\n        const errorMessage = err?.message || 'Unexpected error occurred while discovering modules';\n        setError(errorMessage);\n        setIsLoading(false);\n      }\n    };\n    discoverModules();\n  }, []); // Only run once on mount\n\n  // Update visibility based on hidden modules (separate effect)\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    const hiddenModuleNames = new Set(hiddenModules.map(item => item.name));\n    setModules(prevModules => prevModules.map(module => ({\n      ...module,\n      isVisible: !hiddenModuleNames.has(module.name)\n    })));\n  }, [hiddenModules]); // Update visibility when hiddenModules changes\n\n  const handleToggle = moduleName => {\n    const module = modules.find(m => m.name === moduleName);\n    const newVisibility = !module?.isVisible;\n    if (newVisibility) {\n      // Module is being checked (made visible) - remove from hidden list\n      const hiddenModule = hiddenModules.find(item => item.name === moduleName);\n      if (hiddenModule && removeItem) {\n        removeItem(hiddenModule.id);\n      }\n    } else {\n      // Module is being unchecked (made hidden) - add to hidden list\n      if (addItem) {\n        const newHiddenModule = {\n          id: Date.now(),\n          name: moduleName,\n          created: new Date().toLocaleTimeString()\n        };\n        addItem(newHiddenModule);\n      }\n    }\n\n    // Update local state immediately for better UX\n    setModules(prevModules => prevModules.map(m => m.name === moduleName ? {\n      ...m,\n      isVisible: newVisibility\n    } : m));\n  };\n  if (isLoading || storeIsLoading) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n      style: {\n        textAlign: 'center',\n        padding: '20px'\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, storeIsLoading ? 'Loading preferences...' : 'Loading modules...'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n      style: {\n        fontSize: '12px',\n        color: '#666',\n        marginTop: '8px'\n      }\n    }, storeIsLoading && 'Waiting for Divi app-preferences store...'));\n  }\n  if (error) {\n    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n      style: {\n        textAlign: 'center',\n        color: 'red',\n        padding: '20px'\n      }\n    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, \"Error loading modules: \", error));\n  }\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h4\", null, \"\\uD83D\\uDCCB Available Modules (\", modules.length, \")\"), modules.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      color: '#666',\n      fontStyle: 'italic'\n    }\n  }, \"No modules discovered yet...\") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      maxHeight: '300px',\n      overflowY: 'auto'\n    }\n  }, modules.map(module => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: module.name,\n    style: {\n      display: 'flex',\n      justifyContent: 'space-between',\n      alignItems: 'center',\n      padding: '8px 0',\n      borderBottom: '1px solid #eee'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, module.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      fontSize: '12px',\n      color: '#666'\n    }\n  }, module.name, \" \\u2022 \", module.category)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: {\n      display: 'flex',\n      alignItems: 'center',\n      cursor: 'pointer',\n      fontSize: '14px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"checkbox\",\n    checked: module.isVisible,\n    onChange: () => handleToggle(module.name),\n    style: {\n      marginRight: '8px'\n    }\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginTop: '15px',\n      padding: '10px',\n      background: '#f5f5f5',\n      fontSize: '12px',\n      color: '#666',\n      borderRadius: '4px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, \"Module Visibility Manager\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Total modules: \", modules.length, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Hidden modules: \", itemsCount, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Store status: \", storeIsLoading ? 'Loading preferences...' : 'Ready', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Changes apply instantly to Insert Module dialog\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Uses Divi 5 adminBar.moduleVisibility persistence\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Filter automatically re-registers when store changes\"), hiddenModules.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginTop: '10px',\n      padding: '10px',\n      background: '#e8f5e8',\n      fontSize: '12px',\n      color: '#333',\n      borderRadius: '4px',\n      borderLeft: '4px solid #4caf50'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, \"Hidden Modules Store:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), hiddenModules.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: item.id\n  }, \"\\u2022 \", item.name, \" (added: \", item.created, \")\"))));\n};\n\n/**\n * Main Component - Module Visibility Manager with Custom Store Integration\n * Shows module visibility manager with integrated custom store functionality\n * Uses reactive useSelect pattern for instant filter updates\n */\nconst ModuleVisibilityList = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      padding: '20px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ModuleVisibilityManager, null));\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/modal/module-visibility-list.jsx?\n}");

/***/ }),

/***/ "@divi/data":
/*!********************************!*\
  !*** external ["divi","data"] ***!
  \********************************/
/***/ ((module) => {

module.exports = divi.data;

/***/ }),

/***/ "@divi/error-boundary":
/*!*****************************************!*\
  !*** external ["divi","errorBoundary"] ***!
  \*****************************************/
/***/ ((module) => {

module.exports = divi.errorBoundary;

/***/ }),

/***/ "@divi/modal":
/*!*********************************!*\
  !*** external ["divi","modal"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = divi.modal;

/***/ }),

/***/ "@wordpress/hooks":
/*!****************************************!*\
  !*** external ["vendor","wp","hooks"] ***!
  \****************************************/
/***/ ((module) => {

module.exports = vendor.wp.hooks;

/***/ }),

/***/ "@wordpress/i18n":
/*!***************************************!*\
  !*** external ["vendor","wp","i18n"] ***!
  \***************************************/
/***/ ((module) => {

module.exports = vendor.wp.i18n;

/***/ }),

/***/ "react":
/*!***********************************!*\
  !*** external ["vendor","React"] ***!
  \***********************************/
/***/ ((module) => {

module.exports = vendor.React;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.jsx");
/******/ 	
/******/ })()
;