(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sportsbook/sportsbookDashboard"],{

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

/***/ "./src/js/actions/dateRangeAction.js":
/*!*******************************************!*\
  !*** ./src/js/actions/dateRangeAction.js ***!
  \*******************************************/
/*! exports provided: setDateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/actions/types.js");

const setDateRange = dateRange => {
  const range = {
    fromDate: dateRange.startDate,
    toDate: dateRange.endDate
  };
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_DATE_RANGE"],
    data: range
  };
};

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

/***/ "./src/js/components/HOC/WithGA.js":
/*!*****************************************!*\
  !*** ./src/js/components/HOC/WithGA.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const withGA = (Component, name) => {
  return props => {
    Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
      window.logViewTab && window.logViewTab(name);
    }, []);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, props);
  };
};

/* harmony default export */ __webpack_exports__["default"] = (withGA);

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

/***/ "./src/js/lib/dateTimeHelper.js":
/*!**************************************!*\
  !*** ./src/js/lib/dateTimeHelper.js ***!
  \**************************************/
/*! exports provided: getDistanceBetweenPeriod, addMonths, defaultFormatFunc, getPreviousPeriod, getPreviousYear, getPeriodByNumberOfLastMonths, getPeriodByLastQuarter, convertDateToString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenPeriod", function() { return getDistanceBetweenPeriod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMonths", function() { return addMonths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultFormatFunc", function() { return defaultFormatFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreviousPeriod", function() { return getPreviousPeriod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPreviousYear", function() { return getPreviousYear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPeriodByNumberOfLastMonths", function() { return getPeriodByNumberOfLastMonths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPeriodByLastQuarter", function() { return getPeriodByLastQuarter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDateToString", function() { return convertDateToString; });
const getLastQuarter = currentTime => {
  const {
    month,
    year
  } = currentTime;
  const currentQuater = Math.ceil((month + 1) / 3);
  const lastQuarter = currentQuater - 1 || 4;
  return {
    quarter: lastQuarter,
    year: lastQuarter === 4 ? year - 1 : year
  };
};

const getDistanceBetweenPeriod = ({
  from,
  to
}) => {
  const distance = 12 * (to.year - from.year) + (to.month - from.month);
  return distance;
};
const addMonths = (date, numberOfMonth) => {
  const newDate = new Date(date.setMonth(date.getMonth() + numberOfMonth));
  return newDate;
};
const defaultFormatFunc = (month, year) => {
  return `${month < 10 ? '0' + month : month}/${year}`;
};
const getPreviousPeriod = currentPeriod => {
  const {
    from
  } = currentPeriod;
  const distance = getDistanceBetweenPeriod(currentPeriod);
  let date = new Date(from.year, from.month);
  date = addMonths(date, -1);
  const prevPeriodTo = {
    month: date.getMonth(),
    year: date.getFullYear()
  };
  date = addMonths(date, -distance);
  const prevPeriodFrom = {
    month: date.getMonth(),
    year: date.getFullYear()
  };
  return {
    from: prevPeriodFrom,
    to: prevPeriodTo
  };
};
const getPreviousYear = currentPeriod => {
  const {
    from,
    to
  } = currentPeriod;
  const prevPeriodFrom = {
    month: from.month,
    year: from.year - 1
  };
  const prevPeriodTo = {
    month: to.month,
    year: to.year - 1
  };
  return {
    from: prevPeriodFrom,
    to: prevPeriodTo
  };
};
const getPeriodByNumberOfLastMonths = (currentTime, numberOfMonth) => {
  const {
    month,
    year
  } = currentTime;
  let date = new Date(year, month);
  date = addMonths(date, -1);
  const to = {
    month: date.getMonth(),
    year: date.getFullYear()
  };
  date = addMonths(date, -numberOfMonth + 1);
  const from = {
    month: date.getMonth(),
    year: date.getFullYear()
  };
  return {
    from,
    to
  };
};
const getPeriodByLastQuarter = currentTime => {
  const {
    quarter,
    year
  } = getLastQuarter(currentTime);
  const to = {
    month: quarter * 3 - 1,
    year
  };
  const from = {
    month: to.month - 2,
    year
  };
  return {
    from,
    to
  };
};
const convertDateToString = date => {
  return typeof date === "string" ? date : date.format("MM/DD/YYYY");
};

/***/ }),

/***/ "./src/js/lib/middleware.js":
/*!**********************************!*\
  !*** ./src/js/lib/middleware.js ***!
  \**********************************/
/*! exports provided: getMiddleware */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMiddleware", function() { return getMiddleware; });
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);


const getMiddleware = function () {
  let middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_0__["default"]];

  if (true) {
    const __DEV__ = '__DEV__';
    const loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__["createLogger"])({
      predicate: (getState, action) => __DEV__
    });
    middleware = [...middleware, loggerMiddleware];
  }

  return middleware;
};

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
      "IDR": "Rp",
      "BDT": "৳",
      "INR": "₹"
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

  static nFormatter(num, digits = 2) {
    const si = [{
      value: 1,
      symbol: ""
    }, {
      value: 1E3,
      symbol: "K"
    }, {
      value: 1E6,
      symbol: "M"
    }, {
      value: 1E9,
      symbol: "B"
    }, {
      value: 1E12,
      symbol: "T"
    }];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    const absNum = Math.abs(num);

    for (i = si.length - 1; i > 0; i--) {
      if (absNum >= si[i].value) {
        break;
      }
    }

    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
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
/* harmony import */ var _languageApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/js/lib/constants.js");



class widgetApi {
  static getCommonParam(type, isCrossSite = true) {
    return {
      IsCrossSite: isCrossSite,
      Data: {},
      Url: '',
      Type: type
    };
  }

  static _getAuthToken(action, type = 4) {
    var tokenUrl = window.TokenUrl + "&_=" + new Date().getTime();
    tokenUrl = tokenUrl.replace("{0}", encodeURIComponent(action));
    tokenUrl = tokenUrl.replace("{1}", type);
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(tokenUrl, {});
  }

  static fetchData(param) {
    var data = param.Data || {};
    var type = param.Type || 4;

    if (param.IsCrossSite) {
      return widgetApi._getAuthToken(param.Url, type).then(response => {
        data['X-Auth-Token'] = response.data.Token;
        const dataUrl = response.data.ApiUrl + param.Url;
        return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(dataUrl, {
          params: data
        });
      });
    } else {
      var lapRootUrl = window.HostUrl;
      const lapApi = lapRootUrl.replace("SessionIsAlive", param.Url);
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(lapApi, {
        params: data
      });
    }
  }

  static async postData(param) {
    if (!param.IsCrossSite) return new Promise((resolve, reject) => {
      resolve({});
    });
    var postContent = param.Data || {};
    var type = param.Type || 1;
    let response = await widgetApi._getAuthToken(param.Url, type);
    const dataUrl = response.data.ApiUrl + param.Url;
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(dataUrl, postContent, {
      headers: {
        'X-Auth-Token': response.data.Token,
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Language': _languageApi__WEBPACK_IMPORTED_MODULE_1__["langCodeMapper"][_constants__WEBPACK_IMPORTED_MODULE_2__["dashboardLangCode"]]
      }
    });
  }

}

/***/ }),

/***/ "./src/js/pages/dashboard/components/TabContainer.jsx":
/*!************************************************************!*\
  !*** ./src/js/pages/dashboard/components/TabContainer.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TabMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TabMenu */ "./src/js/pages/dashboard/components/TabMenu.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class TabContainer extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onClickTabMenu", tabKey => {
      this.props.onChangeTab(tabKey);
    });
  }

  _getCurrentTab() {
    const {
      selectedTabKey,
      tabMenuList
    } = this.props;
    const item = tabMenuList.find(_ => _.key === selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this._getCurrentTab();

    const {
      selectedTabKey,
      tabMenuList
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TabMenu__WEBPACK_IMPORTED_MODULE_1__["default"], {
      selectedTabMenu: selectedTabKey,
      onClickTabMenu: this._onClickTabMenu,
      tabMenuList: tabMenuList
    }), CurrentTab && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CurrentTab, null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TabContainer);

/***/ }),

/***/ "./src/js/pages/sportsbook/App.jsx":
/*!*****************************************!*\
  !*** ./src/js/pages/sportsbook/App.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _components_FormFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/FormFilter */ "./src/js/pages/sportsbook/components/FormFilter.jsx");
/* harmony import */ var _dashboard_components_TabContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dashboard/components/TabContainer */ "./src/js/pages/dashboard/components/TabContainer.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _tabs_bySport_SportTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tabs/bySport/SportTab */ "./src/js/pages/sportsbook/tabs/bySport/SportTab.jsx");
/* harmony import */ var _tabs_byLeague_LeagueTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./tabs/byLeague/LeagueTab */ "./src/js/pages/sportsbook/tabs/byLeague/LeagueTab.jsx");
/* harmony import */ var _tabs_byBettype_BettypeTab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tabs/byBettype/BettypeTab */ "./src/js/pages/sportsbook/tabs/byBettype/BettypeTab.jsx");
/* harmony import */ var _tabs_byCurrency_CurrencyTab__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./tabs/byCurrency/CurrencyTab */ "./src/js/pages/sportsbook/tabs/byCurrency/CurrencyTab.jsx");
/* harmony import */ var _tabs_byPlatform_PlatformTab__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tabs/byPlatform/PlatformTab */ "./src/js/pages/sportsbook/tabs/byPlatform/PlatformTab.jsx");
/* harmony import */ var _actions_filterAction__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./actions/filterAction */ "./src/js/pages/sportsbook/actions/filterAction.js");













const tabList = [{
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabMenuKey"].bySport,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getDefaultRes('by_sport'),
  component: _tabs_bySport_SportTab__WEBPACK_IMPORTED_MODULE_7__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabMenuKey"].byLeague,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getDefaultRes('by_league'),
  component: _tabs_byLeague_LeagueTab__WEBPACK_IMPORTED_MODULE_8__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabMenuKey"].byBettype,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getDefaultRes('by_bettype'),
  component: _tabs_byBettype_BettypeTab__WEBPACK_IMPORTED_MODULE_9__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabMenuKey"].byCurrency,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getDefaultRes('by_currency'),
  component: _tabs_byCurrency_CurrencyTab__WEBPACK_IMPORTED_MODULE_10__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabMenuKey"].byPlatform,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_6__["default"].getDefaultRes('by_platform'),
  component: _tabs_byPlatform_PlatformTab__WEBPACK_IMPORTED_MODULE_11__["default"]
}];

const SportsbookDashboard = ({
  setGlobalFilter
}) => {
  const [selectedTabKey, setSelectedTabKey] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_5__["tabMenuKey"].bySport);

  const _onChangeTab = selectedTabKey => {
    setGlobalFilter(null);
    setSelectedTabKey(selectedTabKey);
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "sportsbook-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_FormFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashboard_components_TabContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
    onChangeTab: _onChangeTab,
    selectedTabKey: selectedTabKey,
    tabMenuList: tabList
  }));
};

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({
    setGlobalFilter: _actions_filterAction__WEBPACK_IMPORTED_MODULE_12__["setGlobalFilter"]
  }, dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, {});
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(SportsbookDashboard));

/***/ }),

/***/ "./src/js/pages/sportsbook/actions/filterAction.js":
/*!*********************************************************!*\
  !*** ./src/js/pages/sportsbook/actions/filterAction.js ***!
  \*********************************************************/
/*! exports provided: setGlobalFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGlobalFilter", function() { return setGlobalFilter; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/pages/sportsbook/actions/types.js");

const setGlobalFilter = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_GLOBAL_FILTER"],
    data
  };
};

/***/ }),

/***/ "./src/js/pages/sportsbook/actions/index.js":
/*!**************************************************!*\
  !*** ./src/js/pages/sportsbook/actions/index.js ***!
  \**************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _actions_currencyAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../actions/currencyAction */ "./src/js/actions/currencyAction.js");
/* harmony import */ var _actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../actions/dateRangeAction */ "./src/js/actions/dateRangeAction.js");
/* harmony import */ var _filterAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filterAction */ "./src/js/pages/sportsbook/actions/filterAction.js");



const ActionCreators = Object.assign(_actions_currencyAction__WEBPACK_IMPORTED_MODULE_0__, _actions_dateRangeAction__WEBPACK_IMPORTED_MODULE_1__, _filterAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./src/js/pages/sportsbook/actions/types.js":
/*!**************************************************!*\
  !*** ./src/js/pages/sportsbook/actions/types.js ***!
  \**************************************************/
/*! exports provided: SET_GLOBAL_FILTER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_GLOBAL_FILTER", function() { return SET_GLOBAL_FILTER; });
const SET_GLOBAL_FILTER = 'SET_GLOBAL_FILTER';

/***/ }),

/***/ "./src/js/pages/sportsbook/components/DistributionPieChart.jsx":
/*!*********************************************************************!*\
  !*** ./src/js/pages/sportsbook/components/DistributionPieChart.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");



const defaultColorBarChart = ['#2B465B', '#37C2CC', '#F15D21', '#4C6375', '#F1A837', '#208E9B', '#4C6568', '#4A863B', '#39AF93', '#5F684C', '#524C68'];

const displayPercentValue = value => {
  return value + '%';
};

const defaultHeightPieChart = 320;

const drawTextToChart = function () {
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
  ctx.font = '12px "Helvetica Neue", Helvetica, Arial, sans-serif';
  var chartCircumference = chart.config.options.circumference;
  self.data.datasets.forEach((dataSet, datasetIndex) => {
    var meta = self.getDatasetMeta(datasetIndex);
    meta.data.forEach((element, index) => {
      var position = element.tooltipPosition();

      if (element._model.circumference > 0) {
        const segmentPercent = element._model.circumference / chartCircumference * 100;

        if (segmentPercent >= 3) {
          let value = dataSet.data[index];
          value = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(value);
          ctx.fillText(displayPercentValue(value), position.x, position.y);
        }
      }
    });
  });
  ctx.restore();
};

const buildOptions = ({
  title
}) => {
  return {
    title: {
      display: true,
      position: "top",
      text: title,
      fontSize: 15,
      fontStyle: 'normal'
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        right: 60
      }
    },
    legend: {
      display: true,
      position: 'right',
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        padding: 12
      }
    },
    responsive: true,
    hover: {
      animationDuration: 0
    },
    animation: {
      onComplete: drawTextToChart
    },
    maintainAspectRatio: false,
    tooltips: {
      callbacks: {
        title: function () {
          return '';
        },
        label: function (tooltipItem, data) {
          const {
            datasetIndex,
            index
          } = tooltipItem;
          const value = data.datasets[datasetIndex].data[index];
          const label = data.labels[index];
          return label + ' ' + displayPercentValue(value);
        }
      }
    }
  };
};

const buildData = data => ({
  datasets: [{
    data: data.map(_ => _.distribution),
    backgroundColor: defaultColorBarChart
  }],
  labels: data.map(_ => _.name)
});

const DistributionPieChart = ({
  data,
  title,
  height
}) => {
  const distributionData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => buildData(data), [data]);
  const options = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => buildOptions({
    title
  }), [title]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["Pie"], {
    data: distributionData,
    options: options,
    height: height || defaultHeightPieChart
  });
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(DistributionPieChart));

/***/ }),

/***/ "./src/js/pages/sportsbook/components/FormFilter.jsx":
/*!***********************************************************!*\
  !*** ./src/js/pages/sportsbook/components/FormFilter.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./src/js/pages/sportsbook/actions/index.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @9softstudio/react-datepicker */ "./node_modules/@9softstudio/react-datepicker/dist/index.js");
/* harmony import */ var _9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");









const FormFilter = props => {
  const {
    selectedBaseCurrency,
    currencyInfo,
    dateRange,
    getCurrencyInfo,
    setBaseCurrency,
    setDateRange,
    setGlobalFilter
  } = props;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    getCurrencyInfo();
  }, []);

  const _onChangeBaseCurrency = e => {
    setBaseCurrency(e.target.value);
  };

  const _onChangeDateRange = (date, isValidMonthRange = true) => {
    if (isValidMonthRange) {
      setDateRange(date);
    } else {
      alert('ád');
    }
  };

  const _renderDateRange = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_datepicker__WEBPACK_IMPORTED_MODULE_5__["DateRange"], {
      startDate: dateRange.fromDate,
      endDate: dateRange.toDate,
      minDate: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["dateConstraint"].minDate,
      maxDate: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["dateConstraint"].maxDate,
      imitedMonthRange: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["dateConstraint"].limitedMonthRange,
      onChange: _onChangeDateRange
    });
  };

  const _renderBaseCurrencyList = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "select-filter",
      onChange: _onChangeBaseCurrency,
      value: selectedBaseCurrency
    }, currencyInfo.BaseCurrency.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: i,
        value: item
      }, item);
    }));
  };

  const _onSubmit = () => {
    setGlobalFilter({
      baseCurrency: selectedBaseCurrency,
      fromDate: Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_6__["convertDateToString"])(dateRange.fromDate),
      toDate: Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_6__["convertDateToString"])(dateRange.toDate)
    });
  };

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "filter-top-panel"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "filter-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "label"
  }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes("date")), _renderDateRange()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "filter-item"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "label"
  }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes("Based")), _renderBaseCurrencyList()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
    className: "btn btn-confirm",
    onClick: _onSubmit
  }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes("submit")));
};

function mapDispatchToProps(dispatch) {
  const {
    getCurrencyInfo,
    setBaseCurrency,
    setDateRange,
    setGlobalFilter
  } = _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo,
    setBaseCurrency,
    setDateRange,
    setGlobalFilter
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    selectedBaseCurrency,
    currencyInfo,
    dateRange
  } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    currencyInfo,
    dateRange
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(FormFilter)));

/***/ }),

/***/ "./src/js/pages/sportsbook/components/ReportInTextTable.jsx":
/*!******************************************************************!*\
  !*** ./src/js/pages/sportsbook/components/ReportInTextTable.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const renderHeader = header => {
  return header.map((_, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    key: `table_comparison_header_${index}`,
    colSpan: _.colSpan || 1,
    rowSpan: _.rowSpan || 1
  }, _.name));
};

const renderHeaders = headers => {
  return headers.map((_, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
    key: `table_comparison_row_header_${index}`
  }, renderHeader(_)));
};

const renderRows = (data, renderRow) => {
  return data.map((rowData, index) => renderRow(rowData, index));
};

const ReportInTextTable = props => {
  const {
    headers,
    data,
    renderRow
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-comparison"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table-comparison-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, headers && renderHeaders(headers)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, data && renderRow && renderRows(data, renderRow))));
};

/* harmony default export */ __webpack_exports__["default"] = (ReportInTextTable);

/***/ }),

/***/ "./src/js/pages/sportsbook/components/Widget.jsx":
/*!*******************************************************!*\
  !*** ./src/js/pages/sportsbook/components/Widget.jsx ***!
  \*******************************************************/
/*! exports provided: Widget, WidgetContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Widget", function() { return Widget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetContent", function() { return WidgetContent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../components/Loader */ "./src/js/components/Loader.jsx");
/* harmony import */ var _ReportInTextTable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReportInTextTable */ "./src/js/pages/sportsbook/components/ReportInTextTable.jsx");
/* harmony import */ var _DistributionPieChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DistributionPieChart */ "./src/js/pages/sportsbook/components/DistributionPieChart.jsx");
/* harmony import */ var _lib_commonService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/commonService */ "./src/js/pages/sportsbook/lib/commonService.js");





const Widget = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({
  title,
  isLoading,
  children
}) => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "widget"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_1__["default"], {
    isLoading: isLoading
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "widget-title"
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "widget-body"
  }, children));
});
const WidgetContent = react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(({
  data,
  distributionData,
  chartTitle,
  dimension,
  measurement
}) => {
  const reportInTextProps = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(() => data ? Object(_lib_commonService__WEBPACK_IMPORTED_MODULE_4__["reportInTextTableDataMapper"])(data, dimension, measurement) : null, [data]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "widget-content-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "widget-content-left"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReportInTextTable__WEBPACK_IMPORTED_MODULE_2__["default"], reportInTextProps)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "widget-content-right chart-container"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DistributionPieChart__WEBPACK_IMPORTED_MODULE_3__["default"], {
    data: distributionData || data,
    title: chartTitle || ''
  })));
});


/***/ }),

/***/ "./src/js/pages/sportsbook/index.js":
/*!******************************************!*\
  !*** ./src/js/pages/sportsbook/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/middleware */ "./src/js/lib/middleware.js");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers/index */ "./src/js/pages/sportsbook/reducers/index.js");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App */ "./src/js/pages/sportsbook/App.jsx");






const defaultState = {
  currencyInfo: {
    BaseCurrency: []
  },
  dateRange: {
    fromDate: '01/01/2021',
    toDate: '02/01/2021'
  },
  selectedBaseCurrency: window.defaultBaseCurrency,
  globalFilter: null
};

const configureStore = initialState => {
  const middleware = Object(_lib_middleware__WEBPACK_IMPORTED_MODULE_3__["getMiddleware"])();
  const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_2__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_2__["applyMiddleware"])(...middleware));
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_4__["default"], initialState, enhancer);
};

const App = () => {
  const store = configureStore(defaultState);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_5__["default"], null));
};

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/js/pages/sportsbook/lib/commonService.js":
/*!******************************************************!*\
  !*** ./src/js/pages/sportsbook/lib/commonService.js ***!
  \******************************************************/
/*! exports provided: renderReportInTextTableRow, reportInTextTableDataMapper, getScrollTabStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderReportInTextTableRow", function() { return renderReportInTextTableRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reportInTextTableDataMapper", function() { return reportInTextTableDataMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollTabStyle", function() { return getScrollTabStyle; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/js/pages/sportsbook/lib/constants.js");





const getReportInTextTableHeader = (dimension, measurement) => [[{
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes(dimension),
  rowSpan: 2
}, {
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes(measurement),
  colSpan: 2
}, {
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('margin'),
  rowSpan: 2
}], [{
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('value')
}, {
  name: '%'
}]];

const renderReportInTextTableRow = (rowData, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
  key: `table_comparison_row_${index}`
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, rowData.name)), rowData.data.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, `${_lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(_.value)}${_.isPercentUnit ? '%' : ''}`)));
const reportInTextTableDataMapper = (data, dimension, measurement, displayNameMapper = null) => {
  const rows = data.map(_ => ({
    name: displayNameMapper ? displayNameMapper(_) : _.name,
    data: _constants__WEBPACK_IMPORTED_MODULE_3__["rowDataMapper"].map(__ => __(_))
  }));
  const headers = getReportInTextTableHeader(dimension, measurement);
  return {
    headers,
    data: rows,
    renderRow: renderReportInTextTableRow
  };
};
const getScrollTabStyle = () => {
  const {
    innerHeight
  } = window;
  return {
    maxHeight: innerHeight - 200 + 'px'
  };
};

/***/ }),

/***/ "./src/js/pages/sportsbook/lib/constants.js":
/*!**************************************************!*\
  !*** ./src/js/pages/sportsbook/lib/constants.js ***!
  \**************************************************/
/*! exports provided: tabMenuKey, dimension, measurement, apiUrl, defaultResponseData, dateConstraint, rowDataMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuKey", function() { return tabMenuKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dimension", function() { return dimension; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "measurement", function() { return measurement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiUrl", function() { return apiUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultResponseData", function() { return defaultResponseData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateConstraint", function() { return dateConstraint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rowDataMapper", function() { return rowDataMapper; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

const tabMenuKey = {
  bySport: 'bySport',
  byLeague: 'byLeague',
  byBettype: 'byBettype',
  byCurrency: 'byCurrency',
  byPlatform: 'byPlatform'
};
const dimension = {
  sport: 'sport',
  league: 'league',
  bettype: 'bettype',
  currency: 'currency',
  platform: 'platform'
};
const measurement = {
  turnover: 'turnover',
  winloss: 'winloss'
};
const apiUrl = {
  bySport: '/api/sportsbook/sport',
  byLeagueSoccer: '/api/sportsbook/league/soccer',
  byLeagueBasketball: '/api/sportsbook/league/basketball',
  byBettypeSoccer: '/api/sportsbook/bettype/soccer',
  byBettypeBasketball: '/api/sportsbook/bettype/basketball',
  byCurrency: '/api/sportsbook/currency',
  byPlatform: '/api/sportsbook/platform'
};
const defaultResponseData = {
  byTurnover: [],
  byWinloss: []
};
const dateConstraint = {
  limitedMonthRange: 3,
  minDate: '01/01/2021',
  maxDate: window.yesterday
};
const rowDataMapper = [data => ({
  value: data.value,
  isPercentUnit: false
}), data => ({
  value: data.distribution,
  isPercentUnit: true
}), data => ({
  value: data.margin,
  isPercentUnit: true
})];

/***/ }),

/***/ "./src/js/pages/sportsbook/lib/queryService.js":
/*!*****************************************************!*\
  !*** ./src/js/pages/sportsbook/lib/queryService.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QueryService; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class QueryService {
  static async getDataBySport(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].bySport, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

  static async getDataByLeagueSoccer(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].byLeagueSoccer, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

  static async getDataByLeagueBasketball(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].byLeagueBasketball, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

  static async getDataByBettypeSoccer(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].byBettypeSoccer, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

  static async getDataByBettypeBasketball(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].byBettypeBasketball, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

  static async getDataByCurrency(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].byCurrency, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

  static async getDataByPlatform(params, after) {
    const response = await this.fetchData(params, _constants__WEBPACK_IMPORTED_MODULE_0__["apiUrl"].byPlatform, _constants__WEBPACK_IMPORTED_MODULE_0__["defaultResponseData"]);
    after && after(response);
    return response;
  }

}

_defineProperty(QueryService, "fetchData", async (params, url, defaultData = null) => {
  const _params = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_1__["default"].getCommonParam(4), {
    Data: params,
    Url: url
  });

  let responseData = defaultData;

  try {
    const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_1__["default"].postData(_params);

    if (response.status === 200 && response.data.isSuccess) {
      responseData = response.data.data;
    }
  } catch (e) {
    console.log(e);
  }

  return responseData;
});

/***/ }),

/***/ "./src/js/pages/sportsbook/reducers/filterReducer.js":
/*!***********************************************************!*\
  !*** ./src/js/pages/sportsbook/reducers/filterReducer.js ***!
  \***********************************************************/
/*! exports provided: globalFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "globalFilter", function() { return globalFilter; });
/* harmony import */ var _lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/pages/sportsbook/actions/types.js");


const globalFilter = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])(null, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_GLOBAL_FILTER"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/pages/sportsbook/reducers/index.js":
/*!***************************************************!*\
  !*** ./src/js/pages/sportsbook/reducers/index.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../reducers/currencyReducer */ "./src/js/reducers/currencyReducer.js");
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filterReducer */ "./src/js/pages/sportsbook/reducers/filterReducer.js");
/* harmony import */ var _reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../reducers/dateRangeReducer */ "./src/js/reducers/dateRangeReducer.js");




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__, _reducers_dateRangeReducer__WEBPACK_IMPORTED_MODULE_4__, _filterReducer__WEBPACK_IMPORTED_MODULE_2__)));

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/byBettype/BettypeTab.jsx":
/*!***************************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/byBettype/BettypeTab.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_queryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/queryService */ "./src/js/pages/sportsbook/lib/queryService.js");
/* harmony import */ var _components_Widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Widget */ "./src/js/pages/sportsbook/components/Widget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./constants */ "./src/js/pages/sportsbook/tabs/byBettype/constants.js");
/* harmony import */ var _lib_commonService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/commonService */ "./src/js/pages/sportsbook/lib/commonService.js");
/* harmony import */ var _components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/HOC/WithGA */ "./src/js/components/HOC/WithGA.js");











const BettypeTab = ({
  globalFilter
}) => {
  const [isSoccerLoading, setSoccerLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [soccerData, setSoccerData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  const [isSabaSoccerLoading, setSabaSoccerLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [sabaSoccerData, setSabaSoccerData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  const [isBasketballLoading, setBasketballLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [basketballData, setBasketballData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  const [isSabaBasketballLoading, setSabaBasketballLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [sabaBasketballData, setSabaBasketballData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    globalFilter && getDataByLeagueSoccer();
    globalFilter && getDataByLeagueBasketball();
    globalFilter && getDataByLeagueSabaSoccer();
    globalFilter && getDataByLeagueSabaBasketball();
  }, [globalFilter]);

  const getDataByLeagueSoccer = () => {
    setSoccerLoading(true);
    _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByBettypeSoccer(globalFilter, response => {
      setSoccerLoading(false);
      setSoccerData(response);
    });
  };

  const getDataByLeagueBasketball = () => {
    setBasketballLoading(true);
    _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByBettypeBasketball(globalFilter, response => {
      setBasketballLoading(false);
      setBasketballData(response);
    });
  };

  const getDataByLeagueSabaSoccer = () => {
    setSabaSoccerLoading(true);
    _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByBettypeSoccer({ ...globalFilter,
      isSaba: true
    }, response => {
      setSabaSoccerLoading(false);
      setSabaSoccerData(response);
    });
  };

  const getDataByLeagueSabaBasketball = () => {
    setSabaBasketballLoading(true);
    _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByBettypeBasketball({ ...globalFilter,
      isSaba: true
    }, response => {
      setSabaBasketballLoading(false);
      setSabaBasketballData(response);
    });
  };

  const _renderSoccerSection = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('soccer'),
      isLoading: isSoccerLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: soccerData.byTurnover,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].turnover,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: soccerData.byWinloss,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].winloss,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
    }));
  };

  const _renderBasketballSection = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('basketball'),
      isLoading: isBasketballLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: basketballData.byTurnover,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].turnover,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: basketballData.byWinloss,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].winloss,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
    }));
  };

  const _renderSabaSoccerSection = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('saba_soccer'),
      isLoading: isSabaSoccerLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: sabaSoccerData.byTurnover,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].turnover,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: sabaSoccerData.byWinloss,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].winloss,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
    }));
  };

  const _renderSabaBasketballSection = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('saba_basketball'),
      isLoading: isSabaBasketballLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: sabaBasketballData.byTurnover,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].turnover,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: sabaBasketballData.byWinloss,
      chartTitle: _constants__WEBPACK_IMPORTED_MODULE_7__["distributionChartTitle"].winloss,
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].bettype,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
    }));
  };

  return globalFilter && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "child-tab by-bettype-tab",
    style: Object(_lib_commonService__WEBPACK_IMPORTED_MODULE_8__["getScrollTabStyle"])()
  }, _renderSoccerSection(), _renderBasketballSection(), _renderSabaSoccerSection(), _renderSabaBasketballSection()));
};

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  const {
    globalFilter
  } = state;
  return Object.assign({}, {
    globalFilter
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_9__["default"])(BettypeTab, 'Sportsbook/ByBettype')));

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/byBettype/constants.js":
/*!*************************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/byBettype/constants.js ***!
  \*************************************************************/
/*! exports provided: distributionChartTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distributionChartTitle", function() { return distributionChartTitle; });
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");

const distributionChartTitle = {
  turnover: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('top_5_bettypes')} - ${_lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('distribution_by_turnover')}`,
  winloss: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('top_5_bettypes')} - ${_lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('distribution_by_winloss')}`
};

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/byCurrency/CurrencyTab.jsx":
/*!*****************************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/byCurrency/CurrencyTab.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_queryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/queryService */ "./src/js/pages/sportsbook/lib/queryService.js");
/* harmony import */ var _components_Widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Widget */ "./src/js/pages/sportsbook/components/Widget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _lib_commonService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/commonService */ "./src/js/pages/sportsbook/lib/commonService.js");
/* harmony import */ var _components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/HOC/WithGA */ "./src/js/components/HOC/WithGA.js");










const CurrencyTab = ({
  globalFilter
}) => {
  const [isLoading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (globalFilter) {
      setLoading(true);
      _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByCurrency(globalFilter, response => {
        setLoading(false);
        setData(response);
      });
    }
  }, [globalFilter]);
  return globalFilter && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "child-tab by-currency-tab",
    style: Object(_lib_commonService__WEBPACK_IMPORTED_MODULE_7__["getScrollTabStyle"])()
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('report_by_turnover'),
    isLoading: isLoading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
    data: data.byTurnover,
    chartTitle: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('top_5_currencies')} - ${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_by_turnover')}`,
    dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].currency,
    measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('report_by_winloss'),
    isLoading: isLoading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
    data: data.byWinloss,
    chartTitle: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('top_5_currencies')} - ${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_by_winloss')}`,
    dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].currency,
    measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
  }))));
};

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  const {
    globalFilter
  } = state;
  return Object.assign({}, {
    globalFilter
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_8__["default"])(CurrencyTab, 'Sportsbook/ByCurrency')));

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/byLeague/LeagueTab.jsx":
/*!*************************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/byLeague/LeagueTab.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_queryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/queryService */ "./src/js/pages/sportsbook/lib/queryService.js");
/* harmony import */ var _components_Widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Widget */ "./src/js/pages/sportsbook/components/Widget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _lib_commonService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/commonService */ "./src/js/pages/sportsbook/lib/commonService.js");
/* harmony import */ var _components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/HOC/WithGA */ "./src/js/components/HOC/WithGA.js");










const LeagueTab = ({
  globalFilter
}) => {
  const [isSoccerLoading, setSoccerLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [soccerData, setSoccerData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  const [isBasketballLoading, setBasketballLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [basketballData, setBasketballData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    globalFilter && getDataByLeagueSoccer();
    globalFilter && getDataByLeagueBasketball();
  }, [globalFilter]);

  const getDataByLeagueSoccer = () => {
    setSoccerLoading(true);
    _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByLeagueSoccer(globalFilter, response => {
      setSoccerLoading(false);
      setSoccerData(response);
    });
  };

  const getDataByLeagueBasketball = () => {
    setBasketballLoading(true);
    _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByLeagueBasketball(globalFilter, response => {
      setBasketballLoading(false);
      setBasketballData(response);
    });
  };

  const _renderSoccerSection = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('soccer'),
      isLoading: isSoccerLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: soccerData.byTurnover,
      chartTitle: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_of_turnover'),
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].league,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: soccerData.byWinloss,
      chartTitle: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_of_winloss'),
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].league,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
    }));
  };

  const _renderBasketballSection = () => {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
      title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('basketball'),
      isLoading: isBasketballLoading
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: basketballData.byTurnover,
      chartTitle: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_of_turnover'),
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].league,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
      data: basketballData.byWinloss,
      chartTitle: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_of_winloss'),
      dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].league,
      measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
    }));
  };

  return globalFilter && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "child-tab by-league-tab",
    style: Object(_lib_commonService__WEBPACK_IMPORTED_MODULE_7__["getScrollTabStyle"])()
  }, _renderSoccerSection(), _renderBasketballSection()));
};

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  const {
    globalFilter
  } = state;
  return Object.assign({}, {
    globalFilter
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_8__["default"])(LeagueTab, 'Sportsbook/ByLeague')));

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/byPlatform/PlatformTab.jsx":
/*!*****************************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/byPlatform/PlatformTab.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_queryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/queryService */ "./src/js/pages/sportsbook/lib/queryService.js");
/* harmony import */ var _components_Widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Widget */ "./src/js/pages/sportsbook/components/Widget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _lib_commonService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/commonService */ "./src/js/pages/sportsbook/lib/commonService.js");
/* harmony import */ var _components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/HOC/WithGA */ "./src/js/components/HOC/WithGA.js");










const PlatformTab = ({
  globalFilter
}) => {
  const [isLoading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (globalFilter) {
      setLoading(true);
      _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataByPlatform(globalFilter, response => {
        setLoading(false);
        setData(response);
      });
    }
  }, [globalFilter]);
  return globalFilter && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "child-tab by-platform-tab",
    style: Object(_lib_commonService__WEBPACK_IMPORTED_MODULE_7__["getScrollTabStyle"])()
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('report_by_turnover'),
    isLoading: isLoading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
    data: data.byTurnover,
    chartTitle: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('top_5_platforms')} - ${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_by_turnover')}`,
    dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].platform,
    measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('report_by_winloss'),
    isLoading: isLoading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
    data: data.byWinloss,
    chartTitle: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('top_5_platforms')} - ${_lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_by_winloss')}`,
    dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].platform,
    measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].winloss
  }))));
};

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  const {
    globalFilter
  } = state;
  return Object.assign({}, {
    globalFilter
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_8__["default"])(PlatformTab, 'Sportsbook/ByPlatform')));

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/bySport/SportTab.jsx":
/*!***********************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/bySport/SportTab.jsx ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_queryService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/queryService */ "./src/js/pages/sportsbook/lib/queryService.js");
/* harmony import */ var _components_Widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/Widget */ "./src/js/pages/sportsbook/components/Widget.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/sportsbook/lib/constants.js");
/* harmony import */ var _lib_commonService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/commonService */ "./src/js/pages/sportsbook/lib/commonService.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./service */ "./src/js/pages/sportsbook/tabs/bySport/service.js");
/* harmony import */ var _components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/HOC/WithGA */ "./src/js/components/HOC/WithGA.js");











const SportTab = ({
  globalFilter
}) => {
  const [isLoading, setLoading] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [data, setData] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["defaultResponseData"]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (globalFilter) {
      setLoading(true);
      _lib_queryService__WEBPACK_IMPORTED_MODULE_4__["default"].getDataBySport(globalFilter, response => {
        setLoading(false);
        setData(response);
      });
    }
  }, [globalFilter]);
  const distributionTurnoverData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_service__WEBPACK_IMPORTED_MODULE_8__["orderSports"])(data.byTurnover), [data]);
  const distributionWinlossData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => Object(_service__WEBPACK_IMPORTED_MODULE_8__["orderSports"])(data.byWinloss), [data]);
  return globalFilter && data && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "child-tab by-sport-tab",
    style: Object(_lib_commonService__WEBPACK_IMPORTED_MODULE_7__["getScrollTabStyle"])()
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('report_by_turnover'),
    isLoading: isLoading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
    data: data.byTurnover,
    distributionData: distributionTurnoverData,
    chartTitle: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_of_turnover'),
    dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].sport,
    measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["Widget"], {
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('report_by_winloss'),
    isLoading: isLoading
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Widget__WEBPACK_IMPORTED_MODULE_5__["WidgetContent"], {
    data: data.byWinloss,
    distributionData: distributionWinlossData,
    chartTitle: _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes('distribution_of_winloss'),
    dimension: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["dimension"].sport,
    measurement: _lib_constants__WEBPACK_IMPORTED_MODULE_6__["measurement"].turnover
  }))));
};

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  const {
    globalFilter
  } = state;
  return Object.assign({}, {
    globalFilter
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Object(_components_HOC_WithGA__WEBPACK_IMPORTED_MODULE_9__["default"])(SportTab, 'Sportsbook/BySport')));

/***/ }),

/***/ "./src/js/pages/sportsbook/tabs/bySport/service.js":
/*!*********************************************************!*\
  !*** ./src/js/pages/sportsbook/tabs/bySport/service.js ***!
  \*********************************************************/
/*! exports provided: orderSports */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orderSports", function() { return orderSports; });
const sportOrder = {
  [1]: {
    [false]: 0,
    //Soccer
    [true]: 50 //Saba Soccer

  },
  [2]: {
    [false]: 10,
    //Basketball
    [true]: 60 //Saba Basketball

  },
  [43]: {
    [false]: 20 //E-Sports

  },
  [5]: {
    [false]: 30 //Tennis

  },
  [-2]: {
    [false]: 40 //Parlay

  },
  [0]: {
    [false]: 70 //Others

  }
};
const orderSports = sports => {
  const sortedData = [...sports];
  sortedData.sort((sport1, sport2) => {
    return sportOrder[sport1.id][sport1.isSaba] - sportOrder[sport2.id][sport2.isSaba];
  });
  return sortedData;
};

/***/ }),

/***/ "./src/js/reducers/currencyReducer.js":
/*!********************************************!*\
  !*** ./src/js/reducers/currencyReducer.js ***!
  \********************************************/
/*! exports provided: currencyInfo, selectedBaseCurrency */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyInfo", function() { return currencyInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedBaseCurrency", function() { return selectedBaseCurrency; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/actions/types.js");


const currencyInfo = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_CURRENCY_INFO"]](state, action) {
    return action.data;
  }

});
const selectedBaseCurrency = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_BASE_CURRENCY"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/reducers/dateRangeReducer.js":
/*!*********************************************!*\
  !*** ./src/js/reducers/dateRangeReducer.js ***!
  \*********************************************/
/*! exports provided: dateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateRange", function() { return dateRange; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/actions/types.js");


const dateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_DATE_RANGE"]](state, action) {
    return action.data;
  }

});

/***/ })

}]);
//# sourceMappingURL=sportsbookDashboard.chunk.js.map