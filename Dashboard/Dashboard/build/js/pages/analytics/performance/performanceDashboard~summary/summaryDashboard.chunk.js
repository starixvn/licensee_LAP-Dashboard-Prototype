(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["performance/performanceDashboard~summary/summaryDashboard"],{

/***/ "./src/js/actions/currencyAction.js":
/*!******************************************!*\
  !*** ./src/js/actions/currencyAction.js ***!
  \******************************************/
/*! exports provided: getCurrencyList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrencyList", function() { return getCurrencyList; });
/* harmony import */ var _types_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types.js */ "./src/js/actions/types.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/widgetApi */ "./src/js/lib/widgetApi.js");



const getCurrencyList = () => {
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
      dispatch(setCurrencyList({
        Currency: response.data.Currency,
        BaseCurrency: response.data.BaseCurrency
      }));
    }).catch(function (error) {
      console.log("error:", error);
    });
  };
};

const setCurrencyList = newData => {
  return {
    type: _types_js__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENCY_LIST"],
    data: newData
  };
};

/***/ }),

/***/ "./src/js/actions/types.js":
/*!*********************************!*\
  !*** ./src/js/actions/types.js ***!
  \*********************************/
/*! exports provided: SET_CURRENCY_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENCY_LIST", function() { return SET_CURRENCY_LIST; });
const SET_CURRENCY_LIST = "SET_CURRENCY_LIST";

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

/***/ "./src/js/reducers/currencyReducer.js":
/*!********************************************!*\
  !*** ./src/js/reducers/currencyReducer.js ***!
  \********************************************/
/*! exports provided: currencyInfo */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\src\\js\\reducers\\currencyReducer.js: Unexpected token, expected \";\" (5:24)\n\n\u001b[0m \u001b[90m 3 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mconst\u001b[39m currencyInfo \u001b[33m=\u001b[39m createReducer({}\u001b[33m,\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 4 | \u001b[39m  [types\u001b[33m.\u001b[39m\u001b[33mSET_CURRENCY_LIST\u001b[39m](state\u001b[33m,\u001b[39m action) {\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 5 | \u001b[39m    \u001b[36mreturn\u001b[39m \u001b[33mObject\u001b[39m\u001b[33m.\u001b[39massign{ state\u001b[33m,\u001b[39m action\u001b[33m.\u001b[39mdata }\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m   | \u001b[39m                        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 6 | \u001b[39m  }\u001b[0m\n\u001b[0m \u001b[90m 7 | \u001b[39m})\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 8 | \u001b[39m\u001b[0m\n    at Object.raise (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:6325:17)\n    at Object.unexpected (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:7642:16)\n    at Object.semicolon (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:7624:40)\n    at Object.parseReturnStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10199:12)\n    at Object.parseStatementContent (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9877:21)\n    at Object.parseStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9829:17)\n    at Object.parseBlockOrModuleBlockBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10405:25)\n    at Object.parseBlockBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10392:10)\n    at Object.parseBlock (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10376:10)\n    at Object.parseFunctionBody (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9424:24)\n    at Object.parseFunctionBodyAndFinish (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9394:10)\n    at Object.parseMethod (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9348:10)\n    at Object.parseObjectMethod (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9264:19)\n    at Object.parseObjPropValue (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9306:23)\n    at Object.parseObjectMember (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9230:10)\n    at Object.parseObj (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9154:25)\n    at Object.parseExprAtom (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8784:28)\n    at Object.parseExprAtom (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:3601:20)\n    at Object.parseExprSubscripts (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8412:23)\n    at Object.parseMaybeUnary (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8392:21)\n    at Object.parseExprOps (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8267:23)\n    at Object.parseMaybeConditional (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8240:23)\n    at Object.parseMaybeAssign (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8187:21)\n    at Object.parseExprListItem (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9491:18)\n    at Object.parseCallExpressionArguments (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8621:22)\n    at Object.parseSubscript (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8514:29)\n    at Object.parseSubscripts (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8433:19)\n    at Object.parseExprSubscripts (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8422:17)\n    at Object.parseMaybeUnary (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8392:21)\n    at Object.parseExprOps (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8267:23)\n    at Object.parseMaybeConditional (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8240:23)\n    at Object.parseMaybeAssign (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:8187:21)\n    at Object.parseVar (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10480:26)\n    at Object.parseVarStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:10299:10)\n    at Object.parseStatementContent (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9896:21)\n    at Object.parseStatement (C:\\Data\\TeamProject\\GIT_LAB\\Licensee\\LAP-Dashboard-Prototype\\Dashboard\\Dashboard\\node_modules\\@babel\\core\\node_modules\\@babel\\parser\\lib\\index.js:9829:17)");

/***/ })

}]);
//# sourceMappingURL=summaryDashboard.chunk.js.map