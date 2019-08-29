(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["summary/summaryDashboard"],{

/***/ "./src/js/actions/currencyAction.js":
/*!******************************************!*\
  !*** ./src/js/actions/currencyAction.js ***!
  \******************************************/
/*! exports provided: getCurrencyInfo, setBaseCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrencyInfo", function() { return getCurrencyInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBaseCurrency", function() { return setBaseCurrency; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./src/js/actions/types.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/widgetApi */ "./src/js/lib/widgetApi.js");



const getCurrencyInfo = () => {
  return dispatch => {
    var param = {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["CurrenyListApiUrl"],
      IsCrossSite: false
    };
    _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__["default"].fetchData(param).then(response => {
      response.data.Currency.unshift({
        Currency: "All",
        CurrencyId: "0"
      });
      dispatch(setCurrencyInfo({
        Currency: response.data.Currency,
        BaseCurrency: response.data.BaseCurrency
      }));
    }).catch(function (error) {
      console.log("error:", error);
    });
  };
};

const setCurrencyInfo = newData => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENCY_INFO"],
    data: newData
  };
};

const setBaseCurrency = newData => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_BASE_CURRENCY"],
    data: newData
  };
};

/***/ }),

/***/ "./src/js/actions/index.js":
/*!*********************************!*\
  !*** ./src/js/actions/index.js ***!
  \*********************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _currencyAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./currencyAction */ "./src/js/actions/currencyAction.js");

const ActionCreators = Object.assign({}, _currencyAction__WEBPACK_IMPORTED_MODULE_0__);

/***/ }),

/***/ "./src/js/actions/types.js":
/*!*********************************!*\
  !*** ./src/js/actions/types.js ***!
  \*********************************/
/*! exports provided: SET_CURRENCY_INFO, SET_BASE_CURRENCY, SET_DATE_RANGE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENCY_INFO", function() { return SET_CURRENCY_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BASE_CURRENCY", function() { return SET_BASE_CURRENCY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_DATE_RANGE", function() { return SET_DATE_RANGE; });
const SET_CURRENCY_INFO = "SET_CURRENCY_INFO";
const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
const SET_DATE_RANGE = "SET_DATE_RANGE";

/***/ }),

/***/ "./src/js/components/AutoReload.jsx":
/*!******************************************!*\
  !*** ./src/js/components/AutoReload.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoReload; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/localStorageHelper */ "./src/js/lib/localStorageHelper.js");


class AutoReload extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    const countdowns = _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getWidgetReloadCountdown();
    let countdown = countdowns[this.props.dataKey];

    if (!countdown) {
      countdown = this.props.defaultCountdown;
    }

    this.countdownValues = this.props.countdownValues;
    this.state = {
      countdown: countdown,
      currentCountdown: countdown,
      isShowSelection: false,
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => {
      if (this.state.countdown > 0) {
        this._startTimer();
      }
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });

    this._stopTimer();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.isLoading && prevProps.isLoading) {
      if (!prevState.currentCountdown) {
        this.setState({
          currentCountdown: prevState.countdown
        });
      }

      if (!this.timerId) {
        this._startTimer();
      }
    }
  }

  _onTick() {
    if (this.state.isMounted && !this.props.isLoading) {
      let countdown = this.state.currentCountdown;

      if (countdown === 0) {
        this._stopTimer();

        this.props.reloadCallback();
      } else {
        this.setState({
          currentCountdown: countdown - 1
        });
      }
    }
  }

  _startTimer() {
    this.timerId = setInterval(() => this._onTick(), 1000);
  }

  _stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = 0;
    }
  }

  _onCounterClick() {
    if (this.state.isMounted && !this.props.isLoading) {
      this.setState({
        isShowSelection: !this.state.isShowSelection
      });
    }
  }

  _onSelectCounterValue(value) {
    if (this.state.isMounted) {
      this.setState({
        isShowSelection: false,
        countdown: value,
        currentCountdown: value
      });
      const countdowns = _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getWidgetReloadCountdown();
      countdowns[this.props.dataKey] = value;
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_1__["default"].saveWidgetReloadCountdown(countdowns);
    }
  }

  render() {
    var className = "btn-refresh right border-" + (this.props.colorMode || "white");
    const selection = this.state.isShowSelection ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "dropdown-timer"
    }, (this.countdownValues || []).map(value => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: value,
      onClick: () => this._onSelectCounterValue(value)
    }, value))) : null;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: className,
      onClick: () => this._onCounterClick(),
      disabled: !!this.props.isLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-refresh"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "currentCountdown"
    }, this.state.currentCountdown + 's'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "icon-menu-down"
    }), selection);
  }

}

/***/ }),

/***/ "./src/js/components/Loader.jsx":
/*!**************************************!*\
  !*** ./src/js/components/Loader.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Loader; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/lib/constants.js");


const baseNormalWidgets = [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalCustomerBalance, _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalPendingFund, _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalDeposit, _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalWithdrawal];
class Loader extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "loading-process",
      style: {
        display: `${this.props.isLoading ? 'block' : 'none'}`
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "icon-loading"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `loader-inner ball-beat ${baseNormalWidgets.filter(x => x === this.props.widgetKey).length > 0 ? 'loader-white' : ''}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null))));
  }

}

/***/ }),

/***/ "./src/js/components/WidgetBox.jsx":
/*!*****************************************!*\
  !*** ./src/js/components/WidgetBox.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WidgetBox; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Loader */ "./src/js/components/Loader.jsx");
/* harmony import */ var _AutoReload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AutoReload */ "./src/js/components/AutoReload.jsx");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




class WidgetBox extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
  }

  toggleClose() {
    var item = Object.assign({}, this.props.wgItem);
    item.enable = !item.enable;
    this.props.callbackParent({
      action: 'wgSyncStatus',
      items: [item]
    });
  }

  render() {
    const isClosed = this.props.wgItem.enable ? '' : 'is-closed';
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `widgetbox ${isClosed}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `widgetbox-header ${this.props.widgetName}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "title"
    }, this.props.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "icon-wrapper right"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: () => this.toggleClose(),
      className: "icon icon-close"
    })), !!this.props.countdownConfigs ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AutoReload__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, this.props.countdownConfigs, {
      dataKey: this.props.widgetKey,
      isLoading: this.props.isLoading
    })) : null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `widgetbox-content ${this.props.widgetName}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isLoading: this.props.isLoading,
      widgetKey: this.props.widgetKey
    }), " ", this.props.children));
  }

}

/***/ }),

/***/ "./src/js/layouts/widgetLayout.js":
/*!****************************************!*\
  !*** ./src/js/layouts/widgetLayout.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return widgetLayout; });
/* harmony import */ var _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/localStorageHelper */ "./src/js/lib/localStorageHelper.js");

class widgetLayout {
  static getWidgetStatusSettings(permissions = [], widgetKey) {
    const defaultKeys = Object.keys(widgetKey).map(key => widgetKey[key]);
    const wgStatus = [];
    permissions.forEach(key => {
      if (defaultKeys.indexOf(key) >= 0) {
        wgStatus.push({
          key: key,
          enable: true
        });
      }
    });
    return wgStatus;
  }

  static mergeWidgetStatusSettingsToUserSettings(widgetStatus) {
    const userWgStatus = _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getWidgetStatus();
    return userWgStatus ? widgetStatus.map(widget => Object.assign({}, widget, userWgStatus.find(w => w.key === widget.key))) : widgetStatus;
  }

  static getWidgetLayoutSettings(wgLayouts) {
    let userWidgetLayouts = _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getWidgetLayout();

    if (!userWidgetLayouts) {
      userWidgetLayouts = widgetLayout._createEmptyLayout(wgLayouts);
    }

    const widgetStatus = _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getWidgetStatus();

    let layouts = widgetLayout._createEmptyLayout(wgLayouts);

    widgetStatus.forEach(status => {
      if (status.enable) {
        let _widgetLayout = widgetLayout._getWidgetLayoutByKey(userWidgetLayouts, status.key) || widgetLayout._getWidgetLayoutByKey(wgLayouts, status.key);

        layouts = widgetLayout._addWidgetToLayout(layouts, _widgetLayout);
      }
    });
    return layouts;
  }

  static syncLayoutWithNewStatus(newStatus, widgetStatus, _widgetLayouts, wgLayouts) {
    let newWidgetStatus = [...widgetStatus];
    let newLayouts = Object.assign({}, _widgetLayouts);
    let removedLayouts = _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getRemovedWidgetLayout();
    const me = widgetLayout;
    newStatus.forEach(widgetItem => {
      let status = newWidgetStatus.find(w => w.key === widgetItem.key);

      if (status.enable === widgetItem.enable) {
        return;
      }

      status.enable = widgetItem.enable;

      if (status.enable) {
        const addedItem = removedLayouts[widgetItem.key] || me._getWidgetLayoutByKey(wgLayouts, widgetItem.key);

        newLayouts = me._addWidgetToLayout(newLayouts, addedItem);
        removedLayouts[widgetItem.key] = null;
      } else {
        const remmovedItem = me._getWidgetLayoutByKey(newLayouts, widgetItem.key);

        newLayouts = me._removeWidgetFromLayout(newLayouts, widgetItem.key);
        removedLayouts[widgetItem.key] = remmovedItem;
      }
    });
    return {
      newWidgetStatus,
      newLayouts,
      removedLayouts
    };
  }

  static _removeWidgetFromLayout(layouts, key) {
    const filter = w => w.i !== key;

    const newLayout = {};

    if (layouts) {
      Object.keys(layouts).forEach(breakpoint => {
        newLayout[breakpoint] = layouts[breakpoint].filter(filter);
      });
    }

    return newLayout;
  }

  static _addWidgetToLayout(layouts, _widgetLayout) {
    const newLayouts = {};
    const breakpoints = Object.keys(layouts);
    let isValid = true;
    breakpoints.forEach(breakpoint => {
      if (!_widgetLayout[breakpoint]) {
        return isValid = false;
      }

      newLayouts[breakpoint] = [...layouts[breakpoint]];
      newLayouts[breakpoint].push(_widgetLayout[breakpoint]);
    });
    return isValid ? newLayouts : layouts;
  }

  static _getWidgetLayoutByKey(layouts, key) {
    const _widgetLayout = {};
    let isValid = true;
    Object.keys(layouts).forEach(breakpoint => {
      _widgetLayout[breakpoint] = layouts[breakpoint].find(w => w.i === key);

      if (!_widgetLayout[breakpoint]) {
        isValid = false;
      }
    });
    return isValid ? _widgetLayout : null;
  }

  static _createEmptyLayout(wgLayouts) {
    const layouts = {};
    Object.keys(wgLayouts).forEach(breakpoint => layouts[breakpoint] = []);
    return layouts;
  }

}

/***/ }),

/***/ "./src/js/lib/createReducer.js":
/*!*************************************!*\
  !*** ./src/js/lib/createReducer.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return createReducer; });
function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}

/***/ }),

/***/ "./src/js/lib/languageApi.js":
/*!***********************************!*\
  !*** ./src/js/lib/languageApi.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return languageApi; });
/* harmony import */ var _resources_resource_ch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../resources/resource.ch */ "./src/js/resources/resource.ch.js");
/* harmony import */ var _resources_resource_cs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../resources/resource.cs */ "./src/js/resources/resource.cs.js");
/* harmony import */ var _resources_resource_en__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../resources/resource.en */ "./src/js/resources/resource.en.js");
/* harmony import */ var _resources_resource_zhcn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../resources/resource.zhcn */ "./src/js/resources/resource.zhcn.js");




class languageApi {
  static getRes(langcode, resKey) {
    switch (langcode) {
      case "ch":
        return _resources_resource_ch__WEBPACK_IMPORTED_MODULE_0__["ch"][resKey];

      case "cs":
        return _resources_resource_cs__WEBPACK_IMPORTED_MODULE_1__["cs"][resKey];

      case "en":
        return _resources_resource_en__WEBPACK_IMPORTED_MODULE_2__["en"][resKey];

      case "zhcn":
        return _resources_resource_zhcn__WEBPACK_IMPORTED_MODULE_3__["zhcn"][resKey];

      default:
        return _resources_resource_en__WEBPACK_IMPORTED_MODULE_2__["en"][resKey];
    }
  }

}

/***/ }),

/***/ "./src/js/lib/localStorageHelper.js":
/*!******************************************!*\
  !*** ./src/js/lib/localStorageHelper.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return localStorageHelper; });
const widgetVersionCacheKey = "_LAP_Dashboard_Wg_Version";
const widgetStatusCacheKey = "_LAP_Dashboard_Wg_Status";
const widgetLayoutCacheKey = "_LAP_Dashboard_Wg_Layout";
const widgetLayoutRemovedCacheKey = "_LAP_Dashboard_Wg_Layout_removed";
const widgetReloadCountdownCacheKey = "_LAP_Dashboard_Wg_Reload_Countdown";
class localStorageHelper {
  static clearLayoutSettingIfNewVersion() {
    var scriptElement = document.getElementById("dashboard-script");

    if (!scriptElement) {
      return;
    }

    var jsVersions = scriptElement.src.match(/v=\d*/);

    if (!jsVersions) {
      return;
    }

    var newVersion = jsVersions[0];
    var cacheVersion = window.localStorage.getItem(widgetVersionCacheKey);

    if (newVersion !== cacheVersion) {
      window.localStorage.setItem(widgetVersionCacheKey, newVersion);
      localStorageHelper.clearWidgetCache();
    }
  }

  static clearWidgetCache() {
    window.localStorage.removeItem(widgetStatusCacheKey);
    window.localStorage.removeItem(widgetLayoutCacheKey);
    window.localStorage.removeItem(widgetLayoutRemovedCacheKey);
  }

  static saveWidgetStatus(wgs) {
    try {
      window.localStorage.setItem(widgetStatusCacheKey, JSON.stringify(wgs));
    } catch (error) {
      alert("To continue use dashboard. Please turn private browsing off!!");
    }
  }

  static getWidgetStatus() {
    var item = window.localStorage.getItem(widgetStatusCacheKey);
    return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : null;
  }

  static saveWidgetLayout(layout) {
    try {
      window.localStorage.setItem(widgetLayoutCacheKey, JSON.stringify(layout));
    } catch (error) {
      alert("To continue use dashboard. Please turn private browsing off!!");
    }
  }

  static getWidgetLayout() {
    var item = window.localStorage.getItem(widgetLayoutCacheKey);
    return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : null;
  }

  static saveRemovedWidgetLayout(layout) {
    try {
      window.localStorage.setItem(widgetLayoutRemovedCacheKey, JSON.stringify(layout));
    } catch (error) {
      alert("To continue use dashboard. Please turn private browsing off!!");
    }
  }

  static getRemovedWidgetLayout() {
    var item = window.localStorage.getItem(widgetLayoutRemovedCacheKey);
    return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : {};
  }

  static getWidgetReloadCountdown() {
    var item = window.localStorage.getItem(widgetReloadCountdownCacheKey);
    return item && item !== "undefined" && item !== "null" ? JSON.parse(item) : {};
  }

  static saveWidgetReloadCountdown(values) {
    try {
      window.localStorage.setItem(widgetReloadCountdownCacheKey, JSON.stringify(values));
    } catch (error) {
      window.alert("To continue use dashboard. Please turn private browsing off!!");
    }
  }

}

/***/ }),

/***/ "./src/js/lib/numberFormat.js":
/*!************************************!*\
  !*** ./src/js/lib/numberFormat.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return numberFormat; });
class numberFormat {
  static formatCurrency(value = 0, currency) {
    const currencies = {
      "EUR": "€",
      "GBP": "£",
      "USD": "$",
      "CNY": "¥",
      "MYR": "RM",
      "THB": "฿",
      "IDR": "Rp"
    };
    currency = currencies[currency] ? currencies[currency] : '';
    return `${currency}${this.format(value, 2)}`;
  }

  static formatDecimal(value) {
    return this.format(value, 2);
  }

  static format(value, digits = 0) {
    return value.toFixed(digits).replace(/(\d)(?=(\d{3})+(\.|$))/g, "$1,");
  }

}

/***/ }),

/***/ "./src/js/lib/widgetApi.js":
/*!*********************************!*\
  !*** ./src/js/lib/widgetApi.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return widgetApi; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const defaultHostUrl = "http://ha.nexdev.net:7611/LAP/12bet";
class widgetApi {
  static _getAuthToken(action) {
    var tokenUrl = window.TokenUrl || defaultHostUrl + "/Verify/ApplyApiToken?type=1&actionLink={0}&_=" + new Date().getTime();
    tokenUrl = tokenUrl.replace("{0}", encodeURIComponent(action));
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(tokenUrl, {});
  }

  static fetchData(param) {
    var data = param.Data || {};

    if (param.IsCrossSite) {
      return widgetApi._getAuthToken(param.Url).then(response => {
        data['X-Auth-Token'] = response.data.Token;
        const dataUrl = response.data.ApiUrl + param.Url;
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(dataUrl, {
          params: data
        });
      });
    } else {
      var lapRootUrl = window.HostUrl || defaultHostUrl;
      const lapApi = lapRootUrl.replace("SessionIsAlive", param.Url);
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(lapApi, {
        params: data
      });
    }
  }

}

/***/ }),

/***/ "./src/js/pages/summary/App.jsx":
/*!**************************************!*\
  !*** ./src/js/pages/summary/App.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_grid_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-grid-layout */ "./node_modules/react-grid-layout/index.js");
/* harmony import */ var react_grid_layout__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_chart_Turnover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/chart/Turnover */ "./src/js/pages/summary/components/chart/Turnover.jsx");
/* harmony import */ var _components_chart_OnlineCustomer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/chart/OnlineCustomer */ "./src/js/pages/summary/components/chart/OnlineCustomer.jsx");
/* harmony import */ var _components_chart_LicenseeWinLoss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/chart/LicenseeWinLoss */ "./src/js/pages/summary/components/chart/LicenseeWinLoss.jsx");
/* harmony import */ var _components_normal_Deposit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/normal/Deposit */ "./src/js/pages/summary/components/normal/Deposit.jsx");
/* harmony import */ var _components_normal_Withdrawal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/normal/Withdrawal */ "./src/js/pages/summary/components/normal/Withdrawal.jsx");
/* harmony import */ var _components_normal_PendingFunds__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/normal/PendingFunds */ "./src/js/pages/summary/components/normal/PendingFunds.jsx");
/* harmony import */ var _components_normal_CustomerBalance__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/normal/CustomerBalance */ "./src/js/pages/summary/components/normal/CustomerBalance.jsx");
/* harmony import */ var _components_normal_RegisteredCustomer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/normal/RegisteredCustomer */ "./src/js/pages/summary/components/normal/RegisteredCustomer.jsx");
/* harmony import */ var _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../layouts/widgetLayout */ "./src/js/layouts/widgetLayout.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/summary/lib/constants.js");
/* harmony import */ var _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../lib/localStorageHelper */ "./src/js/lib/localStorageHelper.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../actions/index */ "./src/js/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");


















class SummaryDashboard extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].clearLayoutSettingIfNewVersion();
    const langCode = window.dashboardLangCode || 'en';
    const permission = window.widgetPermission;

    if (!permission || !permission.length) {
      alert(_lib_languageApi__WEBPACK_IMPORTED_MODULE_11__["default"].getRes(langCode, 'no_widget_permission'));
    }

    this.state = Object.assign({
      langCode: langCode,
      refresh: 0,
      selectedFilter: {
        currency: 0,
        baseCurrency: _lib_constants__WEBPACK_IMPORTED_MODULE_12__["defaultBasedCurrency"]
      },
      isMounted: false
    }, this._getLayoutSettings());
    this._responsiveReactGridLayout = Object(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__["WidthProvider"])(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__["Responsive"]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMounted && this.props.newState && this.props.newState !== prevProps.newState) {
      this.onChildChanged(this.props.newState);
    }
  }

  _renderWgItem(key) {
    const keyToWidget = {
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].ChartTurnover]: _components_chart_Turnover__WEBPACK_IMPORTED_MODULE_2__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].ChartLicenseeWL]: _components_chart_LicenseeWinLoss__WEBPACK_IMPORTED_MODULE_4__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].NormalDeposit]: _components_normal_Deposit__WEBPACK_IMPORTED_MODULE_5__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].ChartlOnlineCustomer]: _components_chart_OnlineCustomer__WEBPACK_IMPORTED_MODULE_3__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].NormalPendingFund]: _components_normal_PendingFunds__WEBPACK_IMPORTED_MODULE_7__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].NormalRegisterCustomer]: _components_normal_RegisteredCustomer__WEBPACK_IMPORTED_MODULE_9__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].NormalCustomerBalance]: _components_normal_CustomerBalance__WEBPACK_IMPORTED_MODULE_8__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"].NormalWithdrawal]: _components_normal_Withdrawal__WEBPACK_IMPORTED_MODULE_6__["default"]
    };
    const Widget = keyToWidget[key];
    var itemStatus = this.state.wgStatus.find(x => x.key === key);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: key
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Widget, {
      wgItemFromParent: itemStatus,
      callbackParent: newState => this.onChildChanged(newState),
      filter: this.state.selectedFilter,
      refresh: this.state.refresh,
      langCode: this.state.langCode
    }));
  }

  _resetLayout() {
    if (this.state.isMounted) {
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].clearWidgetCache();

      const result = this._getLayoutSettings();

      this.props.onChildReturnState({
        langCode: this.state.langCode,
        wgStatus: result.wgStatus
      });
      this.setState(result);
    }
  }

  _getLayoutSettings() {
    const wgStatus = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_10__["default"].getWidgetStatusSettings(window.widgetPermission, _lib_constants__WEBPACK_IMPORTED_MODULE_12__["widgetKey"]);
    const userWgStatus = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_10__["default"].mergeWidgetStatusSettingsToUserSettings(wgStatus);
    _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].saveWidgetStatus(userWgStatus);
    const userWidgetLayouts = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_10__["default"].getWidgetLayoutSettings(_lib_constants__WEBPACK_IMPORTED_MODULE_12__["wgLayouts"]);
    _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].saveWidgetLayout(userWidgetLayouts);
    return {
      wgStatus: userWgStatus,
      layouts: userWidgetLayouts
    };
  }

  onChildChanged(newState) {
    if (this.state.isMounted && newState.action == 'apply') {
      this.setState(pre => ({
        refresh: pre.refresh + 1,
        selectedFilter: newState.filter
      }));
    } else if (newState.action == 'reset') {
      this._resetLayout();
    } else if (newState.items && newState.items.length) {
      const syncResult = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_10__["default"].syncLayoutWithNewStatus(newState.items, this.state.wgStatus, this.state.layouts, _lib_constants__WEBPACK_IMPORTED_MODULE_12__["wgLayouts"]);
      const wgStatus = syncResult.newWidgetStatus;
      this.props.onChildReturnState({
        langCode: this.state.langCode,
        wgStatus
      });
      this.setState({
        layouts: syncResult.newLayouts,
        wgStatus
      });
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].saveWidgetStatus(syncResult.newWidgetStatus);
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].saveWidgetLayout(syncResult.newLayouts);
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].saveRemovedWidgetLayout(syncResult.removedLayouts);
    }
  }

  onLayoutChange(layout, layouts) {
    if (this.state.isMounted) {
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_13__["default"].saveWidgetLayout(layouts);
      this.setState({
        wgStatus: this.state.wgStatus,
        layouts: layouts
      });
    }
  }

  get isTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
    const {
      langCode,
      wgStatus
    } = this.state;
    this.props.isSelected && this.props.onChildReturnState({
      langCode,
      wgStatus
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    const ResponsiveReactGridLayout = this._responsiveReactGridLayout;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResponsiveReactGridLayout, {
      className: "layout",
      layouts: this.state.layouts,
      rowHeight: 25,
      onLayoutChange: (layout, layouts) => this.onLayoutChange(layout, layouts),
      breakpoints: {
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0
      },
      cols: {
        lg: 12,
        md: 10,
        sm: 6,
        xs: 4,
        xxs: 2
      },
      isDraggable: !this.isTouchScreen
    }, this.state.wgStatus.filter(i => i.enable).map(item => this._renderWgItem(item.key)));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_14__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_15__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, state);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_16__["connect"])(mapStateToProps, mapDispatchToProps)(SummaryDashboard));

/***/ }),

/***/ "./src/js/pages/summary/components/chart/LicenseeWinLoss.jsx":
/*!*******************************************************************!*\
  !*** ./src/js/pages/summary/components/chart/LicenseeWinLoss.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LicenseeWinLoss; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _components_WidgetBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/WidgetBox */ "./src/js/components/WidgetBox.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");







class LicenseeWinLoss extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      total: 0,
      isLoading: true,
      isMounted: false
    };
    this.options = {
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        onComplete: function () {
          const self = this,
                chart = this.chart,
                ctx = chart.ctx;
          ctx.textAlign = "center";
          ctx.fillStyle = "#555";
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          self.data.datasets.forEach(function (dataset, datasetIndex) {
            const meta = self.getDatasetMeta(datasetIndex);
            meta.data.forEach(function (element, elementIndex) {
              const value = dataset.data[elementIndex];
              const text = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_5__["default"].formatDecimal(value);
              const textWidth = ctx.measureText(text).width;
              const yOffset = value > 0 ? 6 : -7;
              ctx.fillText(text, element._model.x - textWidth / 2, element._model.y - yOffset);
            });
          });
        }
      },
      layout: {
        padding: {
          top: 20,
          bottom: 50
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          }
        }],
        yAxes: [{
          ticks: {
            callback: function (value, index, values) {
              return _lib_numberFormat__WEBPACK_IMPORTED_MODULE_5__["default"].format(value);
            }
          }
        }]
      },
      legend: {
        display: false
      }
    };
  }

  fetchData(props) {
    var param = {
      Data: {
        CurrencyId: props.filter.currency,
        BaseCurrency: props.filter.baseCurrency
      },
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["widgetApiUrl"].ChartLicenseeWL,
      IsCrossSite: true
    };
    _lib_widgetApi__WEBPACK_IMPORTED_MODULE_4__["default"].fetchData(param).then(response => {
      var labelList = [],
          dataList = [];

      for (var item of response.data.Data) {
        labelList.push(_lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getRes(this.props.langCode, item.Key) || item.Key);
        dataList.push(item.Value);
      }

      this.setState({
        total: response.data.Total,
        data: {
          labels: labelList,
          datasets: [{
            data: dataList,
            backgroundColor: ["#35A1FB", "#4B966B", "#4C6375", "#D9544F", "#4473C5", "#AFBF22", "#FFEC8B", "#BBFFFF", "#B8E9D5", "#FF66C1"]
          }]
        },
        isLoading: false
      });
    }).catch(function (error) {
      console.log("error:", error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted && this.props.refresh > prevProps.refresh) {
      this.setState({
        isLoading: true
      });
      this.fetchData(this.props);
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => this.fetchData(this.props));
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_WidgetBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
      callbackParent: this.props.callbackParent,
      wgItem: this.props.wgItemFromParent,
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getRes(this.props.langCode, "licensee_winloss_month_todate"),
      widgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["widgetKey"].ChartLicenseeWL,
      widgetName: "licenseewl default",
      isLoading: this.state.isLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
      data: this.state.data,
      options: this.options
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "footer-total"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getRes(this.props.langCode, "total_winloss"), ": ", _lib_numberFormat__WEBPACK_IMPORTED_MODULE_5__["default"].formatCurrency(this.state.total, this.props.filter.baseCurrency))));
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/chart/OnlineCustomer.jsx":
/*!******************************************************************!*\
  !*** ./src/js/pages/summary/components/chart/OnlineCustomer.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OnlineCustomer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _components_WidgetBox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../components/WidgetBox */ "./src/js/components/WidgetBox.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");







class OnlineCustomer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    const fontColor = "#5162BA";
    this.state = {
      data: {
        labels: [_lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getRes(this.props.langCode, "Web"), _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getRes(this.props.langCode, "Wap"), _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getRes(this.props.langCode, "SmartSite")],
        datasets: []
      },
      isLoading: true,
      isMounted: false
    };
    this.options = {
      beginAtZero: true,
      type: 'line',
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        onComplete: function () {
          var self = this,
              chart = this.chart,
              ctx = chart.ctx;
          ctx.textAlign = "center";
          ctx.fillStyle = fontColor;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";
          self.data.datasets.forEach(function (dataset, datasetIndex) {
            var meta = self.getDatasetMeta(datasetIndex);
            meta.data.forEach(function (element, elementIndex) {
              ctx.fillText(_lib_numberFormat__WEBPACK_IMPORTED_MODULE_6__["default"].format(dataset.data[elementIndex]), chart.width - 90, element._model.y);
            });
          });
        }
      },
      layout: {
        padding: {
          right: 100,
          bottom: 20,
          left: 30
        }
      },
      scales: {
        xAxes: [{
          barPercentage: 0.5,
          display: false,
          ticks: {
            min: 0
          }
        }],
        yAxes: [{
          ticks: {
            fontColor: fontColor
          },
          gridLines: {
            display: false
          }
        }]
      },
      legend: {
        display: false
      }
    };
  }

  fetchData() {
    var param = {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["widgetApiUrl"].ChartlOnlineCustomer,
      IsCrossSite: false
    };
    return _lib_widgetApi__WEBPACK_IMPORTED_MODULE_4__["default"].fetchData(param).then(response => {
      this.setState({
        data: {
          datasets: [{
            backgroundColor: ['rgb(241, 91, 32)', 'rgb(75, 150, 107)', 'rgb(61, 165, 250)'],
            data: [response.data.Web, response.data.Wap, response.data.SmartSite],
            stacked: true
          }]
        },
        isLoading: false
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted && this.props.refresh > prevProps.refresh) {
      this.setState({
        isLoading: true
      });
      this.fetchData();
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => this.fetchData());
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  _reload() {
    if (this.state.isMounted) {
      this.setState({
        isLoading: true
      });
      this.fetchData();
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_WidgetBox__WEBPACK_IMPORTED_MODULE_2__["default"], {
      callbackParent: this.props.callbackParent,
      wgItem: this.props.wgItemFromParent,
      widgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["widgetKey"].ChartlOnlineCustomer,
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getRes(this.props.langCode, "online_customer"),
      widgetName: "online-customer default",
      isLoading: this.state.isLoading,
      countdownConfigs: {
        reloadCallback: () => this._reload(),
        defaultCountdown: 75,
        countdownValues: [15, 30, 45, 60, 75],
        colorMode: 'blue'
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["HorizontalBar"], {
      data: this.state.data,
      options: this.options
    }));
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/chart/Turnover.jsx":
/*!************************************************************!*\
  !*** ./src/js/pages/summary/components/chart/Turnover.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Turnover; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _components_WidgetBox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../components/WidgetBox */ "./src/js/components/WidgetBox.jsx");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");








class Turnover extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      total: 0,
      isLoading: true,
      isMounted: false
    };
    this.options = {
      legend: {
        display: false,
        custom: true,
        id: 'custom-legend'
      },
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            return data.labels[tooltipItem.index];
          },
          title: function (tooltipItem, data) {
            return '';
          }
        }
      },
      layout: {
        padding: {
          top: 10,
          bottom: 50,
          right: 130
        }
      },
      hover: {
        animationDuration: 0
      },
      animation: {
        onComplete: function (e) {
          var self = this,
              chart = this.chart,
              ctx = chart.ctx;
          var chartSize = Math.min(chart.width, chart.height);

          if (chartSize < 100) {
            return;
          }

          ctx.textAlign = "center";
          ctx.fillStyle = "#fff";
          ctx.save();
          ctx.shadowColor = "black";
          ctx.shadowBlur = 3;
          var chartCircumference = chart.config.options.circumference;
          self.data.datasets.forEach((dataset, datasetIndex) => {
            var meta = self.getDatasetMeta(datasetIndex);
            meta.data.forEach((element, index) => {
              var segmentPercent = element._model.circumference / chartCircumference * 100;
              var position = element.tooltipPosition();

              if (element._model.circumference > 0) {
                var label = segmentPercent < 1 ? "<1" : segmentPercent.toFixed(2);
                ctx.fillText(label + '%', position.x, position.y);
              }
            });
          });
          ctx.restore();
        }
      }
    };
  }

  fetchData(props) {
    var param = {
      Data: {
        CurrencyId: props.filter.currency,
        BaseCurrency: props.filter.baseCurrency
      },
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["widgetApiUrl"].ChartTurnover,
      IsCrossSite: true
    };
    _lib_widgetApi__WEBPACK_IMPORTED_MODULE_6__["default"].fetchData(param).then(response => {
      var labelList = [],
          dataList = [];

      for (var item of response.data.Data) {
        labelList.push(_lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(this.props.langCode, item.Key) || item.Key);
        dataList.push(item.Value);
      }

      this.setState({
        total: response.data.Total,
        data: {
          labels: labelList,
          datasets: [{
            data: dataList,
            currency: props.filter.baseCurrency,
            backgroundColor: ["#35A1FB", "#4B966B", "#4C6375", "#D9544F", "#4473C5", "#AFBF22", "#FFEC8B", "#BBFFFF", "#B8E9D5", "#FF66C1"]
          }]
        },
        isLoading: false
      });
    }).catch(function (error) {
      console.log("error:", error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted && this.props.refresh > prevProps.refresh) {
      this.setState({
        isLoading: true
      });
      this.fetchData(this.props);
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => this.fetchData(this.props));
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_WidgetBox__WEBPACK_IMPORTED_MODULE_3__["default"], {
      callbackParent: this.props.callbackParent,
      wgItem: this.props.wgItemFromParent,
      widgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["widgetKey"].ChartTurnover,
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(this.props.langCode, "turnover_byplatform_month_todate"),
      widgetName: "turnover default",
      isLoading: this.state.isLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__["Doughnut"], {
      data: this.state.data,
      options: this.options
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "custom-legend"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "footer-total"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(this.props.langCode, "total_turnover"), ": ", _lib_numberFormat__WEBPACK_IMPORTED_MODULE_7__["default"].formatCurrency(this.state.total, this.props.filter.baseCurrency))));
  }

}
;
react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__["Chart"].plugins.register({
  afterUpdate: function (chartInstance) {
    const options = chartInstance.options;
    const data = chartInstance.data;

    if (options.legend && options.legend.custom && data.datasets.length) {
      const ds = data.datasets[0];
      const legendOptions = data.labels.map((text, i) => ({
        text: text,
        index: i,
        value: _lib_numberFormat__WEBPACK_IMPORTED_MODULE_7__["default"].formatCurrency(ds.data[i], ds.currency),
        color: ds.backgroundColor[i]
      }));
      const customLegendElement = document.getElementById(options.legend.id);
      if (!customLegendElement) return;
      const globalDefault = react_chartjs_2__WEBPACK_IMPORTED_MODULE_2__["Chart"].defaults.global;
      react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
        className: "chart-legend",
        style: {
          fontSize: globalDefault.defaultFontSize,
          fontStyle: globalDefault.defaultFontStyle,
          fontFamily: globalDefault.defaultFontFamily
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, legendOptions.map(x => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: x.index
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "cl__label"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          backgroundColor: x.color
        },
        className: "cl__point"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "cl__text"
      }, x.text)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        className: "cl__value"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "cl__text"
      }, x.value)))))), customLegendElement);
    }
  }
});

/***/ }),

/***/ "./src/js/pages/summary/components/normal/BaseNormalWidget.jsx":
/*!*********************************************************************!*\
  !*** ./src/js/pages/summary/components/normal/BaseNormalWidget.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseNormalWidget; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_WidgetBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/WidgetBox */ "./src/js/components/WidgetBox.jsx");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");





class BaseNormalWidget extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props, configs) {
    super(props);
    this.state = {
      data: 0,
      isLoading: true,
      isMounted: false
    };
    this.configs = configs; // configs = {
    //  Url: "",
    //  TitleKey: "",
    //  WidgetName: "",
    //  WidgetKey: ""
    // }
  }

  fetchData(props) {
    var param = {
      Data: {
        CurrencyId: props.filter.currency,
        BaseCurrency: props.filter.baseCurrency
      },
      Url: this.configs.Url,
      IsCrossSite: true
    };
    return _lib_widgetApi__WEBPACK_IMPORTED_MODULE_3__["default"].fetchData(param).then(response => {
      this.setState({
        data: response.data,
        isLoading: false
      });
    }).catch(function (error) {
      console.log("error:", error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted && this.props.refresh > prevProps.refresh) {
      this.setState({
        isLoading: true
      });
      this.fetchData(this.props);
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => this.fetchData(this.props));
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  _reload() {
    if (this.state.isMounted) {
      this.setState({
        isLoading: true
      });
      this.fetchData(this.props);
    }
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_WidgetBox__WEBPACK_IMPORTED_MODULE_1__["default"], {
      callbackParent: this.props.callbackParent,
      countdownConfigs: {
        reloadCallback: () => this._reload(),
        defaultCountdown: this.configs.defaultCountdown,
        countdownValues: this.configs.countdownValues,
        colorMode: 'white'
      },
      wgItem: this.props.wgItemFromParent,
      widgetKey: this.configs.WidgetKey,
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__["default"].getRes(this.props.langCode, this.configs.TitleKey),
      widgetName: this.configs.WidgetName,
      isLoading: this.state.isLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "center-block"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "number-big"
    }, _lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].formatCurrency(this.state.data, this.props.filter.baseCurrency))));
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/normal/CustomerBalance.jsx":
/*!********************************************************************!*\
  !*** ./src/js/pages/summary/components/normal/CustomerBalance.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerBalance; });
/* harmony import */ var _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseNormalWidget */ "./src/js/pages/summary/components/normal/BaseNormalWidget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");


class CustomerBalance extends _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(props) {
    super(props, {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetApiUrl"].NormalCustomerBalance,
      TitleKey: "customer_balance",
      WidgetName: "customer-balance",
      WidgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalCustomerBalance,
      defaultCountdown: 75,
      countdownValues: [15, 30, 45, 60, 75]
    });
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/normal/Deposit.jsx":
/*!************************************************************!*\
  !*** ./src/js/pages/summary/components/normal/Deposit.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Deposit; });
/* harmony import */ var _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseNormalWidget */ "./src/js/pages/summary/components/normal/BaseNormalWidget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");


class Deposit extends _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(props) {
    super(props, {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetApiUrl"].NormalDeposit,
      TitleKey: "deposit_today",
      WidgetName: "deposit",
      WidgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalDeposit,
      defaultCountdown: 75,
      countdownValues: [15, 30, 45, 60, 75]
    });
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/normal/PendingFunds.jsx":
/*!*****************************************************************!*\
  !*** ./src/js/pages/summary/components/normal/PendingFunds.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PendingFunds; });
/* harmony import */ var _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseNormalWidget */ "./src/js/pages/summary/components/normal/BaseNormalWidget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");


class PendingFunds extends _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(props) {
    super(props, {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetApiUrl"].NormalPendingFund,
      TitleKey: "pending_funds",
      WidgetName: "pending-fund",
      WidgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalPendingFund,
      defaultCountdown: 75,
      countdownValues: [15, 30, 45, 60, 75]
    });
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/normal/RegisteredCustomer.jsx":
/*!***********************************************************************!*\
  !*** ./src/js/pages/summary/components/normal/RegisteredCustomer.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RegisteredCustomer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_WidgetBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../components/WidgetBox */ "./src/js/components/WidgetBox.jsx");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");






class RegisteredCustomer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);
    this.state = {
      deposit: 0,
      noneDeposit: 0,
      isLoading: true,
      isMounted: false
    };
  }

  fetchData(props) {
    var param = {
      Data: {
        CurrencyId: props.filter.currency,
        BaseCurrency: props.filter.baseCurrency
      },
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["widgetApiUrl"].NormalRegisterCustomer,
      IsCrossSite: false
    };
    _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__["default"].fetchData(param).then(response => {
      this.setState({
        deposit: response.data.Deposit,
        noneDeposit: response.data.NoneDeposit,
        isLoading: false
      });
    }).catch(function (error) {
      console.log("error:", error);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isMounted && this.props.refresh > prevProps.refresh) {
      this.setState({
        isLoading: true
      });
      this.fetchData(this.props);
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    }, () => this.fetchData(this.props));
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_WidgetBox__WEBPACK_IMPORTED_MODULE_1__["default"], {
      callbackParent: this.props.callbackParent,
      wgItem: this.props.wgItemFromParent,
      widgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["widgetKey"].NormalRegisterCustomer,
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(this.props.langCode, "registered_customer"),
      widgetName: "registered-customer default",
      isLoading: this.state.isLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "clearfix registered-customer-content"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "icon-group-users left"
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "right"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "registered-info"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "number"
    }, _lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].format(this.state.deposit + this.state.noneDeposit)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(this.props.langCode, "total_registered_cus_today"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "clearfix registered-customer-content dark-bg"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "registered-info"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "center-block"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "number"
    }, _lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].format(this.state.deposit)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(this.props.langCode, "deposit")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "registered-info"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "center-block"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "number"
    }, _lib_numberFormat__WEBPACK_IMPORTED_MODULE_4__["default"].format(this.state.noneDeposit)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      className: "text"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(this.props.langCode, "none_deposit"))))));
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/components/normal/Withdrawal.jsx":
/*!***************************************************************!*\
  !*** ./src/js/pages/summary/components/normal/Withdrawal.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Withdrawal; });
/* harmony import */ var _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseNormalWidget */ "./src/js/pages/summary/components/normal/BaseNormalWidget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/summary/lib/constants.js");


class Withdrawal extends _BaseNormalWidget__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(props) {
    super(props, {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetApiUrl"].NormalWithdrawal,
      TitleKey: "withdrawal_today",
      WidgetName: "withdrawal",
      WidgetKey: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["widgetKey"].NormalWithdrawal,
      defaultCountdown: 75,
      countdownValues: [15, 30, 45, 60, 75]
    });
  }

}
;

/***/ }),

/***/ "./src/js/pages/summary/index.js":
/*!***************************************!*\
  !*** ./src/js/pages/summary/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/js/pages/summary/App.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../reducers/index */ "./src/js/reducers/index.js");






 // middleware that logs actions

const loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_5__["createLogger"])({
  predicate: (getState, action) => __DEV__
});
const defaultState = {
  currencyInfo: {}
};

function configureStore(initialState) {
  const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_3__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_3__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_4__["default"], // lets us dispatch() functions
  loggerMiddleware));
  return Object(redux__WEBPACK_IMPORTED_MODULE_3__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_6__["default"], initialState, enhancer);
}

const store = configureStore(defaultState);
class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_1__["default"], null));
  }

}

/***/ }),

/***/ "./src/js/pages/summary/lib/constants.js":
/*!***********************************************!*\
  !*** ./src/js/pages/summary/lib/constants.js ***!
  \***********************************************/
/*! exports provided: defaultBasedCurrency, widgetKey, widgetApiUrl, wgLayouts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetKey", function() { return widgetKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetApiUrl", function() { return widgetApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wgLayouts", function() { return wgLayouts; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "defaultBasedCurrency", function() { return _lib_constants__WEBPACK_IMPORTED_MODULE_0__["defaultBasedCurrency"]; });



const widgetKey = { ..._lib_constants__WEBPACK_IMPORTED_MODULE_0__["widgetKey"],
  ChartTurnover: 'c_turnover',
  ChartLicenseeWL: 'c_licWL',
  NormalRegisterCustomer: 'n_reg_customer',
  ChartlOnlineCustomer: 'c_online_customer'
};
const widgetApiUrl = {
  ChartTurnover: '/api/TurnoverByPlatform/GetData',
  ChartLicenseeWL: '/api/LicenseeWinLossByPlatform/GetData',
  NormalRegisterCustomer: 'GetRegisteredUserOnline',
  ChartlOnlineCustomer: 'GetOnlineCustomers',
  NormalCustomerBalance: '/api/CustomerBalance/GetData',
  NormalPendingFund: '/api/PendingFund/GetData',
  NormalDeposit: '/api/TodayDeposit/GetData',
  NormalWithdrawal: '/api/TodayWithdrawal/GetData'
};
const wgLayouts = {
  lg: [{
    i: widgetKey.ChartTurnover,
    x: 0,
    y: 0,
    w: 6,
    h: 11,
    minW: 3,
    minH: 9
  }, {
    i: widgetKey.ChartLicenseeWL,
    x: 6,
    y: 0,
    w: 6,
    h: 11,
    minW: 3,
    minH: 9
  }, {
    i: widgetKey.NormalRegisterCustomer,
    x: 0,
    y: 11,
    w: 6,
    h: 6,
    minW: 4,
    minH: 6
  }, {
    i: widgetKey.ChartlOnlineCustomer,
    x: 6,
    y: 11,
    w: 6,
    h: 6,
    minW: 4,
    minH: 5
  }, {
    i: widgetKey.NormalCustomerBalance,
    x: 0,
    y: 17,
    w: 3,
    h: 6,
    minW: 3,
    minH: 3
  }, {
    i: widgetKey.NormalPendingFund,
    x: 3,
    y: 17,
    w: 3,
    h: 6,
    minW: 3,
    minH: 3
  }, {
    i: widgetKey.NormalDeposit,
    x: 6,
    y: 17,
    w: 3,
    h: 6,
    minW: 3,
    minH: 3
  }, {
    i: widgetKey.NormalWithdrawal,
    x: 9,
    y: 17,
    w: 3,
    h: 6,
    minW: 3,
    minH: 3
  }],
  md: [{
    i: widgetKey.ChartTurnover,
    x: 0,
    y: 0,
    w: 5,
    h: 8,
    minW: 3,
    minH: 8
  }, {
    i: widgetKey.ChartLicenseeWL,
    x: 5,
    y: 0,
    w: 5,
    h: 8,
    minW: 3,
    minH: 8
  }, {
    i: widgetKey.NormalRegisterCustomer,
    x: 0,
    y: 8,
    w: 5,
    h: 6,
    minW: 4,
    minH: 6
  }, {
    i: widgetKey.ChartlOnlineCustomer,
    x: 5,
    y: 8,
    w: 5,
    h: 6,
    minW: 4,
    minH: 4
  }, {
    i: widgetKey.NormalCustomerBalance,
    x: 0,
    y: 14,
    w: 5,
    h: 4,
    minW: 3,
    minH: 3
  }, {
    i: widgetKey.NormalPendingFund,
    x: 5,
    y: 14,
    w: 5,
    h: 4,
    minW: 3,
    minH: 3
  }, {
    i: widgetKey.NormalDeposit,
    x: 0,
    y: 18,
    w: 5,
    h: 4,
    minW: 3,
    minH: 3
  }, {
    i: widgetKey.NormalWithdrawal,
    x: 5,
    y: 18,
    w: 5,
    h: 4,
    minW: 3,
    minH: 3
  }],
  sm: [{
    i: widgetKey.ChartTurnover,
    x: 0,
    y: 0,
    w: 6,
    h: 9,
    isResizable: false
  }, {
    i: widgetKey.ChartLicenseeWL,
    x: 0,
    y: 9,
    w: 6,
    h: 9,
    isResizable: false
  }, {
    i: widgetKey.NormalRegisterCustomer,
    x: 0,
    y: 18,
    w: 3,
    h: 6,
    isResizable: false
  }, {
    i: widgetKey.ChartlOnlineCustomer,
    x: 3,
    y: 18,
    w: 3,
    h: 6,
    isResizable: false
  }, {
    i: widgetKey.NormalCustomerBalance,
    x: 0,
    y: 24,
    w: 3,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalPendingFund,
    x: 3,
    y: 24,
    w: 3,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalDeposit,
    x: 0,
    y: 27,
    w: 3,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalWithdrawal,
    x: 3,
    y: 27,
    w: 3,
    h: 3,
    isResizable: false
  }],
  xs: [{
    i: widgetKey.ChartTurnover,
    x: 0,
    y: 0,
    w: 4,
    h: 9,
    isResizable: false
  }, {
    i: widgetKey.ChartLicenseeWL,
    x: 0,
    y: 9,
    w: 4,
    h: 9,
    isResizable: false
  }, {
    i: widgetKey.NormalRegisterCustomer,
    x: 0,
    y: 18,
    w: 4,
    h: 6,
    isResizable: false
  }, {
    i: widgetKey.ChartlOnlineCustomer,
    x: 0,
    y: 24,
    w: 4,
    h: 5,
    isResizable: false
  }, {
    i: widgetKey.NormalCustomerBalance,
    x: 0,
    y: 29,
    w: 2,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalPendingFund,
    x: 2,
    y: 29,
    w: 2,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalDeposit,
    x: 0,
    y: 32,
    w: 2,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalWithdrawal,
    x: 2,
    y: 32,
    w: 2,
    h: 3,
    isResizable: false
  }],
  xxs: [{
    i: widgetKey.ChartTurnover,
    x: 0,
    y: 0,
    w: 4,
    h: 8,
    isResizable: false
  }, {
    i: widgetKey.ChartLicenseeWL,
    x: 0,
    y: 8,
    w: 4,
    h: 8,
    isResizable: false
  }, {
    i: widgetKey.NormalRegisterCustomer,
    x: 0,
    y: 16,
    w: 4,
    h: 6,
    isResizable: false
  }, {
    i: widgetKey.ChartlOnlineCustomer,
    x: 0,
    y: 22,
    w: 4,
    h: 4,
    isResizable: false
  }, {
    i: widgetKey.NormalCustomerBalance,
    x: 0,
    y: 26,
    w: 4,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalPendingFund,
    x: 0,
    y: 29,
    w: 4,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalDeposit,
    x: 0,
    y: 32,
    w: 4,
    h: 3,
    isResizable: false
  }, {
    i: widgetKey.NormalWithdrawal,
    x: 0,
    y: 35,
    w: 4,
    h: 3,
    isResizable: false
  }]
};

/***/ }),

/***/ "./src/js/reducers/currencyReducer.js":
/*!********************************************!*\
  !*** ./src/js/reducers/currencyReducer.js ***!
  \********************************************/
/*! exports provided: currencyInfo, dateRange, selectedBaseCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyInfo", function() { return currencyInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedBaseCurrency", function() { return selectedBaseCurrency; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/actions/types.js");


const currencyInfo = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_CURRENCY_INFO"]](state, action) {
    return action.data;
  }

});
const dateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_DATE_RANGE"]](state, action) {
    return action.data;
  }

});
const selectedBaseCurrency = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_BASE_CURRENCY"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/reducers/index.js":
/*!**********************************!*\
  !*** ./src/js/reducers/index.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _currencyReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currencyReducer */ "./src/js/reducers/currencyReducer.js");


/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_currencyReducer__WEBPACK_IMPORTED_MODULE_1__)));

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
  MobileLiteVersion: "Mobile Lite Version"
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
  MobileLiteVersion: "手机轻量版"
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
  MobileLiteVersion: "Mobile Lite Version"
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
  MobileLiteVersion: "Mobile Lite Version"
};

/***/ })

}]);
//# sourceMappingURL=summaryDashboard.chunk.js.map