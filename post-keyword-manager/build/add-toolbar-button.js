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

/***/ "./src/add-toolbar-button.js":
/*!***********************************!*\
  !*** ./src/add-toolbar-button.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _divi_app_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @divi/app-ui */ \"@divi/app-ui\");\n/* harmony import */ var _divi_app_ui__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_divi_app_ui__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @divi/data */ \"@divi/data\");\n/* harmony import */ var _divi_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_divi_data__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n/**\n * Register toolbar button for Post Keyword Manager.\n *\n * This adds a button to the Visual Builder toolbar that opens/closes\n * the Post Keyword Manager modal. The button follows Divi's standard\n * pattern for toolbar integration.\n *\n * Educational Note for Third-Party Developers:\n * =============================================\n * The registerBuilderBarButton function is the standard way to add\n * custom buttons to the Divi Visual Builder toolbar. This provides\n * a consistent user experience and ensures your button integrates\n * properly with the builder's UI.\n *\n * Button Configuration:\n * - iconSvg: Reference to a registered icon (see registerIcons.js)\n * - label: Tooltip text shown on hover\n * - order: Position in toolbar (higher numbers appear later)\n * - name: Unique identifier for the button\n * - onClick: Handler function called when button is clicked\n *\n * @since 0.1.0\n */\n(0,_divi_app_ui__WEBPACK_IMPORTED_MODULE_0__.registerBuilderBarButton)({\n  iconSvg: {\n    name: 'post-keyword'\n  },\n  label: 'Post Keywords',\n  order: 22,\n  // After module-visibility-manager (21).\n  name: 'divi/post-keyword-manager',\n  onClick: () => {\n    // Check if the modal is currently active.\n    // This allows us to toggle the modal open/closed with the same button.\n    const isActive = (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.select)('divi/modal-library').getModal('divi/post-keyword-manager')?.isActive;\n    if (isActive) {\n      // Close modal if already open.\n      (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('divi/modal-library').close({\n        name: 'divi/post-keyword-manager'\n      });\n    } else {\n      // Open modal.\n      (0,_divi_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('divi/modal-library').open({\n        name: 'divi/post-keyword-manager'\n      });\n    }\n  }\n});\n\n//# sourceURL=webpack://d5-extension-example-modal-post-keyword/./src/add-toolbar-button.js?\n}");

/***/ }),

/***/ "@divi/app-ui":
/*!*********************************!*\
  !*** external ["divi","appUi"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = divi.appUi;

/***/ }),

/***/ "@divi/data":
/*!********************************!*\
  !*** external ["divi","data"] ***!
  \********************************/
/***/ ((module) => {

module.exports = divi.data;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/add-toolbar-button.js");
/******/ 	
/******/ })()
;