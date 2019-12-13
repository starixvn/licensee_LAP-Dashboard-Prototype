(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common/default"],{

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

  static _getAuthToken(action, type = 1) {
    var tokenUrl = window.TokenUrl + "&_=" + new Date().getTime();
    tokenUrl = tokenUrl.replace("{0}", encodeURIComponent(action));
    tokenUrl = tokenUrl.replace("{1}", type);
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(tokenUrl, {});
  }

  static fetchData(param) {
    var data = param.Data || {};
    var type = param.Type || 1;

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
        'Accept-Language': _languageApi__WEBPACK_IMPORTED_MODULE_1__["langCodeMapper"][_constants__WEBPACK_IMPORTED_MODULE_2__["langCode"]]
      }
    });
  }

}

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

}]);
//# sourceMappingURL=default.chunk.js.map