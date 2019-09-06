(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["performance/performanceDashboard"],{

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

/***/ "./src/js/actions/dateAction.js":
/*!**************************************!*\
  !*** ./src/js/actions/dateAction.js ***!
  \**************************************/
/*! exports provided: setDateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDateRange", function() { return setDateRange; });
const setDateRange = newData => {
  return {
    type: types.SET_DATE_RANGE,
    data: newData
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

/***/ "./src/js/pages/performance/App.jsx":
/*!******************************************!*\
  !*** ./src/js/pages/performance/App.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./src/js/pages/performance/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_FilterTopPanel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/FilterTopPanel */ "./src/js/pages/performance/components/FilterTopPanel.jsx");
/* harmony import */ var _components_TabContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/TabContainer */ "./src/js/pages/performance/components/TabContainer.jsx");







class PerformanceDashboard extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  componentDidMount() {//this.props.getCurrencyInfo();
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "performance-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_FilterTopPanel__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TabContainer__WEBPACK_IMPORTED_MODULE_5__["default"], null));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getCurrencyInfo,
    setBaseCurrency: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setBaseCurrency
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    currencyInfo: state.currencyInfo
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(PerformanceDashboard));

/***/ }),

/***/ "./src/js/pages/performance/actions/filterAction.js":
/*!**********************************************************!*\
  !*** ./src/js/pages/performance/actions/filterAction.js ***!
  \**********************************************************/
/*! exports provided: setMeasurement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMeasurement", function() { return setMeasurement; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/pages/performance/actions/types.js");

const setMeasurement = newData => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_MEASUREMENT"],
    data: newData
  };
};

/***/ }),

/***/ "./src/js/pages/performance/actions/index.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/actions/index.js ***!
  \***************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _actions_currencyAction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../actions/currencyAction */ "./src/js/actions/currencyAction.js");
/* harmony import */ var _filterAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./filterAction */ "./src/js/pages/performance/actions/filterAction.js");
/* harmony import */ var _actions_dateAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../actions/dateAction */ "./src/js/actions/dateAction.js");



const ActionCreators = Object.assign(_actions_currencyAction__WEBPACK_IMPORTED_MODULE_0__, _filterAction__WEBPACK_IMPORTED_MODULE_1__, _actions_dateAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./src/js/pages/performance/actions/types.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/actions/types.js ***!
  \***************************************************/
/*! exports provided: SET_MEASUREMENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MEASUREMENT", function() { return SET_MEASUREMENT; });
const SET_MEASUREMENT = "SET_MEASUREMENT";

/***/ }),

/***/ "./src/js/pages/performance/components/FilterTopPanel.jsx":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/components/FilterTopPanel.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./src/js/pages/performance/actions/index.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class FilterTopPanel extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChangeBaseCurrency", e => {
      this.props.setBaseCurrency(e.target.value);
    });

    _defineProperty(this, "onChangeMeasurement", e => {
      const value = _lib_constants__WEBPACK_IMPORTED_MODULE_5__["defaultData"].measurements.find(_ => _.id == e.target.value);
      this.props.setMeasurement(value);
    });

    _defineProperty(this, "onSubmit", () => {
      alert('submit');
    });
  }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  render() {
    const {
      langCode
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-top-panel"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(langCode, "date")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "date"
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(langCode, "Based")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      onChange: this.onChangeBaseCurrency,
      value: this.props.selectedBaseCurrency
    }, this.props.currencyInfo.BaseCurrency.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: i,
        value: item
      }, item);
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(langCode, "measurement")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      onChange: this.onChangeMeasurement,
      value: this.props.selectedMeasurement.id
    }, _lib_constants__WEBPACK_IMPORTED_MODULE_5__["defaultData"].measurements.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.name);
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "btn-submit",
      href: "#",
      onClick: this.onSubmit
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(langCode, "submit")));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getCurrencyInfo,
    setBaseCurrency: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setBaseCurrency,
    setMeasurement: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setMeasurement
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement,
    currencyInfo: state.currencyInfo,
    measurements: state.measurements
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(FilterTopPanel));

/***/ }),

/***/ "./src/js/pages/performance/components/TabContainer.jsx":
/*!**************************************************************!*\
  !*** ./src/js/pages/performance/components/TabContainer.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./src/js/pages/performance/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../dashboard/components/TabMenu */ "./src/js/pages/dashboard/components/TabMenu.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class TabContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClickTabMenu", tabKey => {
      this.setState({
        selectedTabKey: tabKey
      });
    });

    this.state = {
      selectedTabKey: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuList"][0].key
    };
  }

  componentDidMount() {}

  getCurrentTab() {
    const item = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuList"].find(_ => _.key === this.state.selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this.getCurrentTab();
    const {
      selectedTabKey
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
      selectedTabMenu: selectedTabKey,
      onClickTabMenu: this.onClickTabMenu,
      tabMenuList: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuList"]
    }), CurrentTab && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CurrentTab, null));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getCurrencyInfo,
    setBaseCurrency: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setBaseCurrency,
    setMeasurement: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setMeasurement
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement,
    currencyInfo: state.currencyInfo,
    measurements: state.measurements
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TabContainer));

/***/ }),

/***/ "./src/js/pages/performance/components/normal/BoxInfoMeasureItem.jsx":
/*!***************************************************************************!*\
  !*** ./src/js/pages/performance/components/normal/BoxInfoMeasureItem.jsx ***!
  \***************************************************************************/
/*! exports provided: BoxInfoMeasureItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxInfoMeasureItem", function() { return BoxInfoMeasureItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const BoxInfoMeasureItem = props => {
  const {
    measurement,
    totalValue,
    changeValue
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box-info-measure"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box-info-mesure-name"
  }, measurement), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box-info-value-total"
  }, totalValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box-info-value-change"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: changeValue < 0 ? "arrow-down" : "arrow-up"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, changeValue, "%")));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(BoxInfoMeasureItem));

/***/ }),

/***/ "./src/js/pages/performance/components/normal/BoxInfoMeasureList.jsx":
/*!***************************************************************************!*\
  !*** ./src/js/pages/performance/components/normal/BoxInfoMeasureList.jsx ***!
  \***************************************************************************/
/*! exports provided: BoxInfoMeasureList, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoxInfoMeasureList", function() { return BoxInfoMeasureList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _BoxInfoMeasureItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BoxInfoMeasureItem */ "./src/js/pages/performance/components/normal/BoxInfoMeasureItem.jsx");


const BoxInfoMeasureList = props => {
  const {
    items
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box-info-measure-list"
  }, items && items.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BoxInfoMeasureItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
    key: 'box_info_measure_' + _.measurementName,
    measurement: _.measurementName,
    totalValue: _.totalValue,
    changeValue: _.changeValue
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(BoxInfoMeasureList));

/***/ }),

/***/ "./src/js/pages/performance/components/normal/TableMajorItem.jsx":
/*!***********************************************************************!*\
  !*** ./src/js/pages/performance/components/normal/TableMajorItem.jsx ***!
  \***********************************************************************/
/*! exports provided: TableMajorItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableMajorItem", function() { return TableMajorItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const renderHeader = header => {
  return header.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _ + ''));
};

const renderRows = (data, renderRow) => {
  return data.map(rowData => renderRow(rowData));
};

const TableMajorItem = props => {
  const {
    header,
    data,
    title,
    renderRow
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-major"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    class: "table-major-title"
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table-major-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, header && renderHeader(header))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, data && renderRow && renderRows(data, renderRow))));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TableMajorItem));

/***/ }),

/***/ "./src/js/pages/performance/components/tabs/CurrencyTab.jsx":
/*!******************************************************************!*\
  !*** ./src/js/pages/performance/components/tabs/CurrencyTab.jsx ***!
  \******************************************************************/
/*! exports provided: CurrencyTab, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CurrencyTab", function() { return CurrencyTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions */ "./src/js/pages/performance/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");




class CurrencyTab extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Currency Tab");
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].getCurrencyInfo,
    setBaseCurrency: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setBaseCurrency,
    setMeasurement: _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"].setMeasurement
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement,
    currencyInfo: state.currencyInfo,
    measurements: state.measurements
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(CurrencyTab));

/***/ }),

/***/ "./src/js/pages/performance/components/tabs/OverviewTab.jsx":
/*!******************************************************************!*\
  !*** ./src/js/pages/performance/components/tabs/OverviewTab.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions */ "./src/js/pages/performance/actions/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _normal_BoxInfoMeasureList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../normal/BoxInfoMeasureList */ "./src/js/pages/performance/components/normal/BoxInfoMeasureList.jsx");
/* harmony import */ var _normal_TableMajorItem__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../normal/TableMajorItem */ "./src/js/pages/performance/components/normal/TableMajorItem.jsx");
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");








class OverviewTab extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  renderMajorTableList() {
    return null;
  }

  renderBoxInfoMeasureList() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_normal_BoxInfoMeasureList__WEBPACK_IMPORTED_MODULE_4__["default"], {
      items: [{
        measurementName: 'Turnover',
        totalValue: 'EUR 123,59k',
        changeValue: -5
      }, {
        measurementName: 'Win Loss',
        totalValue: 'EUR 123,59k',
        changeValue: 5
      }, {
        measurementName: 'Margin',
        totalValue: '3%',
        changeValue: 23
      }]
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "overview-tab"
    }, this.renderBoxInfoMeasureList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      class: "table-major-list"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_normal_TableMajorItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      header: ['Currency', this.props.selectedMeasurement.name, '%CHG'],
      title: 'MAJOR CHANGES - By Currency',
      data: [{
        name: 'MYR',
        totalValue: 1235,
        changeValue: '5%'
      }, {
        name: 'THB',
        totalValue: 1235,
        changeValue: '5%'
      }, {
        name: 'USD',
        totalValue: 91231239,
        changeValue: '-5%'
      }],
      renderRow: item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: item.name
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.totalValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.changeValue))
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_normal_TableMajorItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      header: ['Bettype', this.props.selectedMeasurement.name, '%CHG'],
      title: 'MAJOR CHANGES - By Bettyes',
      data: [{
        name: 'MYR',
        totalValue: 1235,
        changeValue: '5%'
      }, {
        name: 'THB',
        totalValue: 1235,
        changeValue: '5%'
      }, {
        name: 'USD',
        totalValue: 91231239,
        changeValue: '-5%'
      }],
      renderRow: item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: item.name
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.totalValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.changeValue))
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_normal_TableMajorItem__WEBPACK_IMPORTED_MODULE_5__["default"], {
      header: ['Platform', this.props.selectedMeasurement.name, '%CHG'],
      title: 'MAJOR CHANGES - By Platforms',
      data: [{
        name: 'MYR',
        totalValue: 1235,
        changeValue: '5%'
      }, {
        name: 'THB',
        totalValue: 1235,
        changeValue: '5%'
      }, {
        name: 'USD',
        totalValue: 91231239,
        changeValue: '-5%'
      }],
      renderRow: item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: item.name
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.totalValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.changeValue))
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement
  };
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(OverviewTab));

/***/ }),

/***/ "./src/js/pages/performance/index.js":
/*!*******************************************!*\
  !*** ./src/js/pages/performance/index.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App */ "./src/js/pages/performance/App.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-logger */ "./node_modules/redux-logger/dist/redux-logger.js");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reducers/index */ "./src/js/pages/performance/reducers/index.js");







 // middleware that logs actions

/* global __DEV__ */

const __DEV__ = '__DEV__';
const loggerMiddleware = Object(redux_logger__WEBPACK_IMPORTED_MODULE_6__["createLogger"])({
  predicate: (getState, action) => __DEV__
});
const defaultState = {
  currencyInfo: {
    Currency: [],
    BaseCurrency: []
  }
};

function configureStore(initialState) {
  const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_4__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_4__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_5__["default"], // lets us dispatch() functions
  loggerMiddleware));
  return Object(redux__WEBPACK_IMPORTED_MODULE_4__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_7__["default"], initialState, enhancer);
}

const store = configureStore(defaultState);
class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
      store: store
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_1__["default"], null));
  }

}

/***/ }),

/***/ "./src/js/pages/performance/lib/constants.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/lib/constants.js ***!
  \***************************************************/
/*! exports provided: defaultData, tabMenuList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultData", function() { return defaultData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuList", function() { return tabMenuList; });
/* harmony import */ var _components_tabs_OverviewTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/tabs/OverviewTab */ "./src/js/pages/performance/components/tabs/OverviewTab.jsx");
/* harmony import */ var _components_tabs_CurrencyTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/tabs/CurrencyTab */ "./src/js/pages/performance/components/tabs/CurrencyTab.jsx");


const defaultData = {
  measurements: [{
    id: 1,
    name: 'Turnover'
  }, {
    id: 2,
    name: 'Gross Profit'
  }, {
    id: 3,
    name: 'Margin'
  }]
};
const tabMenuList = [{
  key: 'overview',
  name: 'Overview',
  component: _components_tabs_OverviewTab__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  key: 'currency',
  name: 'Currency',
  component: _components_tabs_CurrencyTab__WEBPACK_IMPORTED_MODULE_1__["default"]
}];

/***/ }),

/***/ "./src/js/pages/performance/reducers/filterReducer.js":
/*!************************************************************!*\
  !*** ./src/js/pages/performance/reducers/filterReducer.js ***!
  \************************************************************/
/*! exports provided: selectedMeasurement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedMeasurement", function() { return selectedMeasurement; });
/* harmony import */ var _lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/pages/performance/actions/types.js");


const selectedMeasurement = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_MEASUREMENT"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/pages/performance/reducers/index.js":
/*!****************************************************!*\
  !*** ./src/js/pages/performance/reducers/index.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../reducers/currencyReducer */ "./src/js/reducers/currencyReducer.js");
/* harmony import */ var _reducers_dateReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../reducers/dateReducer */ "./src/js/reducers/dateReducer.js");
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filterReducer */ "./src/js/pages/performance/reducers/filterReducer.js");




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__, _reducers_dateReducer__WEBPACK_IMPORTED_MODULE_2__, _filterReducer__WEBPACK_IMPORTED_MODULE_3__)));

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

/***/ "./src/js/reducers/dateReducer.js":
/*!****************************************!*\
  !*** ./src/js/reducers/dateReducer.js ***!
  \****************************************/
/*! exports provided: selectedDateRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedDateRange", function() { return selectedDateRange; });
/* harmony import */ var _lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/createReducer.js */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/actions/types.js");


const selectedDateRange = Object(_lib_createReducer_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_DATE_RANGE"]](state, action) {
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
  date: "Date",
  measurement: "Measurement",
  submit: "Submit"
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
  date: "",
  measurement: ""
};

/***/ })

}]);
//# sourceMappingURL=performanceDashboard.chunk.js.map