/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"js/pages/analytics/dashboard/app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/pages/analytics/" + ({"performance/performanceDashboard":"performance/performanceDashboard","performance/performanceRightPanel":"performance/performanceRightPanel","summary/summaryDashboard":"summary/summaryDashboard","summary/summaryRightPanel":"summary/summaryRightPanel"}[chunkId]||chunkId) + ".chunk.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/pages/dashboard/App.jsx","vendors/common"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/components/RightPanel.jsx":
/*!******************************************!*\
  !*** ./src/js/components/RightPanel.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RightPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/lib/constants.js");


const SummaryRightPanel = Promise.all(/*! import() | summary/summaryRightPanel */[__webpack_require__.e("vendors/common"), __webpack_require__.e("summary/summaryRightPanel")]).then(__webpack_require__.bind(null, /*! ../pages/summary/components/SummaryRightPanel */ "./src/js/pages/summary/components/SummaryRightPanel.jsx"));
const PerformanceRightPanel = __webpack_require__.e(/*! import() | performance/performanceRightPanel */ "performance/performanceRightPanel").then(__webpack_require__.bind(null, /*! ../pages/performance/components/PerformanceRightPanel */ "./src/js/pages/performance/components/PerformanceRightPanel.jsx"));
const rightPanelList = [{
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuKey"].summary,
  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => SummaryRightPanel)
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuKey"].performance,
  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => PerformanceRightPanel)
}];
class RightPanel extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true
    };
  }

  _togglePanel() {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));
  }

  render() {
    const isHidden = this.state.isHidden ? '' : ' is-expanded';
    const {
      selectedTabMenu,
      langCode,
      initialWgStatus,
      callbackParent
    } = this.props;
    const componentIndex = rightPanelList.findIndex(p => p.key === selectedTabMenu);
    const RighPanelComponent = componentIndex === -1 ? null : rightPanelList[componentIndex].component;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `dashboard__right-panel${isHidden}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "right-panel-wrap"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: e => this._togglePanel(e),
      className: "icon-quickaccess js-icon-quickaccess"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-settings"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "right-panel-content"
    }, RighPanelComponent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
      fallback: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Loading...")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RighPanelComponent, {
      langCode: langCode,
      wgs: initialWgStatus,
      callbackParent: callbackParent
    })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "right-panel-overlay",
      onClick: e => this._togglePanel(e)
    }));
  }

}

/***/ }),

/***/ "./src/js/layouts/DefaultLayout.jsx":
/*!******************************************!*\
  !*** ./src/js/layouts/DefaultLayout.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DefaultLayout; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_RightPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/RightPanel */ "./src/js/components/RightPanel.jsx");


class DefaultLayout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedTabMenu,
      langCode,
      initialWgStatus,
      callbackParent
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dashboard__container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RightPanel__WEBPACK_IMPORTED_MODULE_1__["default"], {
      selectedTabMenu: selectedTabMenu,
      langCode: langCode,
      initialWgStatus: initialWgStatus,
      callbackParent: callbackParent
    }), this.props.children);
  }

}

/***/ }),

/***/ "./src/js/lib/constants.js":
/*!*********************************!*\
  !*** ./src/js/lib/constants.js ***!
  \*********************************/
/*! exports provided: tabMenuKey, CurrenyListApiUrl, widgetKey, baseCurrencyList, defaultBasedCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuKey", function() { return tabMenuKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenyListApiUrl", function() { return CurrenyListApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetKey", function() { return widgetKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseCurrencyList", function() { return baseCurrencyList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultBasedCurrency", function() { return defaultBasedCurrency; });
const tabMenuKey = {
  summary: 'summary',
  performance: 'performance'
};
const CurrenyListApiUrl = "GetCurrencyInfo";
const widgetKey = {
  NormalCustomerBalance: 'n_customer_balance',
  NormalPendingFund: 'n_pending_funds',
  NormalDeposit: 'n_deposit',
  NormalWithdrawal: 'n_withdrawal'
};
const baseCurrencyList = [{
  CurrencyId: "6",
  Currency: "EUR"
}, {
  CurrencyId: "3",
  Currency: "USD"
}, {
  CurrencyId: "12",
  Currency: "GBP"
}, {
  CurrencyId: "2",
  Currency: "MYR"
}, {
  CurrencyId: "13",
  Currency: "CNY"
}, {
  CurrencyId: "4",
  Currency: "THB"
}, {
  CurrencyId: "15",
  Currency: "IDR"
}, {
  CurrencyId: "51",
  Currency: "INH"
}];
const defaultBasedCurrency = window.defaultBaseCurrency;

/***/ }),

/***/ "./src/js/pages/dashboard/App.jsx":
/*!****************************************!*\
  !*** ./src/js/pages/dashboard/App.jsx ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DashboardApp; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _layouts_DefaultLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../layouts/DefaultLayout */ "./src/js/layouts/DefaultLayout.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/dashboard/lib/constants.js");
/* harmony import */ var _components_TabMenu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/TabMenu */ "./src/js/pages/dashboard/components/TabMenu.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const SummaryDashboard = Promise.all(/*! import() | summary/summaryDashboard */[__webpack_require__.e("vendors/common"), __webpack_require__.e("summary/summaryDashboard")]).then(__webpack_require__.bind(null, /*! ../summary/index */ "./src/js/pages/summary/index.js"));
const PerformanceDashboard = __webpack_require__.e(/*! import() | performance/performanceDashboard */ "performance/performanceDashboard").then(__webpack_require__.bind(null, /*! ../performance/App */ "./src/js/pages/performance/App.jsx"));
const tabMenuList = [{
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["summary"],
  name: 'Summary',
  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => SummaryDashboard)
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["performance"],
  name: 'Performance',
  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => PerformanceDashboard)
}];
class DashboardApp extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClickTabMenu", name => {
      this.setState({
        selectedTabMenu: name
      });
    });

    _defineProperty(this, "onChildReturnState", childState => {
      this.setState({
        childState
      });
    });

    _defineProperty(this, "onRightPanelChanged", newChildState => {
      this.setState({
        newChildState
      });
    });

    this.state = {
      newChildState: null,
      selectedTabMenu: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["performance"],
      childState: {
        langCode: null,
        wgStatus: null
      }
    };
  }

  render() {
    const {
      selectedTabMenu,
      newChildState,
      childState
    } = this.state;
    const componentIndex = tabMenuList.findIndex(p => p.key === selectedTabMenu);
    const TabComponent = componentIndex === -1 ? null : tabMenuList[componentIndex].component;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dashboard-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TabMenu__WEBPACK_IMPORTED_MODULE_4__["default"], {
      selectedTabMenu: selectedTabMenu,
      onClickTabMenu: this.onClickTabMenu,
      tabMenuList: tabMenuList
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_DefaultLayout__WEBPACK_IMPORTED_MODULE_2__["default"], {
      selectedTabMenu: selectedTabMenu,
      langCode: childState.langCode,
      initialWgStatus: childState.wgStatus,
      callbackParent: this.onRightPanelChanged
    }, TabComponent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
      fallback: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Loading...")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabComponent, {
      newState: newChildState,
      onChildReturnState: this.onChildReturnState,
      isSelected: true
    }))));
  }

}
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DashboardApp, null), document.getElementById("dashboard"));

/***/ }),

/***/ "./src/js/pages/dashboard/components/TabMenu.jsx":
/*!*******************************************************!*\
  !*** ./src/js/pages/dashboard/components/TabMenu.jsx ***!
  \*******************************************************/
/*! exports provided: TabMenu, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabMenu", function() { return TabMenu; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/service */ "./src/js/pages/dashboard/lib/service.js");
/* harmony import */ var _TabMenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TabMenuItem */ "./src/js/pages/dashboard/components/TabMenuItem.jsx");



const TabMenu = props => {
  const {
    selectedTabMenu,
    onClickTabMenu,
    tabMenuList
  } = props;
  const selectedTabMenuItem = tabMenuList.find(p => p.key === selectedTabMenu);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, tabMenuList.map(item => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TabMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
      key: item.key,
      item: item,
      isActive: Object(_lib_service__WEBPACK_IMPORTED_MODULE_1__["isActiveTabMenu"])(selectedTabMenuItem, item),
      onClickTabMenu: onClickTabMenu
    });
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TabMenu));

/***/ }),

/***/ "./src/js/pages/dashboard/components/TabMenuItem.jsx":
/*!***********************************************************!*\
  !*** ./src/js/pages/dashboard/components/TabMenuItem.jsx ***!
  \***********************************************************/
/*! exports provided: TabMenuItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabMenuItem", function() { return TabMenuItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const TabMenuItem = props => {
  const {
    item,
    isActive,
    onClickTabMenu
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
    key: item.key
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "javascript:;",
    className: isActive ? 'active' : '',
    onClick: () => onClickTabMenu(item.key)
  }, item.name));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TabMenuItem));

/***/ }),

/***/ "./src/js/pages/dashboard/lib/constants.js":
/*!*************************************************!*\
  !*** ./src/js/pages/dashboard/lib/constants.js ***!
  \*************************************************/
/*! exports provided: summary, performance */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "summary", function() { return summary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "performance", function() { return performance; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");

const summary = _lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].summary;
const performance = _lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].performance;

/***/ }),

/***/ "./src/js/pages/dashboard/lib/service.js":
/*!***********************************************!*\
  !*** ./src/js/pages/dashboard/lib/service.js ***!
  \***********************************************/
/*! exports provided: isActiveTabMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isActiveTabMenu", function() { return isActiveTabMenu; });
const isActiveTabMenu = (selectedTabMenu, tabMenuItem) => {
  return selectedTabMenu && selectedTabMenu.key === tabMenuItem.key;
};

/***/ })

/******/ });
//# sourceMappingURL=app.js.map