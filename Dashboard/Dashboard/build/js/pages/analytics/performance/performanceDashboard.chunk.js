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

/***/ "./src/js/components/CoupleMonthRangePicker.jsx":
/*!******************************************************!*\
  !*** ./src/js/components/CoupleMonthRangePicker.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CoupleMonthRangePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MonthRangePicker */ "./src/js/components/MonthRangePicker.jsx");
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/languageApi */ "./src/js/lib/languageApi.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const _getPreviousPeriod = currentPeriod => {
  const {
    from
  } = currentPeriod;
  const distance = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getDistanceBetweenPeriod"])(currentPeriod);
  const prevPeriodTo = {
    month: from.month - 1 || 12,
    year: from.month - 1 ? from.year : from.year - 1
  };
  let dateTo = new Date(prevPeriodTo.year, prevPeriodTo.month - 1);
  dateTo = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["addMonths"])(dateTo, distance);
  const prevPeriodFrom = {
    month: dateTo.getMonth() + 1,
    year: dateTo.getFullYear()
  };
  return {
    from: prevPeriodFrom,
    to: prevPeriodTo
  };
};

const _getPreviousYear = currentPeriod => {
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

const _getPeriodByNumberOfLastMonths = (currentTime, numberOfMonth) => {
  const {
    month,
    year
  } = currentTime;
  let date = new Date(year, month - 1);
  date = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["addMonths"])(date, -numberOfMonth);
  const from = {
    month: date.getMonth(),
    year: date.getFullYear()
  };
  const to = {
    month: month - 1 || 12,
    year: month - 1 ? year : year - 1
  };
  return {
    from,
    to
  };
};

const _previousPeriodQuickSelections = [{
  label: "Previous Period",
  onSelect: selectedCurrentPeriod => _getPreviousPeriod(selectedCurrentPeriod)
}, {
  label: "Previous Year",
  onSelect: selectedCurrentPeriod => _getPreviousYear(selectedCurrentPeriod)
}];
const _currentPeriodQuickSelections = [{
  label: "Last Month",
  onSelect: currentTime => _getPeriodByNumberOfLastMonths(currentTime, 1)
}, {
  label: "Last 3 months",
  onSelect: currentTime => _getPeriodByNumberOfLastMonths(currentTime, 3)
}, {
  label: "Last 6 months",
  onSelect: currentTime => _getPeriodByNumberOfLastMonths(currentTime, 6)
}];
class CoupleMonthRangePicker extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onChangeRangeCurrentPeriod", selectedRange => {
      const {
        onChangeRangeOfTwoPeriod
      } = this.props;
      const periods = {
        currentPeriod: selectedRange,
        previousPeriod: this.state.previousPeriod
      };
      this.setState(periods, () => onChangeRangeOfTwoPeriod && onChangeRangeOfTwoPeriod(periods));
    });

    _defineProperty(this, "_onChangeRangePreviousPeriod", selectedRange => {
      const {
        onChangeRangeOfTwoPeriod
      } = this.props;
      const periods = {
        currentPeriod: this.state.currentPeriod,
        previousPeriod: selectedRange
      };
      this.setState(periods, () => onChangeRangeOfTwoPeriod && onChangeRangeOfTwoPeriod(periods));
    });

    _defineProperty(this, "_renderCurrentPeriodQuickSelection", () => {
      return _currentPeriodQuickSelections.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "quick-selection",
        onClick: () => {
          const currentPeriod = _.onSelect(Object(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["getCurrentTime"])());

          this.setState({
            currentPeriod
          });
        }
      }, _.label));
    });

    _defineProperty(this, "_renderPreviousPeriodQuickSelection", () => {
      return _previousPeriodQuickSelections.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "quick-selection",
        onClick: () => {
          const previousPeriod = _.onSelect(this.state.currentPeriod);

          this.setState({
            previousPeriod
          });
        }
      }, _.label));
    });

    const {
      currentPeriod: _currentPeriod,
      previousPeriod: _previousPeriod,
      range
    } = this.props;
    const now = new Date();
    this.state = {
      currentPeriod: _currentPeriod || {
        from: {
          year: now.getFullYear(),
          month: now.getMonth()
        },
        to: {
          year: now.getFullYear(),
          month: now.getMonth()
        }
      },
      previousPeriod: _previousPeriod || {
        from: {
          year: now.getFullYear(),
          month: now.getMonth()
        },
        to: {
          year: now.getFullYear(),
          month: now.getMonth()
        }
      }
    };
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "couple-month-range"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-range-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["langCode"], "currerntPeriodPicker")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onChangeRange: this._onChangeRangeCurrentPeriod,
      quickSelections: this._renderCurrentPeriodQuickSelection
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-range-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["langCode"], "previousPeriodPicker")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      onChangeRange: this._onChangeRangePreviousPeriod,
      quickSelections: this._renderPreviousPeriodQuickSelection
    })));
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

/***/ "./src/js/components/MonthRangePicker.jsx":
/*!************************************************!*\
  !*** ./src/js/components/MonthRangePicker.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MonthRangePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-monthpicker */ "./node_modules/@9softstudio/react-monthpicker/dist/index.js");
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const getMaxYearTo = ({
  year,
  month
}, range, maxYear) => {
  let maxDate = new Date(year, month);
  maxDate = new Date(maxDate.setMonth(maxDate.getMonth() + range));
  let maxYearTo = maxDate.getFullYear();
  return maxYearTo < maxYear ? maxYearTo : maxYear;
};

const getMaxMonthTo = (month, range) => {
  const result = (month + range - 1) % 12 || -1;
  return result;
};

class MonthRangePicker extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_toggle", () => {
      if (this.props.enable) {
        this.setState(prevState => {
          !prevState.open && this._saveCurrentRange();
          return {
            open: !prevState.open
          };
        });
      }
    });

    _defineProperty(this, "_onChangeYearFrom", selectedYear => {
      let {
        from
      } = this.state;
      from = { ...from,
        ...{
          dropdownYear: selectedYear
        }
      };
      this.setState({
        from
      });
    });

    _defineProperty(this, "_onChangeMonthFrom", selectedMonth => {
      let {
        from,
        to
      } = this.state;
      from = { ...from,
        ...{
          month: selectedMonth,
          year: from.dropdownYear
        }
      };
      to = { ...to,
        ...from
      };
      this.setState({
        from,
        to
      });
    });

    _defineProperty(this, "_onChangeYearTo", selectedYear => {
      let {
        to
      } = this.state;
      to = { ...to,
        ...{
          dropdownYear: selectedYear
        }
      };
      this.setState({
        to
      });
    });

    _defineProperty(this, "_onChangeMonthTo", selectedMonth => {
      let {
        to
      } = this.state;
      to = { ...to,
        ...{
          month: selectedMonth,
          year: to.dropdownYear
        }
      };
      this.setState({
        to
      });
    });

    _defineProperty(this, "_handleClickOutSide", event => {
      const containerElement = this.container.current;
      const clickOutside = containerElement && !containerElement.contains(event.target);

      if (clickOutside && this.state.open) {
        this._cancel();
      }
    });

    _defineProperty(this, "_onConfirmChangeRange", () => {
      const {
        onChangeRange
      } = this.props;
      const {
        from,
        to
      } = this.state;
      this.setState({
        open: false
      }, () => onChangeRange && onChangeRange({
        from,
        to
      }));
    });

    _defineProperty(this, "_cancel", () => {
      this.setState({ ...this.currentRange,
        open: false
      });
    });

    const {
      open,
      selectedDropdownYear,
      selectedMonth: _selectedMonth,
      selectedYear: _selectedYear
    } = this.props;
    const now = new Date();
    const initialYear = selectedDropdownYear || now.getFullYear();
    this.state = {
      open: open,
      from: {
        dropdownYear: _selectedYear || initialYear,
        year: _selectedYear || initialYear,
        month: _selectedMonth ? _selectedMonth - 1 : now.getMonth()
      },
      to: {
        dropdownYear: _selectedYear || initialYear,
        year: _selectedYear || initialYear,
        month: _selectedMonth ? _selectedMonth - 1 : now.getMonth()
      }
    };
    this.container = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState) {
      return null;
    }

    return null;
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickOutSide, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutSide, true);
  }

  _saveCurrentRange() {
    const {
      from,
      to
    } = this.state;
    this.currentRange = {
      from,
      to
    };
  }

  _getDisplayText() {
    const {
      from,
      to
    } = this.state;
    const {
      onFormat
    } = this.props;
    return `${onFormat(from.month + 1, from.year)}  -  ${onFormat(to.month + 1, to.year)}`;
  }

  render() {
    const {
      open,
      from,
      to
    } = this.state;
    let {
      monthNames,
      hasRange,
      minMonth,
      minYear,
      maxMonth,
      maxYear,
      isReadonly,
      iconElement,
      enable,
      range,
      quickSelections
    } = this.props;
    const maxYearTo = getMaxYearTo(from, range, maxYear);
    const maxMonthTo = getMaxMonthTo(from.month + 1, range);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "rmp-main-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: enable ? 'mp-form-container' : 'mp-form-container disable',
      onClick: this._toggle
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      className: "mp-form-input",
      value: this._getDisplayText(),
      readOnly: isReadonly
    }), iconElement), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "range-mp-container",
      style: {
        display: open ? 'block' : 'none'
      },
      ref: this.container
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "quick-selection-container"
    }, quickSelections && quickSelections(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-confirm",
      onClick: this._onConfirmChangeRange
    }, "OK"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-cancel m-l-5",
      onClick: this._cancel
    }, "Cancel"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mp-container mp-from"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["YearSelector"], {
      minYear: minYear,
      maxYear: maxYear,
      selectedDropdownYear: from.dropdownYear,
      onSelect: this._onChangeYearFrom
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["MonthList"], {
      monthNames: monthNames,
      hasRange: hasRange,
      selectedDropdownYear: from.dropdownYear,
      selectedMonth: from.month,
      selectedYear: from.year,
      minYear: minYear,
      maxYear: maxYear,
      minMonth: minMonth,
      maxMonth: maxMonth,
      onSelect: this._onChangeMonthFrom
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mp-container mp-to"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["YearSelector"], {
      minYear: from.year,
      maxYear: maxYearTo,
      selectedDropdownYear: to.dropdownYear,
      onSelect: this._onChangeYearTo
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["MonthList"], {
      monthNames: monthNames,
      hasRange: hasRange,
      d: true,
      selectedDropdownYear: to.dropdownYear,
      selectedMonth: to.month,
      selectedYear: to.year,
      minYear: from.year,
      maxYear: maxYearTo,
      minMonth: from.month + 1,
      maxMonth: maxMonthTo,
      onSelect: this._onChangeMonthTo
    }))));
  }

}

_defineProperty(MonthRangePicker, "propTypes", {
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  minMonth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  minYear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  maxMonth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  maxYear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  monthNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string)),
  hasRange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  range: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  selectedDropdownYear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  selectedMonth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  onSelect: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onFormat: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isReadonly: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  iconElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  enable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  quickSelections: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(MonthRangePicker, "defaultProps", {
  open: false,
  onSelect: () => {},
  onFormat: _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__["defaultFormatFunc"],
  isReadonly: true,
  enable: true,
  minYear: new Date().getFullYear() - 5,
  maxYear: new Date().getFullYear(),
  hasRange: true,
  range: 12
});

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
/*! exports provided: getDistanceBetweenPeriod, addMonths, defaultFormatFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDistanceBetweenPeriod", function() { return getDistanceBetweenPeriod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMonths", function() { return addMonths; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultFormatFunc", function() { return defaultFormatFunc; });
const getDistanceBetweenPeriod = ({
  from,
  to
}) => {
  const distance = 12 * (to.year - from.year) + (to.month - from.month);
  return distance;
};
const addMonths = (date, numberOfMonth) => {
  const newDate = new Date(date.setMonth(date.getMonth() - numberOfMonth));
  return newDate;
};
const defaultFormatFunc = (month, year) => {
  return `${month < 10 ? '0' + month : month}/${year}`;
};

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

  static async fetchDataCrossSite({
    url,
    params,
    body
  }) {
    let response = await widgetApi._getAuthToken(url);
    const token = response.data.Token || '';
    body = body || {};
    params = params || {};
    url = 'http://localhost:5001' + url;
    response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, body, {
      headers: {
        'X-Auth-Token': token
      }
    });
    return response;
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
/* harmony import */ var _components_Loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/Loader */ "./src/js/components/Loader.jsx");
/* harmony import */ var _performance_lib_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../performance/lib/service */ "./src/js/pages/performance/lib/service.js");









class PerformanceDashboard extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const {
      currentChildTabKey,
      selectedComparePeriods,
      selectedBaseCurrency,
      selectedMeasurement
    } = this.props;
    const filterData = _performance_lib_service__WEBPACK_IMPORTED_MODULE_7__["generalService"].getFilterData({
      selectedComparePeriods,
      selectedBaseCurrency,
      selectedMeasurement
    });
    this.props.getAnalyticData(filterData, currentChildTabKey);
  }

  render() {
    const {
      isLoading
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "performance-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isLoading: isLoading,
      widgetKey: this.props.widgetKey
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_FilterTopPanel__WEBPACK_IMPORTED_MODULE_4__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TabContainer__WEBPACK_IMPORTED_MODULE_5__["default"], null));
  }

}

function mapDispatchToProps(dispatch) {
  const {
    getAnalyticData
  } = _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getAnalyticData
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    isLoading,
    currentChildTabKey,
    selectedComparePeriods,
    selectedBaseCurrency,
    selectedMeasurement
  } = state;
  return Object.assign({}, {
    isLoading,
    currentChildTabKey,
    selectedComparePeriods,
    selectedBaseCurrency,
    selectedMeasurement
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(PerformanceDashboard));

/***/ }),

/***/ "./src/js/pages/performance/actions/analyticDataAction.js":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/actions/analyticDataAction.js ***!
  \****************************************************************/
/*! exports provided: getAnalyticData, setAnalyticData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnalyticData", function() { return getAnalyticData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAnalyticData", function() { return setAnalyticData; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/pages/performance/actions/types.js");
/* harmony import */ var _loadingAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadingAction */ "./src/js/pages/performance/actions/loadingAction.js");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/api */ "./src/js/pages/performance/lib/api.js");



const getAnalyticData = (filterData, tabKey) => {
  return async dispatch => {
    dispatch(Object(_loadingAction__WEBPACK_IMPORTED_MODULE_1__["setLoading"])(true));

    try {
      const data = await _lib_api__WEBPACK_IMPORTED_MODULE_2__["factoryApi"][tabKey](filterData);
      dispatch(setAnalyticData(data));
    } catch (error) {
      console.log('error', error.message);
    }

    dispatch(Object(_loadingAction__WEBPACK_IMPORTED_MODULE_1__["setLoading"])(false));
  };
};
const setAnalyticData = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_ANALYTIC_DATA"],
    data
  };
};

/***/ }),

/***/ "./src/js/pages/performance/actions/filterAction.js":
/*!**********************************************************!*\
  !*** ./src/js/pages/performance/actions/filterAction.js ***!
  \**********************************************************/
/*! exports provided: setMeasurement, setComparePeriods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMeasurement", function() { return setMeasurement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setComparePeriods", function() { return setComparePeriods; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/pages/performance/actions/types.js");

const setMeasurement = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_MEASUREMENT"],
    data
  };
};
const setComparePeriods = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_COMPARE_PERIODS"],
    data
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
/* harmony import */ var _analyticDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var _loadingAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadingAction */ "./src/js/pages/performance/actions/loadingAction.js");
/* harmony import */ var _tabAction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tabAction */ "./src/js/pages/performance/actions/tabAction.js");





const ActionCreators = Object.assign(_actions_currencyAction__WEBPACK_IMPORTED_MODULE_0__, _filterAction__WEBPACK_IMPORTED_MODULE_1__, _loadingAction__WEBPACK_IMPORTED_MODULE_3__, _tabAction__WEBPACK_IMPORTED_MODULE_4__, _analyticDataAction__WEBPACK_IMPORTED_MODULE_2__);

/***/ }),

/***/ "./src/js/pages/performance/actions/loadingAction.js":
/*!***********************************************************!*\
  !*** ./src/js/pages/performance/actions/loadingAction.js ***!
  \***********************************************************/
/*! exports provided: setLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLoading", function() { return setLoading; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/pages/performance/actions/types.js");

const setLoading = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_LOADING"],
    data
  };
};

/***/ }),

/***/ "./src/js/pages/performance/actions/tabAction.js":
/*!*******************************************************!*\
  !*** ./src/js/pages/performance/actions/tabAction.js ***!
  \*******************************************************/
/*! exports provided: setCurrentTab */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCurrentTab", function() { return setCurrentTab; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/js/pages/performance/actions/types.js");

const setCurrentTab = tabKey => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_CURRENT_CHILD_TAB"],
    data: tabKey
  };
};

/***/ }),

/***/ "./src/js/pages/performance/actions/types.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/actions/types.js ***!
  \***************************************************/
/*! exports provided: SET_LOADING, SET_CURRENT_CHILD_TAB, SET_MEASUREMENT, SET_COMPARE_PERIODS, GET_ANALYTIC_DATA, SET_ANALYTIC_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOADING", function() { return SET_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENT_CHILD_TAB", function() { return SET_CURRENT_CHILD_TAB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MEASUREMENT", function() { return SET_MEASUREMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_COMPARE_PERIODS", function() { return SET_COMPARE_PERIODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ANALYTIC_DATA", function() { return GET_ANALYTIC_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ANALYTIC_DATA", function() { return SET_ANALYTIC_DATA; });
const SET_LOADING = "SET_LOADING";
const SET_CURRENT_CHILD_TAB = "SET_CURRENT_CHILD_TAB";
const SET_MEASUREMENT = "SET_MEASUREMENT";
const SET_COMPARE_PERIODS = "SET_COMPARE_PERIODS";
const GET_ANALYTIC_DATA = "GET_ANALYTIC_DATA";
const SET_ANALYTIC_DATA = "SET_ANALYTIC_DATA";

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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _components_CoupleMonthRangePicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/CoupleMonthRangePicker */ "./src/js/components/CoupleMonthRangePicker.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class FilterTopPanel extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onChangeBaseCurrency", e => {
      this.props.setBaseCurrency(e.target.value);
    });

    _defineProperty(this, "_onChangeMeasurement", e => {
      const value = _lib_constants__WEBPACK_IMPORTED_MODULE_5__["defaultData"].measurements.find(_ => _.id == e.target.value);
      this.props.setMeasurement(value);
    });

    _defineProperty(this, "_onChangeRangeOfTwoPeriod", ({
      currentPeriod,
      previousPeriod
    }) => {
      this.props.setComparePeriods({
        currentPeriod,
        previousPeriod
      });
    });

    _defineProperty(this, "_onSubmit", () => {
      const {
        currentChildTabKey,
        selectedComparePeriods,
        selectedBaseCurrency,
        selectedMeasurement
      } = this.props;
      const filterData = _lib_service__WEBPACK_IMPORTED_MODULE_7__["generalService"].getFilterData({
        selectedComparePeriods,
        selectedBaseCurrency,
        selectedMeasurement
      });
      this.props.getAnalyticData(filterData, currentChildTabKey);
    });
  }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  _getFilterData() {
    return filterData;
  }

  render() {
    const {
      selectedComparePeriods
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-top-panel"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CoupleMonthRangePicker__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onChangeRangeOfTwoPeriod: this._onChangeRangeOfTwoPeriod,
      currentPeriod: selectedComparePeriods.currentPeriod,
      previousPeriod: selectedComparePeriods.previousPeriod
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["langCode"], "Based")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "select-filter",
      onChange: e => this._onChangeBaseCurrency(e),
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
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["langCode"], "measurement")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "select-filter",
      onChange: e => this._onChangeMeasurement(e),
      value: this.props.selectedMeasurement.id
    }, _lib_constants__WEBPACK_IMPORTED_MODULE_5__["defaultData"].measurements.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.name);
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "btn-submit",
      href: "#",
      onClick: this._onSubmit
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["langCode"], "submit")));
  }

}

function mapDispatchToProps(dispatch) {
  const {
    getCurrencyInfo,
    setBaseCurrency,
    setMeasurement,
    setComparePeriods,
    getAnalyticData
  } = _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo,
    getAnalyticData,
    setBaseCurrency,
    setMeasurement,
    setComparePeriods
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    selectedBaseCurrency,
    selectedMeasurement,
    currencyInfo,
    selectedComparePeriods,
    currentChildTabKey
  } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    selectedComparePeriods,
    currencyInfo,
    currentChildTabKey
  });
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








class TabContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onClickTabMenu", tabKey => {
      this.props.setCurrentTab(tabKey);
    });
  }

  _getCurrentTab() {
    const {
      selectedTabKey
    } = this.props;
    const item = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuList"].find(_ => _.key === selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this._getCurrentTab();

    const {
      selectedTabKey
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_5__["default"], {
      selectedTabMenu: selectedTabKey,
      onClickTabMenu: this._onClickTabMenu,
      tabMenuList: _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuList"]
    }), CurrentTab && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CurrentTab, null));
  }

}

function mapDispatchToProps(dispatch) {
  const {
    setCurrentTab
  } = _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    setCurrentTab
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    currentChildTabKey
  } = state;
  return Object.assign({}, {
    selectedTabKey: currentChildTabKey
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TabContainer));

/***/ }),

/***/ "./src/js/pages/performance/components/charts/GrowthChart.jsx":
/*!********************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/GrowthChart.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _base_MixBarLineChart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/MixBarLineChart */ "./src/js/pages/performance/components/charts/base/MixBarLineChart.jsx");





class GrowthChart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {}

  render() {
    const {
      currentMeasuremnent
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_MixBarLineChart__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: `${currentMeasuremnent || ''} Growth`
    }));
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  return {};
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(GrowthChart));

/***/ }),

/***/ "./src/js/pages/performance/components/charts/base/MixBarLineChart.jsx":
/*!*****************************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/base/MixBarLineChart.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");


 //

const data = {
  //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sales',
    type: 'line',
    lineTension: 0,
    data: [51, -20, 40, -35, 60, 37, 105],
    fill: false,
    borderColor: 'rgba(75, 172, 198, 1)',
    backgroundColor: 'rgba(75, 172, 198, 1)',
    pointBorderColor: 'rgba(75, 172, 198, 1)',
    pointBackgroundColor: 'rgba(75, 172, 198, 1)',
    pointHoverBackgroundColor: 'rgba(75, 172, 198, 1)',
    pointHoverBorderColor: 'rgba(75, 172, 198, 1)',
    yAxisID: 'y-axis-2'
  }, {
    type: 'bar',
    label: 'Visitor',
    data: [200, 185, 590, 621, 250, 400, 95],
    fill: false,
    backgroundColor: 'rgba(247,150,70,1)',
    borderColor: 'rgba(247,150,70,0.5)',
    hoverBackgroundColor: 'rgba(247,150,70,1)',
    hoverBorderColor: 'rgba(247,150,70,0.5)',
    yAxisID: 'y-axis-1'
  }]
};
const options = {
  responsive: true,
  elements: {
    line: {
      fill: false
    }
  },
  hover: {
    animationDuration: 0
  },
  legend: {
    display: false
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
          const text = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(value);
          const textWidth = ctx.measureText(text).width;
          const yOffset = value > 0 ? 6 : -7;
          ctx.fillText(text, element._model.x - textWidth / 2, element._model.y - yOffset);
        });
      });
    }
  },
  scales: {
    xAxes: [{
      display: true,
      gridLines: {
        display: false
      },
      labels: {
        show: true
      },
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    }],
    yAxes: [{
      type: 'linear',
      display: true,
      position: 'left',
      id: 'y-axis-1',
      gridLines: {
        display: false
      }
    }, {
      type: 'linear',
      display: true,
      position: 'right',
      id: 'y-axis-2'
    }]
  }
};
const plugins = [{
  afterDraw: (chartInstance, easing) => {
    const ctx = chartInstance.chart.ctx;
  }
}];

class MixBarLineChart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "chart-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "chart-title"
    }, this.props.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
      data: data,
      options: options,
      plugins: plugins
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "chart-footer"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "ABC")));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (MixBarLineChart);

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

/***/ "./src/js/pages/performance/components/normal/TableMajorChangeItem.jsx":
/*!*****************************************************************************!*\
  !*** ./src/js/pages/performance/components/normal/TableMajorChangeItem.jsx ***!
  \*****************************************************************************/
/*! exports provided: TableMajorChangeItem, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TableMajorChangeItem", function() { return TableMajorChangeItem; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const renderHeader = header => {
  return header.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", null, _ + ''));
};

const renderRows = (data, renderRow) => {
  return data.map(rowData => renderRow(rowData));
};

const TableMajorChangeItem = props => {
  const {
    header,
    data,
    title,
    renderRow
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-major"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-major-title"
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table-major-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", null, header && renderHeader(header))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, data && renderRow && renderRows(data, renderRow))));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(TableMajorChangeItem));

/***/ }),

/***/ "./src/js/pages/performance/components/normal/ValueChangeIcon.jsx":
/*!************************************************************************!*\
  !*** ./src/js/pages/performance/components/normal/ValueChangeIcon.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const ValueChangeIcon = props => {
  function getClassName(value) {
    if (value > 0) return 'arrow-up';
    if (value < 0) return 'arrow-down';
    return 'rec-equal';
  }

  ;
  const className = getClassName(props.value);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: className
  });
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(ValueChangeIcon));

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
  isLoading: false,
  currentChildTabKey: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["tabMenuList"][0].key,
  currencyInfo: {
    Currency: [],
    BaseCurrency: []
  },
  selectedMeasurement: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["defaultData"].measurements[0],
  selectedBaseCurrency: window.defaultBaseCurrency,
  analyticData: {},
  selectedComparePeriods: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["defaultData"].comparePeriods
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

/***/ "./src/js/pages/performance/lib/api.js":
/*!*********************************************!*\
  !*** ./src/js/pages/performance/lib/api.js ***!
  \*********************************************/
/*! exports provided: factoryApi, overviewApi, currencyApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factoryApi", function() { return factoryApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overviewApi", function() { return overviewApi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyApi", function() { return currencyApi; });
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");


const factoryApi = {
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuList"][0].key]: filterData => {
    return overviewApi.getCombineData(filterData);
  },
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuList"][1].key]: filterData => {
    return currencyApi.getCombineData(filterData);
  }
};
const overviewApi = {
  getCombineData: async filterData => {
    const url = '/api/performance/overview';
    const body = filterData;
    const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDataCrossSite({
      url,
      body
    });

    if (response && response.data) {
      return response.data.data;
    }

    return null;
  }
};
const currencyApi = {
  getCombineData: async filterData => {
    const url = '/api/performance/currency';
    const body = filterData;
    const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].fetchDataCrossSite({
      url,
      body
    });

    if (response && response.data) {
      debugger;
      return response.data.data;
    }

    return null;
  }
};

/***/ }),

/***/ "./src/js/pages/performance/lib/constants.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/lib/constants.js ***!
  \***************************************************/
/*! exports provided: defaultData, tabMenuList, majorChangeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultData", function() { return defaultData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuList", function() { return tabMenuList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "majorChangeList", function() { return majorChangeList; });
/* harmony import */ var _tabs_overview_OverviewTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tabs/overview/OverviewTab */ "./src/js/pages/performance/tabs/overview/OverviewTab.jsx");
/* harmony import */ var _tabs_currency_CurrencyTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tabs/currency/CurrencyTab */ "./src/js/pages/performance/tabs/currency/CurrencyTab.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");



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
  }],
  comparePeriods: {
    currentPeriod: {
      from: Object(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["getCurrentTime"])(),
      to: Object(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["getCurrentTime"])()
    },
    previousPeriod: {
      from: Object(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["getCurrentTime"])(),
      to: Object(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["getCurrentTime"])()
    }
  }
};
const tabMenuList = [{
  key: 'overview',
  name: 'Overview',
  component: _tabs_overview_OverviewTab__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  key: 'currency',
  name: 'Currency',
  component: _tabs_currency_CurrencyTab__WEBPACK_IMPORTED_MODULE_1__["default"]
}];
const majorChangeList = [{
  title: 'MAJOR CHANGES - By CURRENCY',
  header: ['Currency', 'Turnover', '%CHG'],
  data: []
}, {
  title: 'MAJOR CHANGES - By BETTYPES',
  header: ['Bettype', 'Turnover', '%CHG'],
  data: []
}, {
  title: 'MAJOR CHANGES - By PLATFORM',
  header: ['Platform', 'Turnover', '%CHG'],
  data: []
}];

/***/ }),

/***/ "./src/js/pages/performance/lib/service.js":
/*!*************************************************!*\
  !*** ./src/js/pages/performance/lib/service.js ***!
  \*************************************************/
/*! exports provided: generalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generalService", function() { return generalService; });
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");

const generalService = {
  getFilterData: ({
    selectedMeasurement,
    selectedBaseCurrency,
    selectedComparePeriods
  }) => {
    return {
      measurement: selectedMeasurement,
      baseCurrency: {
        name: selectedBaseCurrency,
        id: 2
      },
      currentPeriod: _convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.currentPeriod)),
      previousPeriod: _convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.previousPeriod))
    };
  }
};

const _convertPeriod = ({
  from,
  to
}) => {
  return {
    from: { ...from,
      ...{
        month: from.month + 1
      }
    },
    to: { ...to,
      ...{
        month: to.month + 1
      }
    }
  };
};

const _convertPeriodToMetaModel = ({
  from,
  to
}) => {
  const fromMonth = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_0__["defaultFormatFunc"])(from.month, from.year);
  const toMonth = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_0__["defaultFormatFunc"])(to.month, to.year);
  return {
    fromMonth,
    toMonth
  };
};

/***/ }),

/***/ "./src/js/pages/performance/reducers/analyticDataReducer.js":
/*!******************************************************************!*\
  !*** ./src/js/pages/performance/reducers/analyticDataReducer.js ***!
  \******************************************************************/
/*! exports provided: analyticData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "analyticData", function() { return analyticData; });
/* harmony import */ var _lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/pages/performance/actions/types.js");


const analyticData = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_ANALYTIC_DATA"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/pages/performance/reducers/filterReducer.js":
/*!************************************************************!*\
  !*** ./src/js/pages/performance/reducers/filterReducer.js ***!
  \************************************************************/
/*! exports provided: selectedMeasurement, selectedComparePeriods */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedMeasurement", function() { return selectedMeasurement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectedComparePeriods", function() { return selectedComparePeriods; });
/* harmony import */ var _lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/pages/performance/actions/types.js");


const selectedMeasurement = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_MEASUREMENT"]](state, action) {
    return action.data;
  }

});
const selectedComparePeriods = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_COMPARE_PERIODS"]](state, action) {
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
/* harmony import */ var _filterReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./filterReducer */ "./src/js/pages/performance/reducers/filterReducer.js");
/* harmony import */ var _loadingReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loadingReducer */ "./src/js/pages/performance/reducers/loadingReducer.js");
/* harmony import */ var _analyticDataReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./analyticDataReducer */ "./src/js/pages/performance/reducers/analyticDataReducer.js");
/* harmony import */ var _tabReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabReducer */ "./src/js/pages/performance/reducers/tabReducer.js");
/* harmony import */ var _tabs_overview_reducers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tabs/overview/reducers */ "./src/js/pages/performance/tabs/overview/reducers/index.js");







/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_loadingReducer__WEBPACK_IMPORTED_MODULE_3__, _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__, _filterReducer__WEBPACK_IMPORTED_MODULE_2__, _tabReducer__WEBPACK_IMPORTED_MODULE_5__, _analyticDataReducer__WEBPACK_IMPORTED_MODULE_4__, _tabs_overview_reducers__WEBPACK_IMPORTED_MODULE_6__["default"])));

/***/ }),

/***/ "./src/js/pages/performance/reducers/loadingReducer.js":
/*!*************************************************************!*\
  !*** ./src/js/pages/performance/reducers/loadingReducer.js ***!
  \*************************************************************/
/*! exports provided: isLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoading", function() { return isLoading; });
/* harmony import */ var _lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/pages/performance/actions/types.js");


const isLoading = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_LOADING"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/pages/performance/reducers/tabReducer.js":
/*!*********************************************************!*\
  !*** ./src/js/pages/performance/reducers/tabReducer.js ***!
  \*********************************************************/
/*! exports provided: currentChildTabKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentChildTabKey", function() { return currentChildTabKey; });
/* harmony import */ var _lib_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/createReducer */ "./src/js/lib/createReducer.js");
/* harmony import */ var _actions_types_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types.js */ "./src/js/pages/performance/actions/types.js");


const currentChildTabKey = Object(_lib_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types_js__WEBPACK_IMPORTED_MODULE_1__["SET_CURRENT_CHILD_TAB"]](state, action) {
    return action.data;
  }

});

/***/ }),

/***/ "./src/js/pages/performance/tabs/currency/CurrencyTab.jsx":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/currency/CurrencyTab.jsx ***!
  \****************************************************************/
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
  const {} = _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({}, dispatch);
}

function mapStateToProps(state) {
  const {} = state;
  return Object.assign({});
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(CurrencyTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/overview/OverviewTab.jsx":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/overview/OverviewTab.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _components_normal_BoxInfoMeasureList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/normal/BoxInfoMeasureList */ "./src/js/pages/performance/components/normal/BoxInfoMeasureList.jsx");
/* harmony import */ var _components_normal_TableMajorChangeItem__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/normal/TableMajorChangeItem */ "./src/js/pages/performance/components/normal/TableMajorChangeItem.jsx");
/* harmony import */ var _components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/charts/GrowthChart */ "./src/js/pages/performance/components/charts/GrowthChart.jsx");
/* harmony import */ var _components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/normal/ValueChangeIcon */ "./src/js/pages/performance/components/normal/ValueChangeIcon.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./actions */ "./src/js/pages/performance/tabs/overview/actions/index.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }










const majorChangeData = {
  data: [{
    name: 'MYR',
    totalValue: 1235,
    changeValue: 5
  }, {
    name: 'THB',
    totalValue: 1235,
    changeValue: 5
  }, {
    name: 'USD',
    totalValue: 91231239,
    changeValue: 0
  }, {
    name: 'CNY',
    totalValue: 91231239,
    changeValue: -5
  }, {
    name: 'INH',
    totalValue: 91231239,
    changeValue: 5
  }]
};

class OverviewTab extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  _renderMajorChangeTableList() {
    return _lib_constants__WEBPACK_IMPORTED_MODULE_7__["majorChangeList"].map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_TableMajorChangeItem__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({ ..._,
      ...majorChangeData
    }, {
      renderRow: item => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: item.name
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
        value: item.changeValue
      }), item.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.totalValue), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.changeValue + '%'))
    })));
  }

  _renderBoxInfoMeasureList() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_BoxInfoMeasureList__WEBPACK_IMPORTED_MODULE_3__["default"], {
      items: this.props.analyticData.summary
    });
  }

  _renderGrowthChart() {
    const {
      analyticData
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
      currentMeasuremnent: this.props.selectedMeasurement.name,
      data: analyticData.periodGrowth
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "overview-tab"
    }, this._renderBoxInfoMeasureList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-major-list"
    }, this._renderMajorChangeTableList()), this._renderGrowthChart());
  }

}

function mapDispatchToProps(dispatch) {
  const {} = _actions__WEBPACK_IMPORTED_MODULE_8__["default"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])(Object.assign({}, {}), dispatch);
}

function mapStateToProps(state) {
  const {
    selectedBaseCurrency,
    selectedMeasurement,
    performanceOverviewTotal,
    analyticData
  } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    performanceOverviewTotal,
    analyticData // { summaryData, }

  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(OverviewTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/overview/actions/index.js":
/*!*****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/overview/actions/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (Object.assign({}));

/***/ }),

/***/ "./src/js/pages/performance/tabs/overview/reducers/index.js":
/*!******************************************************************!*\
  !*** ./src/js/pages/performance/tabs/overview/reducers/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (Object.assign({}));

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
//# sourceMappingURL=performanceDashboard.chunk.js.map