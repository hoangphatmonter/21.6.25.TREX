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

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nvar Dino_1 = __webpack_require__(/*! ./classes/Dino */ \"./src/classes/Dino.ts\");\r\nvar dino = new Dino_1.Dino(0, 0);\r\nvar lastTime = window.performance.now();\r\nrequestAnimationFrame(loop);\r\nfunction loop() {\r\n    var time = window.performance.now();\r\n    var delta = time - lastTime;\r\n    processInput();\r\n    update(time, delta);\r\n    render();\r\n    lastTime = time;\r\n    requestAnimationFrame(loop);\r\n}\r\nfunction processInput() {\r\n    document.addEventListener('keypress', function (event) {\r\n    });\r\n}\r\nfunction update(time, delta) {\r\n}\r\nfunction render() {\r\n    var canvas = document.getElementsByTagName('canvas')[0];\r\n    var c = canvas.getContext('2d');\r\n    c.beginPath();\r\n    c.moveTo(100, 100);\r\n    c.lineTo(400, 400);\r\n    c.stroke();\r\n    dino.draw(c);\r\n}\r\n\n\n//# sourceURL=webpack://trexproject/./src/app.ts?");

/***/ }),

/***/ "./src/classes/Dino.ts":
/*!*****************************!*\
  !*** ./src/classes/Dino.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Dino = void 0;\r\nvar Dino = /** @class */ (function () {\r\n    function Dino(xBottom, // ground cordinates\r\n    yBottom) {\r\n        this.xBottom = xBottom;\r\n        this.yBottom = yBottom;\r\n    }\r\n    Dino.prototype.getPosition = function () {\r\n        return [this.xBottom, this.yBottom];\r\n    };\r\n    Dino.prototype.draw = function (canvas) {\r\n        canvas.beginPath();\r\n        canvas.arc(this.xBottom, this.yBottom, 20, 0, Math.PI * 2, true);\r\n        canvas.fill();\r\n    };\r\n    return Dino;\r\n}());\r\nexports.Dino = Dino;\r\n\n\n//# sourceURL=webpack://trexproject/./src/classes/Dino.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;