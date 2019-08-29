(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["summary/summaryRightPanel"],{

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

/***/ "./src/js/pages/summary/components/SummaryRightPanel.jsx":
/*!***************************************************************!*\
  !*** ./src/js/pages/summary/components/SummaryRightPanel.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SummaryRightPanel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");




class SummaryRightPanel extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    const basedCurrency = _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"].find(x => x.Currency.toLowerCase() === _lib_constants__WEBPACK_IMPORTED_MODULE_3__["defaultBasedCurrency"].toLowerCase());
    const selectedBasedCurrency = basedCurrency ? basedCurrency.CurrencyId : _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"][0].CurrencyId;
    this.state = {
      isMounted: false,
      SelectedBaseCurrency: selectedBasedCurrency,
      SelectedCurrency: 0,
      BaseCurrencyList: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"],
      CurrencyList: [],
      wgs: []
    };
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
    }, () => this._fetchData());
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

  _fetchData() {
    var param = {
      Url: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["CurrenyListApiUrl"],
      IsCrossSite: false
    };
    _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__["default"].fetchData(param).then(response => {
      response.data.Currency.unshift({
        Currency: "All",
        CurrencyId: "0"
      });
      this.setState({
        isMounted: true,
        CurrencyList: response.data.Currency
      });
    }).catch(function (error) {
      console.log("error:", error);
    });
  }

  _applyAction() {
    if (this.state.isMounted) {
      let baseCurrency = _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"].find(x => x.CurrencyId == this.state.SelectedBaseCurrency);
      this.props.callbackParent({
        action: 'apply',
        filter: {
          currency: this.state.SelectedCurrency,
          baseCurrency: baseCurrency ? baseCurrency.Currency : ""
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
        SelectedBaseCurrency: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"][0].CurrencyId,
        BaseCurrencyList: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"]
      });
    }

    if (_lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"].find(baseCurrency => baseCurrency.CurrencyId == selectedCurrency)) {
      if (!_lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"].find(baseCurrency => baseCurrency.CurrencyId == this.state.SelectedBaseCurrency)) {
        newState.SelectedBaseCurrency = selectedCurrency;
      }

      newState.BaseCurrencyList = _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"];
      return newState;
    }

    const selectedCurrencyItem = this.state.CurrencyList.find(currency => currency.CurrencyId == selectedCurrency);
    return Object.assign({}, newState, {
      SelectedBaseCurrency: selectedCurrency,
      BaseCurrencyList: _lib_constants__WEBPACK_IMPORTED_MODULE_3__["baseCurrencyList"].concat(selectedCurrencyItem)
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
    const {
      langCode,
      wgs
    } = this.props;
    return langCode && wgs && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "currency"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "currency-label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "currency")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      ref: "currencyDropdownList",
      onChange: e => this._onChangeCurrencyList(e),
      value: this.state.SelectedCurrency
    }, this.state.CurrencyList.map((item, i) => {
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
    }, this.state.BaseCurrencyList.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: i,
        value: item.CurrencyId
      }, item.Currency);
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
      checked: this.state.wgs[item.key],
      className: "filled-in",
      type: "checkbox",
      id: item.key
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      htmlFor: item.key
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, item.key))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "btn-reset",
      onClick: () => this._onResetLayout(),
      href: "#"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getRes(langCode, "reset_layout")));
  }

}

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
//# sourceMappingURL=summaryRightPanel.chunk.js.map