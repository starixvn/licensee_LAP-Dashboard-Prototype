(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["summary/summaryDashboard"],{

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
/* harmony import */ var _components_RightPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/RightPanel */ "./src/js/pages/summary/components/RightPanel.jsx");
/* harmony import */ var _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../layouts/widgetLayout */ "./src/js/layouts/widgetLayout.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/summary/lib/constants.js");
/* harmony import */ var _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../lib/localStorageHelper */ "./src/js/lib/localStorageHelper.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../actions/index */ "./src/js/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




















class SummaryDashboard extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "_me", this);

    _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].clearLayoutSettingIfNewVersion();
    const langCode = window.dashboardLangCode || 'en';
    const permission = window.widgetPermission;

    if (!permission || !permission.length) {
      alert(_lib_languageApi__WEBPACK_IMPORTED_MODULE_12__["default"].getRes(langCode, 'no_widget_permission'));
    }

    this.state = Object.assign({
      langCode: langCode,
      refresh: 0,
      selectedFilter: {
        currency: 0,
        baseCurrency: window.defaultBaseCurrency
      },
      isMounted: false
    }, this._getLayoutSettings());
    ;
    this._responsiveReactGridLayout = Object(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__["WidthProvider"])(react_grid_layout__WEBPACK_IMPORTED_MODULE_1__["Responsive"]);
    this.props.getCurrencyInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isMounted && this.props.newState && this.props.newState !== prevProps.newState) {
      this.onChildChanged(this.props.newState);
    }
  }

  _renderWgItem(key) {
    const keyToWidget = {
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].ChartTurnover]: _components_chart_Turnover__WEBPACK_IMPORTED_MODULE_2__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].ChartLicenseeWL]: _components_chart_LicenseeWinLoss__WEBPACK_IMPORTED_MODULE_4__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].NormalDeposit]: _components_normal_Deposit__WEBPACK_IMPORTED_MODULE_5__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].ChartlOnlineCustomer]: _components_chart_OnlineCustomer__WEBPACK_IMPORTED_MODULE_3__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].NormalPendingFund]: _components_normal_PendingFunds__WEBPACK_IMPORTED_MODULE_7__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].NormalRegisterCustomer]: _components_normal_RegisteredCustomer__WEBPACK_IMPORTED_MODULE_9__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].NormalCustomerBalance]: _components_normal_CustomerBalance__WEBPACK_IMPORTED_MODULE_8__["default"],
      [_lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"].NormalWithdrawal]: _components_normal_Withdrawal__WEBPACK_IMPORTED_MODULE_6__["default"]
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
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].clearWidgetCache();
      this.setState(this._getLayoutSettings());
    }
  }

  _getLayoutSettings() {
    const wgStatus = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_11__["default"].getWidgetStatusSettings(window.widgetPermission, _lib_constants__WEBPACK_IMPORTED_MODULE_13__["widgetKey"]);
    const userWgStatus = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_11__["default"].mergeWidgetStatusSettingsToUserSettings(wgStatus);
    _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].saveWidgetStatus(userWgStatus);
    const userWidgetLayouts = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_11__["default"].getWidgetLayoutSettings(_lib_constants__WEBPACK_IMPORTED_MODULE_13__["wgLayouts"]);
    _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].saveWidgetLayout(userWidgetLayouts);
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
      const syncResult = _layouts_widgetLayout__WEBPACK_IMPORTED_MODULE_11__["default"].syncLayoutWithNewStatus(newState.items, this.state.wgStatus, this.state.layouts, _lib_constants__WEBPACK_IMPORTED_MODULE_13__["wgLayouts"]);
      this.setState({
        layouts: syncResult.newLayouts,
        wgStatus: syncResult.newWidgetStatus
      });
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].saveWidgetStatus(syncResult.newWidgetStatus);
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].saveWidgetLayout(syncResult.newLayouts);
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].saveRemovedWidgetLayout(syncResult.removedLayouts);
    }
  }

  onLayoutChange(layout, layouts) {
    if (this.state.isMounted) {
      _lib_localStorageHelper__WEBPACK_IMPORTED_MODULE_14__["default"].saveWidgetLayout(layouts);
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
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  render() {
    const ResponsiveReactGridLayout = this._responsiveReactGridLayout;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_RightPanel__WEBPACK_IMPORTED_MODULE_10__["default"], {
      langCode: this.state.langCode,
      wgs: this.state.wgStatus,
      callbackParent: x => this.onChildChanged(x)
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ResponsiveReactGridLayout, {
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
    }, this.state.wgStatus.filter(i => i.enable).map(item => this._renderWgItem(item.key))));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_15__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_16__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, state);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_17__["connect"])(mapStateToProps, mapDispatchToProps)(SummaryDashboard));

/***/ }),

/***/ "./src/js/pages/summary/components/RightPanel.jsx":
/*!********************************************************!*\
  !*** ./src/js/pages/summary/components/RightPanel.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../actions/index */ "./src/js/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");






class RightPanel extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      SelectedBaseCurrency: window.defaultBaseCurrency,
      SelectedCurrency: 0,
      isHidden: true,
      BaseCurrencyList: this.props.currencyInfo.BaseCurrency,
      wgs: this._bindWgCheckBox(props.wgs)
    };
  }

  _togglePanel() {
    this.setState(prevState => ({
      isHidden: !prevState.isHidden
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      wgs
    } = this.props;

    if (this.state.isMounted && wgs && wgs !== prevProps.wgs) {
      this.setState({
        wgs: this._bindWgCheckBox(wgs)
      });
    }
  }

  componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  componentWillUnmount() {
    this.setState({
      isMounted: false
    });
  }

  _bindWgCheckBox(wgs) {
    var arrayToDictionary = {};
    wgs.forEach(x => arrayToDictionary[x.key] = x.enable);
    return arrayToDictionary;
  }

  _applyAction() {
    if (this.state.isMounted) {
      let baseCurrency = this.props.currencyInfo.BaseCurrency.find(x => x == this.state.SelectedBaseCurrency);
      this.props.callbackParent({
        action: 'apply',
        filter: {
          currency: this.state.SelectedCurrency,
          baseCurrency: baseCurrency ? baseCurrency : ""
        }
      });
    }
  }

  _getNewStateOnChangeCurrency(selectedCurrency) {
    let newState = {
      SelectedCurrency: selectedCurrency
    };

    if (selectedCurrency == "0") {
      return Object.assign({}, newState, {
        SelectedBaseCurrency: this.props.currencyInfo.BaseCurrency[0]
      });
    }

    var selectedCurrencyName = this.props.currencyInfo.Currency.find(x => x.CurrencyId == selectedCurrency).Currency;

    if (this.props.currencyInfo.BaseCurrency.find(baseCurrency => baseCurrency == selectedCurrencyName)) {
      if (!this.props.currencyInfo.BaseCurrency.find(baseCurrency => baseCurrency == this.state.SelectedBaseCurrency)) {
        newState.SelectedBaseCurrency = selectedCurrencyName;
        newState.BaseCurrencyList = this.props.currencyInfo.BaseCurrency;
      }

      return newState;
    }

    return Object.assign({}, newState, {
      SelectedBaseCurrency: selectedCurrencyName,
      BaseCurrencyList: this.props.currencyInfo.BaseCurrency.concat(selectedCurrencyName)
    });
  }

  _onChangeCurrencyList(event) {
    var newState = this._getNewStateOnChangeCurrency(event.target.value);

    this.setState(newState);
  }

  _onChangeBaseCurrencyList(event) {
    this.setState({
      SelectedBaseCurrency: event.target.value
    });
  }

  _onCheckWg(key) {
    if (this.state.isMounted) {
      this.props.callbackParent({
        action: 'wgSyncStatus',
        items: [{
          key: key,
          enable: !this.state.wgs[key]
        }]
      });
    }
  }

  _onResetLayout() {
    if (this.state.isMounted) {
      this.props.callbackParent({
        action: 'reset'
      });
    }
  }

  render() {
    const isHidden = this.state.isHidden ? '' : ' is-expanded';
    const {
      langCode,
      wgs
    } = this.props;
    var realBaseCurrency = this.state.BaseCurrencyList.length > 0 ? this.state.BaseCurrencyList : this.props.currencyInfo.BaseCurrency;
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
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "currency"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "currency-label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "currency")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      ref: "currencyDropdownList",
      onChange: e => this._onChangeCurrencyList(e),
      value: this.state.SelectedCurrency
    }, this.props.currencyInfo.Currency.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: i,
        value: item.CurrencyId
      }, item.Currency);
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "currency"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "currency-label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "Based")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      ref: "baseCurrencyDropdownList",
      onChange: e => this._onChangeBaseCurrencyList(e),
      value: this.state.SelectedBaseCurrency
    }, realBaseCurrency.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: i,
        value: item
      }, item);
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "btn-submit",
      onClick: e => this._applyAction(e),
      href: "#"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "apply")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "widgets-config"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "widgets-title"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "Widgets")), wgs.map(item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
      key: item.key,
      className: "widget-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      onChange: e => this._onCheckWg(item.key),
      checked: !!this.state.wgs && this.state.wgs[item.key],
      className: "filled-in",
      type: "checkbox",
      id: item.key
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: item.key
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, item.key))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "btn-reset",
      onClick: () => this._onResetLayout(),
      href: "#"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "reset_layout")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "right-panel-overlay",
      onClick: e => this._togglePanel(e)
    }));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, state);
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(RightPanel));

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

const __DEV__ = '__DEV__';
const loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_5__["createLogger"])({
  predicate: (getState, action) => __DEV__
});
const defaultState = {
  currencyInfo: {
    Currency: [],
    BaseCurrency: []
  }
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
/*! exports provided: widgetKey, widgetApiUrl, wgLayouts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetKey", function() { return widgetKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "widgetApiUrl", function() { return widgetApiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wgLayouts", function() { return wgLayouts; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");

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

/***/ })

}]);
//# sourceMappingURL=summaryDashboard.chunk.js.map