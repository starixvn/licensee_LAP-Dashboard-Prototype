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
/******/ 		return __webpack_require__.p + "js/pages/analytics/" + ({"performance/performanceDashboard":"performance/performanceDashboard","summary/summaryDashboard":"summary/summaryDashboard"}[chunkId]||chunkId) + ".chunk.js"
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
/******/ 	__webpack_require__.p = "";
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
/******/ 	deferredModules.push(["./src/js/pages/dashboard/App.jsx","common/vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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

class DefaultLayout extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dashboard__container"
    }, this.props.children);
  }

}

/***/ }),

/***/ "./src/js/lib/constants.js":
/*!*********************************!*\
  !*** ./src/js/lib/constants.js ***!
  \*********************************/
/*! exports provided: getCurrentTime, langCode, tabMenuKey, CurrenyListApiUrl, widgetKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTime", function() { return getCurrentTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langCode", function() { return langCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuKey", function() { return tabMenuKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrenyListApiUrl", function() { return CurrenyListApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetKey", function() { return widgetKey; });
const getCurrentTime = () => {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear()
  };
};
const langCode = window.dashboardLangCode || 'en';
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

/***/ }),

/***/ "./src/js/lib/languageApi.js":
/*!***********************************!*\
  !*** ./src/js/lib/languageApi.js ***!
  \***********************************/
/*! exports provided: langCodeMapper, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "langCodeMapper", function() { return langCodeMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return languageApi; });
/* harmony import */ var _resources_resource_ch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../resources/resource.ch */ "./src/js/resources/resource.ch.js");
/* harmony import */ var _resources_resource_cs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resources/resource.cs */ "./src/js/resources/resource.cs.js");
/* harmony import */ var _resources_resource_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resources/resource.en */ "./src/js/resources/resource.en.js");
/* harmony import */ var _resources_resource_zhcn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/resource.zhcn */ "./src/js/resources/resource.zhcn.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./src/js/lib/constants.js");





const langCodeMapper = {
  'en': 'en-US',
  'cs': 'zh-CN'
};
class languageApi {
  static getRes(langcode, resKey) {
    switch (langcode) {
      case 'ch':
        return _resources_resource_ch__WEBPACK_IMPORTED_MODULE_0__["ch"][resKey];

      case 'cs':
        return _resources_resource_cs__WEBPACK_IMPORTED_MODULE_1__["cs"][resKey];

      case 'en':
        return _resources_resource_en__WEBPACK_IMPORTED_MODULE_2__["en"][resKey];

      case 'zhcn':
        return _resources_resource_zhcn__WEBPACK_IMPORTED_MODULE_3__["zhcn"][resKey];

      default:
        return _resources_resource_en__WEBPACK_IMPORTED_MODULE_2__["en"][resKey];
    }
  }

  static getDefaultRes(resKey) {
    return languageApi.getRes(_constants__WEBPACK_IMPORTED_MODULE_4__["langCode"], resKey);
  }

}

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
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/dashboard/lib/constants.js");
/* harmony import */ var _components_TabMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/TabMenu */ "./src/js/pages/dashboard/components/TabMenu.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







__webpack_require__.p = document.getElementById("public-path").value;
const SummaryDashboard = Promise.all(/*! import() | summary/summaryDashboard */[__webpack_require__.e("common/vendor"), __webpack_require__.e("summary/summaryDashboard")]).then(__webpack_require__.bind(null, /*! ../summary/index */ "./src/js/pages/summary/index.js"));
const PerformanceDashboard = Promise.all(/*! import() | performance/performanceDashboard */[__webpack_require__.e("common/vendor"), __webpack_require__.e("performance/performanceDashboard")]).then(__webpack_require__.bind(null, /*! ../performance/index */ "./src/js/pages/performance/index.js"));
const tabMenuList = [{
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["summary"],
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('summary'),
  component: react__WEBPACK_IMPORTED_MODULE_0___default.a.lazy(() => SummaryDashboard)
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["performance"],
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('performance'),
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

    this.state = {
      selectedTabMenu: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["performance"]
    };
  }

  render() {
    const {
      selectedTabMenu
    } = this.state;
    const componentIndex = tabMenuList.findIndex(p => p.key === selectedTabMenu);
    const TabComponent = componentIndex === -1 ? null : tabMenuList[componentIndex].component;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dashboard-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TabMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
      selectedTabMenu: selectedTabMenu,
      onClickTabMenu: this.onClickTabMenu,
      tabMenuList: tabMenuList
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layouts_DefaultLayout__WEBPACK_IMPORTED_MODULE_2__["default"], null, TabComponent && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
      fallback: react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Loading...")
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(TabComponent, null))));
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
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
    className: "tab-menu"
  }, tabMenuList.map(item => {
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
    href: "#!",
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

/***/ }),

/***/ "./src/js/resources/resource.ch.js":
/*!*****************************************!*\
  !*** ./src/js/resources/resource.ch.js ***!
  \*****************************************/
/*! exports provided: ch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ch", function() { return ch; });
const ch = {
  n_deposit: "存款(今日)",
  c_turnover: "交易额",
  c_licWL: "投注输赢",
  n_reg_customer: "已注册会员",
  c_online_customer: "在线会员",
  n_customer_balance: "会员馀额",
  n_pending_funds: "未结算金额",
  n_withdrawal: "提款(今日)",
  turnover_byplatform_month_todate: '交易額(當月累計)',
  deposit_today: "存款(今日)",
  licensee_winloss_month_todate: "投注輸贏(當月累計)",
  registered_customer: "已注册会员",
  online_customer: "在线会员",
  customer_balance: "会员馀额",
  pending_funds: "未结算金额",
  withdrawal_today: "提款(今日)",
  apply: "設定",
  currency: "会员币别",
  Based: "显示币别",
  Widgets: "小工具",
  total_registered_cus_today: "總註冊會員",
  deposit: "註冊且存款",
  none_deposit: "註冊未存款",
  Asia: "亞洲版",
  China: "大陸版",
  Euro: "歐洲版",
  Wap: "WAP手機",
  All: "全部",
  Web: "桌機版",
  total_turnover: "總交易額",
  total_winloss: "總投注輸贏",
  no_widget_permission: "You do not have sufficient permissions to access this page",
  reset_layout: "初始設定",
  Tablet: "平板",
  SmartSite: "行動裝置版",
  NewAsia: "新亞洲版",
  MobileApp: "Mobile App",
  Mobile: "Mobile",
  MobileLiteVersion: "Mobile Lite Version",
  DeepLink: "Deep Link",
  date: "",
  //
  measurement: "",
  submit: "",
  value: '',
  current_period: "",
  previous_period: "",
  summary: '',
  performance: '',
  overview: '',
  currency: '',
  product: '',
  bettype: '',
  platform: '',
  turnover: '',
  gross_profit: '',
  margin: '',
  marjor_table_title_currency: '',
  marjor_table_title_product: '',
  marjor_table_title_bettype: '',
  marjor_table_title_platform: '',
  comparison: '',
  growth: '',
  growth_rate: '',
  difference: '',
  distribution_chart_title_currency: '',
  distribution_chart_title_product: '',
  distribution_chart_title_bettype: '',
  distribution_chart_title_platform: '',
  overall_margin_growth: '',
  difference_table_title: ''
};

/***/ }),

/***/ "./src/js/resources/resource.cs.js":
/*!*****************************************!*\
  !*** ./src/js/resources/resource.cs.js ***!
  \*****************************************/
/*! exports provided: cs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cs", function() { return cs; });
const cs = {
  n_deposit: "存款(今日)",
  c_turnover: "交易额",
  c_licWL: "投注输赢",
  n_reg_customer: "已注册会员",
  c_online_customer: "在线会员",
  n_customer_balance: "会员馀额",
  n_pending_funds: "未结算金额",
  n_withdrawal: "提款(今日)",
  turnover_byplatform_month_todate: '交易额(当月累计)',
  deposit_today: "存款(今日)",
  licensee_winloss_month_todate: "投注输赢(当月累计)",
  registered_customer: "已註冊會員",
  online_customer: "在線會員",
  customer_balance: "會員餘額",
  pending_funds: "未結算金額",
  withdrawal_today: "提款(今日)",
  apply: "设定",
  currency: "会员币别",
  Based: "基础货币",
  Widgets: "小工具",
  total_registered_cus_today: "总注册会员",
  deposit: "注册且存款",
  none_deposit: "注册未存款",
  Asia: "亚洲版",
  China: "中国版",
  Euro: "欧洲版",
  Wap: "WAP",
  All: "全部",
  Web: "桌机版",
  total_turnover: "总交易额",
  total_winloss: "总投注输赢",
  no_widget_permission: "You do not have sufficient permissions to access this page",
  reset_layout: "初始设定",
  Tablet: "平板",
  SmartSite: "行动装置版",
  NewAsia: "新亚洲版",
  MobileApp: "手机 APP",
  Mobile: "手机版",
  MobileLiteVersion: "手机轻量版",
  DeepLink: "Deep Link",
  date: "",
  //
  measurement: '衡量单位',
  submit: '送出',
  cancel: '取消',
  value: '值',
  current_period: '币别期间',
  previous_period: '前一个区间',
  previous_year: '去年',
  last_month: '上个月',
  last_quarter: '上一季',
  last_3_months: '前三个月',
  last_6_months: '前六个月',
  summary: '总结',
  performance: '效益',
  overview: '概观',
  currency: '币别',
  product: '产品',
  bettype: '下注类型',
  platform: '平台',
  turnover: '营业额',
  gross_profit: '毛利',
  margin: '利润',
  marjor_table_title_currency: '主要变更 - 依币别',
  marjor_table_title_product: '主要变更 - 产品',
  marjor_table_title_bettype: '主要变更 - 下注类型',
  marjor_table_title_platform: '主要变更 - 平台',
  comparison: '比较',
  growth: '成长',
  growth_rate: '成长率',
  go_back: '返回',
  difference: '差异',
  distribution_chart_title_currency: '分配 - 前五币别',
  distribution_chart_title_product: '分配 - 前五产品',
  distribution_chart_title_bettype: '分配 - 前十下注类型',
  distribution_chart_title_platform: '分配 - 前五平台',
  overall_margin_growth: '整体利润成长',
  difference_table_title: '区间差异'
};

/***/ }),

/***/ "./src/js/resources/resource.en.js":
/*!*****************************************!*\
  !*** ./src/js/resources/resource.en.js ***!
  \*****************************************/
/*! exports provided: en */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "en", function() { return en; });
const en = {
  n_deposit: "Deposit (Today)",
  c_turnover: "Turnover by Platform",
  c_licWL: "Licensee Win Loss",
  n_reg_customer: "Registered customers",
  c_online_customer: "Online customers",
  n_customer_balance: "Customer Balance",
  n_pending_funds: "Pending Funds",
  n_withdrawal: "Withdraw (Today)",
  turnover_byplatform_month_todate: 'Turnover by Platform (Month to date)',
  deposit_today: "Deposit (Today)",
  licensee_winloss_month_todate: "Licensee Win Loss (Month to date)",
  registered_customer: "Registered customers",
  online_customer: "Online customers",
  customer_balance: "Customer Balance",
  pending_funds: "Pending Funds",
  withdrawal_today: "Withdrawal (today)",
  apply: "Apply",
  currency: "Currency",
  Based: "Base Currency",
  Widgets: "WIDGETS",
  total_registered_cus_today: "Total Registered Customers (to date)",
  deposit: "Deposit",
  none_deposit: "Non - Deposit",
  Asia: "Asia",
  China: "China",
  Euro: "Euro",
  Wap: "Wap",
  All: "All",
  Web: "Web",
  total_turnover: "Total Turnover",
  total_winloss: "Total Win Loss",
  no_widget_permission: "You do not have sufficient permissions to access this page",
  reset_layout: "Reset layout",
  Tablet: "Tablet",
  SmartSite: "Smart Site",
  NewAsia: "New Asia",
  MobileApp: "Mobile App",
  Mobile: "Mobile",
  MobileLiteVersion: "Mobile Lite Version",
  DeepLink: "Deep Link",
  date: "Date",
  //
  measurement: "Measurement",
  submit: "Submit",
  cancel: 'Cancel',
  value: 'Value',
  current_period: "Current Period",
  previous_period: "Previous Period",
  previous_year: 'Previous Year',
  last_month: 'Last month',
  last_quarter: 'Last quarter',
  last_3_months: 'Last 3 months',
  last_6_months: 'Last 6 months',
  summary: 'Summary',
  performance: 'Performance',
  overview: 'Overview',
  currency: 'Currency',
  product: 'Product',
  bettype: 'Bettype',
  platform: 'Platform',
  turnover: 'Turnover',
  gross_profit: 'Gross Profit',
  margin: 'Margin',
  marjor_table_title_currency: 'Major changes - by currency',
  marjor_table_title_product: 'Major changes - by product',
  marjor_table_title_bettype: 'Major changes - by bettype',
  marjor_table_title_platform: 'Major changes - by platform',
  comparison: 'Comparison',
  growth: 'Growth',
  growth_rate: 'Growth rate',
  go_back: 'Go back',
  difference: 'Difference',
  distribution_chart_title_currency: 'distribution - top 5 currencies',
  distribution_chart_title_product: 'distribution - top 5 products',
  distribution_chart_title_bettype: 'distribution - top 10 bettypes',
  distribution_chart_title_platform: 'distribution - top 5 platforms',
  overall_margin_growth: 'overall margin growth',
  difference_table_title: 'Differences between period'
};

/***/ }),

/***/ "./src/js/resources/resource.zhcn.js":
/*!*******************************************!*\
  !*** ./src/js/resources/resource.zhcn.js ***!
  \*******************************************/
/*! exports provided: zhcn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "zhcn", function() { return zhcn; });
const zhcn = {
  n_deposit: "存款(今日)",
  c_turnover: "交易額",
  c_licWL: "投注輸贏",
  n_reg_customer: "已註冊會員",
  c_online_customer: "在線會員",
  n_customer_balance: "會員餘額",
  n_pending_funds: "未結算金額",
  n_withdrawal: "提款(今日)",
  turnover_byplatform_month_todate: '交易额(当月累计)',
  deposit_today: "存款(今日)",
  licensee_winloss_month_todate: "投注输赢(当月累计)",
  registered_customer: "已註冊會員",
  online_customer: "在線會員",
  customer_balance: "會員餘額",
  pending_funds: "未結算金額",
  withdrawal_today: "提款(今日)",
  apply: "设定",
  currency: "會員幣別",
  Based: "顯示幣別",
  Widgets: "小工具",
  total_registered_cus_today: "总注册会员",
  deposit: "注册且存款",
  none_deposit: "注册未存款",
  Asia: "亚洲版",
  China: "大陆版",
  Euro: "欧洲版",
  Wap: "WAP手机",
  All: "全部",
  Web: "桌机版",
  total_turnover: "总交易额",
  total_winloss: "总投注输赢",
  no_widget_permission: "You do not have sufficient permissions to access this page",
  reset_layout: "初始设定",
  Tablet: "平板",
  SmartSite: "新亚洲版",
  MobileApp: "Mobile App",
  Mobile: "Mobile",
  MobileLiteVersion: "Mobile Lite Version",
  DeepLink: "Deep Link",
  date: "",
  //
  measurement: "",
  submit: "",
  value: '',
  current_period: "",
  previous_period: "",
  summary: '',
  performance: '',
  overview: '',
  currency: '',
  product: '',
  bettype: '',
  platform: '',
  turnover: '',
  gross_profit: '',
  margin: '',
  marjor_table_title_currency: '',
  marjor_table_title_product: '',
  marjor_table_title_bettype: '',
  marjor_table_title_platform: '',
  comparison: '',
  growth: '',
  growth_rate: '',
  difference: '',
  distribution_chart_title_currency: '',
  distribution_chart_title_product: '',
  distribution_chart_title_bettype: '',
  distribution_chart_title_platform: '',
  overall_margin_growth: '',
  difference_table_title: ''
};

/***/ })

/******/ });
//# sourceMappingURL=app.js.map