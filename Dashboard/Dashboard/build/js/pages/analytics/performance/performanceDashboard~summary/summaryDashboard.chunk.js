(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["performance/performanceDashboard~summary/summaryDashboard"],{

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

/***/ "./src/js/actions/types.js":
/*!*********************************!*\
  !*** ./src/js/actions/types.js ***!
  \*********************************/
/*! exports provided: SET_CURRENCY_INFO, SET_BASE_CURRENCY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENCY_INFO", function() { return SET_CURRENCY_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BASE_CURRENCY", function() { return SET_BASE_CURRENCY; });
const SET_CURRENCY_INFO = "SET_CURRENCY_INFO";
const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";

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
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\src\\js\\lib\\widgetApi.js: Unexpected token (40:19)\n\n\u001b[0m \u001b[90m 38 | \u001b[39m    \u001b[36mvar\u001b[39m type \u001b[33m=\u001b[39m param\u001b[33m.\u001b[39m\u001b[33mType\u001b[39m \u001b[33m||\u001b[39m \u001b[35m1\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 39 | \u001b[39m    let response \u001b[33m=\u001b[39m await widgetApi\u001b[33m.\u001b[39m_getAuthToken(url\u001b[33m,\u001b[39m type)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 40 | \u001b[39m    \u001b[36mconst\u001b[39m token \u001b[33m=\u001b[39m  \u001b[33m||\u001b[39m \u001b[32m''\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    | \u001b[39m                   \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 41 | \u001b[39m    \u001b[36mconst\u001b[39m dataUrl \u001b[33m=\u001b[39m response\u001b[33m.\u001b[39mdata\u001b[33m.\u001b[39m\u001b[33mApiUrl\u001b[39m \u001b[33m+\u001b[39m param\u001b[33m.\u001b[39m\u001b[33mUrl\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 42 | \u001b[39m    response \u001b[33m=\u001b[39m await axios\u001b[33m.\u001b[39mpost(dataUrl\u001b[33m,\u001b[39m postContent\u001b[33m,\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 43 | \u001b[39m      headers\u001b[33m:\u001b[39m {\u001b[0m\n    at Object.raise (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:6325:17)\n    at Object.unexpected (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:7642:16)\n    at Object.parseExprAtom (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8841:20)\n    at Object.parseExprAtom (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:3601:20)\n    at Object.parseExprSubscripts (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8412:23)\n    at Object.parseMaybeUnary (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8392:21)\n    at Object.parseExprOps (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8267:23)\n    at Object.parseMaybeConditional (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8240:23)\n    at Object.parseMaybeAssign (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8187:21)\n    at Object.parseVar (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10480:26)\n    at Object.parseVarStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10299:10)\n    at Object.parseStatementContent (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9896:21)\n    at Object.parseStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9829:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10405:25)\n    at Object.parseBlockBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10392:10)\n    at Object.parseBlock (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10376:10)\n    at Object.parseFunctionBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9424:24)\n    at Object.parseFunctionBodyAndFinish (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9394:10)\n    at Object.parseMethod (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9348:10)\n    at Object.pushClassMethod (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10804:30)\n    at Object.parseClassMemberWithIsStatic (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10748:14)\n    at Object.parseClassMember (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10668:10)\n    at withTopicForbiddingContext (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10623:14)\n    at Object.withTopicForbiddingContext (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9702:14)\n    at Object.parseClassBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10600:10)\n    at Object.parseClass (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10574:22)\n    at Object.parseExportDefaultExpression (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10999:19)\n    at Object.parseExport (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10905:31)\n    at Object.parseStatementContent (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9933:27)\n    at Object.parseStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9829:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10405:25)\n    at Object.parseBlockBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10392:10)\n    at Object.parseTopLevel (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9758:10)\n    at Object.parse (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:11270:17)\n    at parse (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:11306:38)\n    at parser (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\dashboard\\dashboard\\node_modules\\@babel\\core\\lib\\transformation\\normalize-file.js:170:34)");

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
  measurement: ""
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
  measurement: ""
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
  measurement: "Measurement",
  submit: "Submit",
  comparedWith: "Compared With",
  currerntPeriodPicker: "Current Period",
  previousPeriodPicker: "Previous Period",
  previousPeriodQuickSelection: "Previous Period",
  previousYearQuickSelection: "Previous Year"
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
  measurement: ""
};

/***/ })

}]);
//# sourceMappingURL=summaryDashboard.chunk.js.map