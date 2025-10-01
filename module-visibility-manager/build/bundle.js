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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useReactiveModuleFilter: () => (/* binding */ useReactiveModuleFilter)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n/**\n * Custom Hook for Reactive Module Filtering\n * \n * Implements real-time module visibility control for the Divi 5 Visual Builder.\n * Uses useSelect to monitor store changes and applies filtering to the Add Module dialog\n * automatically, following Divi 5 best practices with focused selectors.\n * \n * The hook registers a WordPress filter on module load that dynamically filters\n * the module list based on user preferences stored in the Divi settings store.\n * \n * @since 0.1.0\n * \n * @returns {Array} Array of hidden module objects from the store\n */\n// Global state to store current hidden modules\nlet currentHiddenModules = [];\n\n// Register WordPress filter on module load to enable dynamic module filtering\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_2__.addFilter)('divi.modalLibrary.addModule.moduleList', 'moduleVisibilityManager', (moduleFolderList, moduleParams) => {\n  const filteredList = {\n    ...moduleFolderList\n  };\n  let hiddenCount = 0;\n\n  // Remove hidden modules from picker list\n  currentHiddenModules.forEach(hiddenItem => {\n    if (hiddenItem.nodeName && filteredList[hiddenItem.nodeName]) {\n      delete filteredList[hiddenItem.nodeName];\n      hiddenCount++;\n    }\n  });\n  if (hiddenCount > 0) {\n    console.log(`📊 Module Visibility Manager: ${hiddenCount} modules hidden from Add Module dialog`);\n  }\n  return filteredList;\n}, 10);\nconst useReactiveModuleFilter = () => {\n  // Retrieve module visibility settings from Divi settings store\n  const settingsData = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('divi/settings')?.getSetting('moduleVisibilitySettings', []), []);\n\n  // Filter settings data to get only hidden modules\n  const hiddenModules = Array.isArray(settingsData) ? settingsData.filter(item => !item.visible) : [];\n\n  // Update global state to provide current hidden modules to the filter\n  currentHiddenModules = hiddenModules;\n  return hiddenModules;\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/hooks/use-reactive-module-filter.js?\n}");

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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal/component */ \"./src/modal/component.jsx\");\n/* harmony import */ var _icons_registerIcons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/registerIcons */ \"./src/icons/registerIcons.js\");\n\n\n\n\n/**\n * Register the Module Visibility Manager modal with Divi 5.\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('divi.modalLibrary.modalMapping', 'moduleVisibilityManager', modals => {\n  modals.ModuleVisibilityManager = {\n    name: 'divi/module-visibility-manager',\n    label: 'Module Visibility Manager',\n    type: 'multiInstanceModal',\n    component: _modal_component__WEBPACK_IMPORTED_MODULE_1__.ModuleVisibilityManagerModal\n  };\n  return modals;\n});\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/index.jsx?\n}");

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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ModuleVisibilityList: () => (/* binding */ ModuleVisibilityList)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../hooks */ \"./src/hooks/index.js\");\n\n\n\n\n\n/**\n * Module Visibility Manager Component\n * \n * Provides a user interface for managing module visibility in the Divi 5 Visual Builder.\n * Users can toggle individual modules on/off, and changes are applied in real-time to\n * the Add Module dialog while being persisted to the Divi settings store.\n */\nconst ModuleVisibilityManager = () => {\n  // Access Divi 5's built-in module library for available modules\n  const allModules = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('divi/module-library')?.getModules() || {}, []);\n\n  // Retrieve current module visibility settings from the store\n  const moduleVisibilityData = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('divi/settings')?.getSetting('moduleVisibilitySettings', []), []);\n\n  // Get settings store dispatcher for saving data\n  const {\n    add\n  } = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('divi/settings');\n\n  // Persist module visibility data to WordPress database via REST API\n  const saveToDatabase = async data => {\n    try {\n      // Convert immutable data to plain JavaScript array\n      const plainData = Array.isArray(data) ? data.map(item => ({\n        nodeName: item.nodeName,\n        visible: Boolean(item.visible)\n      })) : [];\n      const response = await fetch('/wp-json/divi/v1/module-visibility-settings/update', {\n        method: 'POST',\n        headers: {\n          'Content-Type': 'application/json',\n          'X-WP-Nonce': window.wpApiSettings?.nonce || ''\n        },\n        body: JSON.stringify({\n          data: plainData\n        })\n      });\n    } catch (error) {\n      console.error('❌ Save failed:', error);\n    }\n  };\n\n  // Create debounced save function using Lodash\n  const debouncedSaveToDatabase = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.debounce)(saveToDatabase, 1000);\n\n  // Combined update: store + database persistence\n  const updateDataWithPersistence = newData => {\n    // 1. Update store immediately (for UI reactivity)\n    add('moduleVisibilitySettings', newData);\n\n    // 2. Save to database (debounced using Lodash)\n    debouncedSaveToDatabase(newData);\n  };\n\n  // Function to toggle module visibility\n  const toggleModuleVisibility = (moduleName, currentlyVisible) => {\n    const currentData = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.select)('divi/settings').getSetting('moduleVisibilitySettings', []);\n\n    // Find existing entry or create new one\n    const existingIndex = currentData.findIndex(item => item.nodeName === moduleName);\n    let updatedData;\n    if (existingIndex >= 0) {\n      // Update existing entry\n      updatedData = [...currentData];\n      updatedData[existingIndex] = {\n        nodeName: moduleName,\n        visible: !currentlyVisible\n      };\n    } else {\n      // Add new entry\n      updatedData = [...currentData, {\n        nodeName: moduleName,\n        visible: !currentlyVisible\n      }];\n    }\n    updateDataWithPersistence(updatedData);\n  };\n\n  // Use our custom reactive hook - this automatically handles filter updates!\n  const hiddenModules = (0,_hooks__WEBPACK_IMPORTED_MODULE_3__.useReactiveModuleFilter)();\n\n  // Process modules using Divi 5's built-in data - simple and straightforward\n  const modules = Object.entries(allModules).map(([name, moduleConfig]) => {\n    // Find visibility setting for this module\n    const visibilitySetting = moduleVisibilityData.find(item => item.nodeName === name);\n    const isVisible = visibilitySetting ? visibilitySetting.visible : true; // Default to visible\n\n    return {\n      name,\n      title: moduleConfig?.title || name.replace('divi/', '').replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase()),\n      isVisible\n    };\n  });\n  const handleToggle = moduleName => {\n    const module = modules.find(m => m.name === moduleName);\n    const currentlyVisible = module?.isVisible ?? true; // Default to visible if not found\n\n    // Toggle module visibility using the simplified approach\n    toggleModuleVisibility(moduleName, currentlyVisible);\n  };\n\n  // No loading/error states needed - Divi 5 handles this for us\n\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h4\", null, \"\\uD83D\\uDCCB Available Modules (\", modules.length, \")\"), modules.length === 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      color: '#666',\n      fontStyle: 'italic'\n    }\n  }, \"No modules discovered yet...\") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      maxHeight: '300px',\n      overflowY: 'auto'\n    }\n  }, modules.map(module => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: module.name,\n    style: {\n      display: 'flex',\n      justifyContent: 'space-between',\n      alignItems: 'center',\n      padding: '8px 0',\n      borderBottom: '1px solid #eee'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, module.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      fontSize: '12px',\n      color: '#666'\n    }\n  }, module.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"label\", {\n    style: {\n      display: 'flex',\n      alignItems: 'center',\n      cursor: 'pointer',\n      fontSize: '14px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"input\", {\n    type: \"checkbox\",\n    checked: module.isVisible,\n    onChange: () => handleToggle(module.name),\n    style: {\n      marginRight: '8px'\n    }\n  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginTop: '15px',\n      padding: '10px',\n      background: '#f5f5f5',\n      fontSize: '12px',\n      color: '#666',\n      borderRadius: '4px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, \"Module Visibility Manager\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Total modules: \", modules.length, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Hidden modules: \", hiddenModules.length, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Data entries: \", moduleVisibilityData.length, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Uses Divi 5 built-in module library (simplified)\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Changes apply instantly to Insert Module dialog\", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), \"\\u2022 Lightweight state management without complex effects\"), hiddenModules.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      marginTop: '10px',\n      padding: '10px',\n      background: '#e8f5e8',\n      fontSize: '12px',\n      color: '#333',\n      borderRadius: '4px',\n      borderLeft: '4px solid #4caf50'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, \"Hidden Modules Store:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"br\", null), hiddenModules.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    key: `hidden-${item.name}-${index}`\n  }, \"\\u2022 \", item.name))));\n};\n\n/**\n * Main Component - Module Visibility Manager with Custom Store Integration\n * Shows module visibility manager with integrated custom store functionality\n * Uses reactive useSelect pattern for instant filter updates\n */\nconst ModuleVisibilityList = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    style: {\n      padding: '20px'\n    }\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(ModuleVisibilityManager, null));\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-module-visibility/./src/modal/module-visibility-list.jsx?\n}");

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

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = lodash;

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