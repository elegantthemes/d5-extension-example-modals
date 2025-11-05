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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useKeywordData: () => (/* reexport safe */ _use_keyword_data__WEBPACK_IMPORTED_MODULE_0__.useKeywordData),\n/* harmony export */   usePostKeywordManager: () => (/* reexport safe */ _use_keyword_data__WEBPACK_IMPORTED_MODULE_0__.usePostKeywordManager)\n/* harmony export */ });\n/* harmony import */ var _use_keyword_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-keyword-data */ \"./src/hooks/use-keyword-data.js\");\n/**\n * Hooks barrel export.\n *\n * Provides a central point for importing custom hooks.\n *\n * @since 0.1.0\n */\n\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/hooks/index.js?\n}");

/***/ }),

/***/ "./src/hooks/use-keyword-data.js":
/*!***************************************!*\
  !*** ./src/hooks/use-keyword-data.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useKeywordData: () => (/* binding */ useKeywordData),\n/* harmony export */   usePostKeywordManager: () => (/* binding */ usePostKeywordManager)\n/* harmony export */ });\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _divi_rest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @divi/rest */ \"@divi/rest\");\n/* harmony import */ var _divi_rest__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_divi_rest__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ \"lodash\");\n/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\n/**\n * Custom hook for accessing post keyword data.\n *\n * Demonstrates how to create reusable hooks for accessing\n * Divi settings store data in a consistent way across components.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * Custom hooks are a powerful pattern for:\n * - Encapsulating data access logic\n * - Providing consistent interfaces across components\n * - Making components more testable\n * - Reducing code duplication\n *\n * This hook follows React hooks conventions:\n * - Name starts with \"use\"\n * - Can call other hooks (useSelect)\n * - Returns data in a consistent format\n *\n * Usage in components:\n * ```javascript\n * const { focusKeyword } = useKeywordData();\n * ```\n *\n * @since 0.1.0\n *\n * @returns {Object} Keyword data object with focusKeyword.\n */\nconst useKeywordData = () => {\n  const settingsData = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select('divi/settings')?.getSetting('postKeywordSettings', {\n    focusKeyword: ''\n  }), []);\n  return {\n    focusKeyword: settingsData?.focusKeyword || ''\n  };\n};\n\n/**\n * Custom hook for managing post keyword data with debounced persistence.\n *\n * Implements reactive keyword management for the Divi 5 Visual Builder.\n * Uses useSelect to monitor store changes and persists data to WordPress database\n * automatically, following Divi 5 best practices with debounced saves.\n *\n * The hook provides methods to update keyword data that automatically sync\n * to both the store (for immediate UI updates) and database (debounced for performance).\n *\n * @since 0.1.0\n *\n * @returns {Object} Object containing keyword data and update methods.\n */\nconst usePostKeywordManager = () => {\n  // Retrieve current post keyword settings from the store\n  const keywordData = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select('divi/settings')?.getSetting('postKeywordSettings', {\n    focusKeyword: ''\n  }), []);\n\n  // Get settings store dispatcher for saving data\n  const {\n    add\n  } = (0,_divi_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)('divi/settings');\n\n  // Use Divi's useFetch hook for REST API calls\n  const {\n    fetch\n  } = (0,_divi_rest__WEBPACK_IMPORTED_MODULE_1__.useFetch)();\n\n  // Persist keyword data to WordPress database via REST API\n  const saveToDatabase = async data => {\n    try {\n      await fetch({\n        method: 'POST',\n        restRoute: '/divi/v1/post-keyword-settings/update',\n        data: {\n          data\n        },\n        forceRequest: true\n      });\n    } catch (error) {\n      console.error('Post Keyword Manager - Save failed:', error);\n    }\n  };\n\n  // Create debounced save function using Lodash\n  const debouncedSaveToDatabase = (0,lodash__WEBPACK_IMPORTED_MODULE_2__.debounce)(saveToDatabase, 1000);\n\n  // Combined update: store + database persistence\n  const updateKeywordData = newData => {\n    // 1. Update store immediately (for UI reactivity)\n    add('postKeywordSettings', newData);\n\n    // 2. Save to database (debounced using Lodash)\n    debouncedSaveToDatabase(newData);\n  };\n\n  // Function to update focus keyword\n  const updateFocusKeyword = focusKeyword => {\n    const updatedData = {\n      ...keywordData,\n      focusKeyword\n    };\n    updateKeywordData(updatedData);\n  };\n  return {\n    focusKeyword: keywordData?.focusKeyword || '',\n    updateFocusKeyword\n  };\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/hooks/use-keyword-data.js?\n}");

/***/ }),

/***/ "./src/icons/index.js":
/*!****************************!*\
  !*** ./src/icons/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   postKeyword: () => (/* binding */ postKeyword)\n/* harmony export */ });\n/* harmony import */ var _post_keyword__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./post-keyword */ \"./src/icons/post-keyword/index.jsx\");\n/**\n * Icons barrel export.\n *\n * Provides a central point for importing icon data.\n * Each icon exports name, viewBox, and component.\n *\n * @since 0.1.0\n */\n\nconst postKeyword = _post_keyword__WEBPACK_IMPORTED_MODULE_0__;\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/icons/index.js?\n}");

/***/ }),

/***/ "./src/icons/post-keyword/index.jsx":
/*!******************************************!*\
  !*** ./src/icons/post-keyword/index.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   component: () => (/* binding */ component),\n/* harmony export */   name: () => (/* binding */ name),\n/* harmony export */   viewBox: () => (/* binding */ viewBox)\n/* harmony export */ });\n/**\n * Post Keyword Icon Data.\n *\n * Icon representing keyword/SEO functionality.\n * Uses horizontal lines with a search/keyword indicator circle.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * Divi icons must export three properties:\n * - name: Unique identifier for the icon\n * - viewBox: SVG viewBox attribute (typically '0 0 24 24')\n * - component: Function that returns JSX (without <svg> wrapper)\n *\n * The component function receives a color parameter and should use it\n * for stroke/fill to respect theme colors.\n *\n * @since 0.1.0\n */\n\n// Unique name for the icon.\nconst name = 'post-keyword';\n\n// ViewBox for the SVG (defines coordinate system).\nconst viewBox = '0 0 24 24';\n\n// Icon component (returns JSX without svg wrapper).\nconst component = (color = '#A2B0C1') => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(\"path\", {\n  d: \"M3 7h18M3 12h18M3 17h12\",\n  stroke: color,\n  strokeWidth: \"2\",\n  strokeLinecap: \"round\",\n  fill: \"none\"\n}), /*#__PURE__*/React.createElement(\"circle\", {\n  cx: \"19\",\n  cy: \"17\",\n  r: \"3\",\n  stroke: color,\n  strokeWidth: \"2\",\n  fill: \"none\"\n}));\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/icons/post-keyword/index.jsx?\n}");

/***/ }),

/***/ "./src/icons/registerIcons.js":
/*!************************************!*\
  !*** ./src/icons/registerIcons.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ \"./src/icons/index.js\");\n\n\n\n/**\n * Register custom icons with Divi icon library.\n *\n * This makes the icons available for use in toolbar buttons and other\n * UI elements throughout the Visual Builder.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * The divi.iconLibrary.icon.map filter is the standard way to add\n * custom icons to Divi. Icons are registered using the icon object\n * which contains name, viewBox, and component properties.\n *\n * IMPORTANT: Always spread the existing icons (...icons) to avoid\n * overwriting other registered icons!\n *\n * Usage in components:\n * - Toolbar buttons: iconSvg: { name: 'your-icon-name' }\n * - Other UI: Use the icon library utilities\n *\n * Icon Naming:\n * - Use kebab-case for icon names\n * - Make names descriptive and unique\n * - Prefix with your plugin name to avoid conflicts\n *\n * @since 0.1.0\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('divi.iconLibrary.icon.map', 'postKeywordIcons', icons => ({\n  ...icons,\n  // Important: spread existing icons to not overwrite them.\n  [_index__WEBPACK_IMPORTED_MODULE_1__.postKeyword.name]: _index__WEBPACK_IMPORTED_MODULE_1__.postKeyword\n}));\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/icons/registerIcons.js?\n}");

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ \"@wordpress/hooks\");\n/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal/component */ \"./src/modal/component.jsx\");\n/* harmony import */ var _icons_registerIcons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icons/registerIcons */ \"./src/icons/registerIcons.js\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n/**\n * Register the Post Keyword Manager modal with Divi 5.\n *\n * This makes the modal available to be opened via the toolbar button.\n * The modal is registered as a multiInstanceModal, which means multiple\n * instances can be open simultaneously.\n *\n * @since 0.1.0\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('divi.modalLibrary.modalMapping', 'postKeywordManager', modals => {\n  modals.PostKeywordManager = {\n    name: 'divi/post-keyword-manager',\n    label: 'Post Keyword Manager',\n    type: 'multiInstanceModal',\n    component: _modal_component__WEBPACK_IMPORTED_MODULE_1__.PostKeywordManagerModal\n  };\n  return modals;\n});\n\n/**\n * Listen for content changes via et.builder.content.change hook.\n *\n * This is the key integration point for third-party plugins that need to\n * analyze page content. The hook fires after successful save operations\n * (draft, publish, preview) and provides the fully rendered HTML content.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * The et.builder.content.change hook is specifically designed for plugins\n * that need to analyze or process the rendered output of the Visual Builder.\n *\n * When to use this hook:\n * - SEO analysis (like Yoast or Rank Math)\n * - Content validation\n * - Word count or readability analysis\n * - Accessibility checking\n * - Custom content indexing\n *\n * Hook Parameters:\n * @param {string} renderedContent - The fully rendered HTML content as a string\n * @param {object} postData - Post metadata object containing:\n *   - postId: The ID of the post being saved\n *\n * Performance Note:\n * The hook only fires when at least one listener is registered. This is\n * an optimization to avoid generating rendered content when it's not needed.\n * The Visual Builder checks for listeners using hasAction() before requesting\n * the rendered content from the server.\n *\n * @since 0.1.0\n */\n(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addAction)('et.builder.content.change', 'postKeywordManager', (renderedContent, postData) => {\n  // Get our focus keyword from Divi settings\n  const keywordData = (0,_divi_data__WEBPACK_IMPORTED_MODULE_3__.select)('divi/settings').getSetting('postKeywordSettings', {\n    focusKeyword: ''\n  });\n  const focusKeyword = keywordData?.focusKeyword || '';\n\n  // Perform keyword density analysis\n  if (focusKeyword && renderedContent) {\n    const textContent = renderedContent.replace(/<[^>]*>/g, '').toLowerCase();\n    const keywordLower = focusKeyword.toLowerCase();\n    const matches = textContent.match(new RegExp(keywordLower, 'g'));\n    const keywordCount = matches ? matches.length : 0;\n    const wordCount = textContent.trim().split(/\\s+/).filter(word => word.length > 0).length;\n    const keywordDensity = wordCount > 0 ? keywordCount / wordCount * 100 : 0;\n\n    // Log keyword density analysis results for demonstration\n    console.log('Post Keyword Manager - Keyword Density Analysis:', {\n      focusKeyword,\n      keywordCount,\n      totalWords: wordCount,\n      densityPercentage: keywordDensity.toFixed(2) + '%',\n      postId: postData.postId\n    });\n\n    // Provide SEO feedback based on density\n    if (keywordDensity < 0.5) {\n      console.warn(`SEO Warning: Low keyword density (${keywordDensity.toFixed(2)}%) for \"${focusKeyword}\". Consider adding more instances.`);\n    } else if (keywordDensity > 3.0) {\n      console.warn(`SEO Warning: High keyword density (${keywordDensity.toFixed(2)}%) for \"${focusKeyword}\". Possible keyword stuffing.`);\n    } else {\n      console.log(`SEO OK: Good keyword density (${keywordDensity.toFixed(2)}%) for \"${focusKeyword}\".`);\n    }\n  }\n});\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/index.jsx?\n}");

/***/ }),

/***/ "./src/modal/component.jsx":
/*!*********************************!*\
  !*** ./src/modal/component.jsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PostKeywordManagerModal: () => (/* binding */ PostKeywordManagerModal)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _divi_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @divi/modal */ \"@divi/modal\");\n/* harmony import */ var _divi_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_divi_modal__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _divi_error_boundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @divi/error-boundary */ \"@divi/error-boundary\");\n/* harmony import */ var _divi_error_boundary__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_divi_error_boundary__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _keyword_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyword-form */ \"./src/modal/keyword-form.jsx\");\n\n\n\n\n\n\n/**\n * Post Keyword Manager Modal Component.\n *\n * Demonstrates basic modal structure for managing post keywords\n * and displaying content statistics from et.builder.content.change hook.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * This modal follows Divi's standard modal structure pattern:\n *\n * 1. ErrorBoundary: Wraps the entire modal to catch and handle errors gracefully\n * 2. WrapperContainer: Provides modal functionality (drag, resize, expand, snap)\n * 3. Header: Standard modal header with title and close button\n * 4. BodyContainer: Contains the modal content\n * 5. PanelContainer: Organizes content into collapsible panels\n *\n * Modal Features:\n * - draggable: User can drag the modal around the screen\n * - resizable: User can resize the modal\n * - expandable: User can expand/collapse the modal\n * - snappable: Modal snaps to screen edges when dragged near them\n *\n * @since 0.1.0\n *\n * @param {Object} props Component props.\n * @param {number} props.bodySiblingHeight Height of elements outside the body.\n * @returns {React.ReactElement}\n */\nconst PostKeywordManagerModal = props => {\n  const {\n    bodySiblingHeight\n  } = props;\n  console.log('🎨 MODAL: Rendering Post Keyword Manager modal');\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_error_boundary__WEBPACK_IMPORTED_MODULE_3__.ErrorBoundary, {\n    key: \"et-vb-divi-modal--post-keyword-manager\",\n    componentName: \"et-vb-divi-modal--post-keyword-manager\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.WrapperContainer, {\n    dimension: null,\n    offset: null,\n    snappable: true,\n    expandable: true,\n    draggable: true,\n    resizable: true,\n    centered: false,\n    modalName: \"divi/post-keyword-manager\",\n    bodySiblingHeight: bodySiblingHeight\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.Header, {\n    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post Keyword Manager', 'et_builder')\n  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.BodyContainer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_2__.PanelContainer, {\n    id: \"post-keyword-manager\",\n    opened: true\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_keyword_form__WEBPACK_IMPORTED_MODULE_4__.KeywordForm, null)))));\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/modal/component.jsx?\n}");

/***/ }),

/***/ "./src/modal/keyword-form.css":
/*!************************************!*\
  !*** ./src/modal/keyword-form.css ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/modal/keyword-form.css?\n}");

/***/ }),

/***/ "./src/modal/keyword-form.jsx":
/*!************************************!*\
  !*** ./src/modal/keyword-form.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   KeywordForm: () => (/* binding */ KeywordForm)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _divi_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @divi/modal */ \"@divi/modal\");\n/* harmony import */ var _divi_modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_divi_modal__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _divi_field_library__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @divi/field-library */ \"@divi/field-library\");\n/* harmony import */ var _divi_field_library__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_divi_field_library__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hooks */ \"./src/hooks/index.js\");\n/* harmony import */ var _keyword_form_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyword-form.css */ \"./src/modal/keyword-form.css\");\n\n\n\n\n\n\n\n\n/**\n * Keyword Form Component.\n *\n * Displays post information, word count from et.builder.content.change hook,\n * and provides input for focus keyword management.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * This component demonstrates several important Divi patterns:\n *\n * 1. useSelect Hook:\n *    - Used to read data from Redux stores\n *    - Returns raw data only (no transformations inside useSelect)\n *    - Automatically re-renders when store data changes\n *    - Empty dependency array [] means \"select once and subscribe to changes\"\n *\n * 2. useDispatch Hook:\n *    - Used to get action dispatchers from Redux stores\n *    - Provides functions to update store state\n *\n * 3. Data Flow:\n *    - User types keyword → onChange handler → dispatch action → store updates\n *    - Hook fires → store updates → useSelect detects change → component re-renders\n *\n * Performance Note:\n * We follow the critical rule of NOT transforming data inside useSelect.\n * All data transformations happen outside the selector using useMemo.\n * This prevents unnecessary re-renders caused by new object references.\n *\n * @since 0.1.0\n *\n * @returns {React.ReactElement}\n */\nconst KeywordForm = () => {\n  // Use the custom hook for managing keyword data\n  const {\n    focusKeyword,\n    updateFocusKeyword\n  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_5__.usePostKeywordManager)();\n\n  // Get post data from Divi settings store\n  // Available post data includes: title, excerpt, content, status, type, id, etc.\n  const {\n    postTitle,\n    postId,\n    postType,\n    postStatus,\n    postExcerpt\n  } = (0,_divi_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {\n    const post = select('divi/settings').getSetting(['post']);\n    return {\n      postTitle: post?.title ?? '',\n      postId: post?.id ?? '',\n      postType: post?.type ?? '',\n      postStatus: post?.status ?? '',\n      postExcerpt: post?.excerpt ?? ''\n    };\n  }, []);\n\n  /**\n   * Handle keyword input change.\n   *\n   * This is called every time the user types in the keyword input field.\n   * It uses the custom hook to update both the store and persist to database.\n   *\n   * Note: The Text component from @divi/field-library passes an object with\n   * inputValue property, not a standard DOM event.\n   *\n   * @param {Object} params The change callback parameters.\n   * @param {string} [params.inputValue] The new input value.\n   */\n  const handleKeywordChange = params => {\n    const newKeyword = params.inputValue || '';\n    updateFocusKeyword(newKeyword);\n  };\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"keyword-form-container\",\n    id: \"keyword-form-container\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"keyword-form-post-info\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h4\", {\n    className: \"keyword-form-post-info-title\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Post Information', 'et_builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"keyword-form-post-info-content\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Title:', 'et_builder')), \" \", postTitle || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No title available', 'et_builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ID:', 'et_builder')), \" \", postId || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('N/A', 'et_builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type:', 'et_builder')), \" \", postType || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('N/A', 'et_builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Status:', 'et_builder')), \" \", postStatus || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('N/A', 'et_builder')), postExcerpt && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"strong\", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Excerpt:', 'et_builder')), \" \", postExcerpt.substring(0, 100), \"...\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_modal__WEBPACK_IMPORTED_MODULE_3__.FieldWrapper, {\n    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Focus Keyword', 'et_builder'),\n    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('This keyword is saved automatically to WordPress database as you type. Analysis runs when you save your post.', 'et_builder'),\n    id: \"post-keyword-focus-keyword\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_divi_field_library__WEBPACK_IMPORTED_MODULE_4__.Text, {\n    name: \"focusKeyword\",\n    value: focusKeyword,\n    onChange: handleKeywordChange,\n    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter your focus keyword...', 'et_builder')\n  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"keyword-form-notes\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h4\", {\n    className: \"keyword-form-notes-title\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Notes', 'et_builder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"p\", {\n    className: \"keyword-form-notes-text\"\n  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keyword density analysis runs automatically when you save your post. Check the browser console for detailed SEO analysis results.', 'et_builder'))));\n};\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/modal/keyword-form.jsx?\n}");

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

/***/ "@divi/field-library":
/*!****************************************!*\
  !*** external ["divi","fieldLibrary"] ***!
  \****************************************/
/***/ ((module) => {

module.exports = divi.fieldLibrary;

/***/ }),

/***/ "@divi/modal":
/*!*********************************!*\
  !*** external ["divi","modal"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = divi.modal;

/***/ }),

/***/ "@divi/rest":
/*!********************************!*\
  !*** external ["divi","rest"] ***!
  \********************************/
/***/ ((module) => {

module.exports = divi.rest;

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