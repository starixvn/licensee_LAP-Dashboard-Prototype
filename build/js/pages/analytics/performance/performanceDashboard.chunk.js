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
/*! exports provided: SET_CURRENCY_INFO, SET_BASE_CURRENCY */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_CURRENCY_INFO", function() { return SET_CURRENCY_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_BASE_CURRENCY", function() { return SET_BASE_CURRENCY; });
const SET_CURRENCY_INFO = "SET_CURRENCY_INFO";
const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";

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






const previousPeriodQuickSelections = [{
  label: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('previous_period'),
  onSelect: selectedCurrentPeriod => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPreviousPeriod"])(selectedCurrentPeriod)
}, {
  label: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('previous_year'),
  onSelect: selectedCurrentPeriod => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPreviousYear"])(selectedCurrentPeriod)
}];
const currentPeriodQuickSelections = [{
  label: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('last_month'),
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByNumberOfLastMonths"])(currentTime, 1)
}, {
  label: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('last_quarter'),
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByLastQuarter"])(currentTime)
}, {
  label: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('last_3_months'),
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByNumberOfLastMonths"])(currentTime, 3)
}, {
  label: _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('last_6_months'),
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByNumberOfLastMonths"])(currentTime, 6)
}];

const getLimitPeriod = period => ({
  maxFrom: {
    month: period.from.month + 1,
    year: period.from.year
  }
});

class CoupleMonthRangePicker extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onChangeRangeCurrentPeriod", selectedRange => {
      const {
        onChangeRangeOfTwoPeriod
      } = this.props;
      const previousPeriod = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPreviousPeriod"])(selectedRange);
      const periods = {
        currentPeriod: selectedRange,
        previousPeriod
      };
      this._previousPeriodLimitFrom = getLimitPeriod(previousPeriod);
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

    _defineProperty(this, "_renderCurrentPeriodQuickSelection", self => {
      return currentPeriodQuickSelections.map((_, index) => {
        const isSelected = Object(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["isPeriodEqual"])(_.onSelect(Object(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["getCurrentTime"])()), self.state);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: `cp_selection_${index}`,
          className: `quick-selection ${isSelected ? 'quick-selection-active' : ''}`,
          onClick: () => {
            const currentPeriod = _.onSelect(Object(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["getCurrentTime"])());

            self.setState(currentPeriod);
          }
        }, _.label);
      });
    });

    _defineProperty(this, "_renderPreviousPeriodQuickSelection", self => {
      return previousPeriodQuickSelections.map((_, index) => {
        const {
          currentPeriod
        } = this.state;
        const isSelected = Object(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["isPeriodEqual"])(_.onSelect(currentPeriod), self.state);
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: `pp_selection_${index}`,
          className: `quick-selection ${isSelected ? 'quick-selection-active' : ''}`,
          onClick: () => {
            const previousPeriod = _.onSelect(currentPeriod);

            self.setState(previousPeriod);
          }
        }, _.label);
      });
    });

    const {
      currentPeriod: _currentPeriod,
      previousPeriod: _previousPeriod
    } = this.props;
    this.state = {
      currentPeriod: _currentPeriod,
      previousPeriod: _previousPeriod
    };
    this._previousPeriodLimitFrom = getLimitPeriod(_previousPeriod);
  }

  render() {
    const {
      currentPeriod,
      previousPeriod
    } = this.state;
    const rangeTo = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getDistanceBetweenPeriod"])(currentPeriod) + 1;
    const {
      maxFrom
    } = this._previousPeriodLimitFrom;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "couple-month-range"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-range-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes("current_period")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      from: currentPeriod.from,
      to: currentPeriod.to,
      onChangeRange: this._onChangeRangeCurrentPeriod,
      quickSelections: this._renderCurrentPeriodQuickSelection
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-range-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes("previous_period")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isDisableTo: true,
      range: rangeTo,
      maxMonthFrom: maxFrom.month,
      maxYearFrom: maxFrom.year,
      from: previousPeriod.from,
      to: previousPeriod.to,
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
/*! exports provided: isPeriodEqual, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPeriodEqual", function() { return isPeriodEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MonthRangePicker; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @9softstudio/react-monthpicker */ "./node_modules/@9softstudio/react-monthpicker/dist/index.js");
/* harmony import */ var _9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/constants */ "./src/js/lib/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const isTimeEqual = (time1, time2) => {
  return time1.year === time2.year && time1.month === time2.month;
};

const isPeriodEqual = (period1, period2) => {
  return isTimeEqual(period1.from, period2.from) && isTimeEqual(period1.to, period2.to);
};

const getMaxDateValid = (range = -1) => {
  const currentDate = Object(_lib_constants__WEBPACK_IMPORTED_MODULE_5__["getCurrentTime"])();
  let maxDate = new Date(currentDate.year, currentDate.month);
  maxDate = new Date(maxDate.setMonth(maxDate.getMonth() + range));
  return {
    month: maxDate.getMonth(),
    year: maxDate.getFullYear()
  };
};

const getMaxDateTo = ({
  year,
  month
}, range) => {
  let maxDate = new Date(year, month);
  maxDate = new Date(maxDate.setMonth(maxDate.getMonth() + range - 1));
  const maxDateValid = getMaxDateValid();
  const currentDate = new Date(maxDateValid.year, maxDateValid.month);

  if (maxDate > currentDate) {
    maxDate = currentDate;
  }

  return {
    maxMonthTo: maxDate.getMonth() + 1,
    maxYearTo: maxDate.getFullYear()
  };
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
          year: from.dropdownYear || from.year
        }
      };
      to = this._getToValueOnChaneMonthFrom(from);
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
          year: to.dropdownYear || to.year
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
      this.setState({ ...from,
        ...to,
        ...{
          open: false
        }
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
      from: _from,
      to: _to
    } = this.props;
    this.state = {
      open: open,
      from: _from,
      to: _to
    };
    this.container = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.open) {
      if (!isPeriodEqual({
        from: nextProps.from,
        to: nextProps.to
      }, {
        from: prevState.from,
        to: prevState.to
      })) {
        return {
          from: nextProps.from,
          to: nextProps.to
        };
      }
    }

    return {};
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickOutSide, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutSide, true);
  }

  _getToValueOnChaneMonthFrom(from) {
    const {
      isDisableTo,
      range
    } = this.props;

    if (isDisableTo) {
      let date = new Date(from.year, from.month);
      date = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__["addMonths"])(date, range - 1);
      return {
        month: date.getMonth(),
        year: date.getFullYear(),
        dropdownYear: date.getFullYear()
      };
    } else {
      return { ...from
      };
    }
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
    const {
      monthNames,
      hasRange,
      isReadonly,
      iconElement,
      enable,
      range,
      quickSelections,
      isDisableTo
    } = this.props;
    const {
      minMonthFrom,
      maxMonthFrom,
      maxYearFrom,
      minYearFrom
    } = this.props;
    const maxDateTo = getMaxDateTo(from, range);
    const {
      maxYearTo,
      maxMonthTo
    } = maxDateTo;

    const displayText = this._getDisplayText();

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "rmp-main-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: enable ? 'mp-form-container' : 'mp-form-container disable',
      onClick: this._toggle
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      className: "mp-form-input",
      value: displayText,
      readOnly: isReadonly
    }), iconElement), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "range-mp-container",
      style: {
        display: open ? 'block' : 'none'
      },
      ref: this.container
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "quick-selection-container"
    }, quickSelections && quickSelections(this), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-confirm",
      onClick: this._onConfirmChangeRange
    }, "OK"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-cancel m-l-5",
      onClick: this._cancel
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getDefaultRes('cancel')))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "mp-container mp-from"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["YearSelector"], {
      minYear: minYearFrom,
      maxYear: maxYearFrom,
      selectedDropdownYear: from.dropdownYear || from.year,
      onSelect: this._onChangeYearFrom
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["MonthList"], {
      monthNames: monthNames,
      hasRange: hasRange,
      selectedDropdownYear: from.dropdownYear || from.year,
      selectedMonth: from.month,
      selectedYear: from.year,
      minYear: minYearFrom,
      maxYear: maxYearFrom,
      minMonth: minMonthFrom,
      maxMonth: maxMonthFrom,
      onSelect: this._onChangeMonthFrom
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `mp-container mp-to ${isDisableTo ? 'disabled' : ''}`
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["YearSelector"], {
      minYear: from.year,
      maxYear: maxYearTo,
      selectedDropdownYear: to.dropdownYear || to.year,
      onSelect: this._onChangeYearTo
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_9softstudio_react_monthpicker__WEBPACK_IMPORTED_MODULE_2__["MonthList"], {
      monthNames: monthNames,
      hasRange: hasRange,
      selectedDropdownYear: to.dropdownYear || to.year,
      selectedMonth: to.month,
      selectedYear: to.year,
      minYear: from.year,
      maxYear: isDisableTo ? 1 : maxYearTo,
      minMonth: from.month + 1,
      maxMonth: maxMonthTo,
      onSelect: this._onChangeMonthTo
    }))));
  }

}

_defineProperty(MonthRangePicker, "propTypes", {
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  minYearFrom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  maxYearFrom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  minMonthFrom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  maxMonthFrom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  monthNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string)),
  hasRange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  range: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  onSelect: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onFormat: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isReadonly: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  iconElement: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.any,
  enable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  quickSelections: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isDisableTo: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

_defineProperty(MonthRangePicker, "defaultProps", {
  open: false,
  onSelect: () => {},
  onFormat: _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__["defaultFormatFunc"],
  isReadonly: true,
  enable: true,
  minYearFrom: Object(_lib_constants__WEBPACK_IMPORTED_MODULE_5__["getCurrentTime"])().year - 4,
  maxYearFrom: getMaxDateValid().year,
  minMonthFrom: 1,
  maxMonthFrom: Object(_lib_constants__WEBPACK_IMPORTED_MODULE_5__["getCurrentTime"])().month || 12,
  hasRange: true,
  range: 12,
  isDisableTo: false
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
/*! exports provided: getDistanceBetweenPeriod, addMonths, defaultFormatFunc, getPreviousPeriod, getPreviousYear, getPeriodByNumberOfLastMonths, getPeriodByLastQuarter */
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
/* harmony import */ var _performance_lib_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../performance/lib/constants */ "./src/js/pages/performance/lib/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class PerformanceDashboard extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onSubmit", () => {
      const {
        selectedComparePeriods,
        selectedBaseCurrency,
        selectedMeasurement
      } = this.props;
      const {
        selectedTabKey
      } = this.state;
      const filterData = _performance_lib_service__WEBPACK_IMPORTED_MODULE_7__["generalService"].getFilterData({
        selectedComparePeriods,
        selectedBaseCurrency,
        selectedMeasurement
      });
      this.props.getAnalyticData(filterData, selectedTabKey);
    });

    _defineProperty(this, "_onChangeTab", selectedTabKey => {
      this.setState({
        selectedTabKey
      });
    });

    this.state = {
      selectedTabKey: _performance_lib_constants__WEBPACK_IMPORTED_MODULE_8__["tabMenuKey"].overview
    };
  }

  render() {
    const {
      isLoading
    } = this.props;
    const {
      selectedTabKey
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "performance-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Loader__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isLoading: isLoading
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_FilterTopPanel__WEBPACK_IMPORTED_MODULE_4__["default"], {
      onSubmit: this._onSubmit
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TabContainer__WEBPACK_IMPORTED_MODULE_5__["default"], {
      onChangeTab: this._onChangeTab,
      selectedTabKey: selectedTabKey
    }));
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
    selectedComparePeriods,
    selectedBaseCurrency,
    selectedMeasurement
  } = state;
  return Object.assign({}, {
    isLoading,
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
      const mainData = await _lib_api__WEBPACK_IMPORTED_MODULE_2__["factoryApi"][tabKey].mainApi(filterData);
      dispatch(setAnalyticData({
        mainData
      }));
      dispatch(getLazyData(mainData, filterData, tabKey));
    } catch (error) {
      console.log('error', error.message);
    }

    dispatch(Object(_loadingAction__WEBPACK_IMPORTED_MODULE_1__["setLoading"])(false));
  };
};

const getLazyData = (mainData, filterData, tabKey) => {
  const lazyApi = _lib_api__WEBPACK_IMPORTED_MODULE_2__["factoryApi"][tabKey].lazyApi;

  if (!lazyApi) {
    return {
      type: null
    };
  }

  return async dispatch => {
    try {
      const data = await lazyApi(mainData, filterData);
      dispatch(setAnalyticData(data));
    } catch (error) {
      console.log('error', error.message);
    }
  };
};

const setAnalyticData = ({
  mainData,
  handlerData
}) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["SET_ANALYTIC_DATA"],
    ...{
      mainData,
      handlerData
    }
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




const ActionCreators = Object.assign(_actions_currencyAction__WEBPACK_IMPORTED_MODULE_0__, _filterAction__WEBPACK_IMPORTED_MODULE_1__, _loadingAction__WEBPACK_IMPORTED_MODULE_3__, _analyticDataAction__WEBPACK_IMPORTED_MODULE_2__);

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

/***/ "./src/js/pages/performance/actions/types.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/actions/types.js ***!
  \***************************************************/
/*! exports provided: SET_LOADING, SET_MEASUREMENT, SET_COMPARE_PERIODS, GET_ANALYTIC_DATA, SET_ANALYTIC_DATA */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_LOADING", function() { return SET_LOADING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_MEASUREMENT", function() { return SET_MEASUREMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_COMPARE_PERIODS", function() { return SET_COMPARE_PERIODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_ANALYTIC_DATA", function() { return GET_ANALYTIC_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SET_ANALYTIC_DATA", function() { return SET_ANALYTIC_DATA; });
const SET_LOADING = "SET_LOADING";
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
/* harmony import */ var _components_CoupleMonthRangePicker__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/CoupleMonthRangePicker */ "./src/js/components/CoupleMonthRangePicker.jsx");
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
      this.props.onSubmit && this.props.onSubmit();
    });
  }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  render() {
    const {
      selectedComparePeriods
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-top-panel"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CoupleMonthRangePicker__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onChangeRangeOfTwoPeriod: this._onChangeRangeOfTwoPeriod,
      currentPeriod: selectedComparePeriods.currentPeriod,
      previousPeriod: selectedComparePeriods.previousPeriod
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes("Based")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
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
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes("measurement")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "select-filter",
      onChange: e => this._onChangeMeasurement(e),
      value: this.props.selectedMeasurement.id
    }, _lib_constants__WEBPACK_IMPORTED_MODULE_5__["defaultData"].measurements.map((item, i) => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.name);
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-confirm",
      onClick: this._onSubmit
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getDefaultRes("submit")));
  }

}

function mapDispatchToProps(dispatch) {
  const {
    getCurrencyInfo,
    setBaseCurrency,
    setMeasurement,
    setComparePeriods
  } = _actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"];
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    getCurrencyInfo,
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
    selectedComparePeriods
  } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    selectedComparePeriods,
    currencyInfo
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
/* harmony import */ var _dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dashboard/components/TabMenu */ "./src/js/pages/dashboard/components/TabMenu.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _tabs_overview_OverviewTab__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tabs/overview/OverviewTab */ "./src/js/pages/performance/tabs/overview/OverviewTab.jsx");
/* harmony import */ var _tabs_currency_CurrencyTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tabs/currency/CurrencyTab */ "./src/js/pages/performance/tabs/currency/CurrencyTab.jsx");
/* harmony import */ var _tabs_product_ProductTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tabs/product/ProductTab */ "./src/js/pages/performance/tabs/product/ProductTab.jsx");
/* harmony import */ var _tabs_bettype_BettypeTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../tabs/bettype/BettypeTab */ "./src/js/pages/performance/tabs/bettype/BettypeTab.jsx");
/* harmony import */ var _tabs_platform_PlatformTab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../tabs/platform/PlatformTab */ "./src/js/pages/performance/tabs/platform/PlatformTab.jsx");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










const tabMenuList = [{
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["tabMenuKey"].overview,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_8__["default"].getDefaultRes('overview'),
  component: _tabs_overview_OverviewTab__WEBPACK_IMPORTED_MODULE_3__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["tabMenuKey"].currency,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_8__["default"].getDefaultRes('currency'),
  component: _tabs_currency_CurrencyTab__WEBPACK_IMPORTED_MODULE_4__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["tabMenuKey"].product,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_8__["default"].getDefaultRes('product'),
  component: _tabs_product_ProductTab__WEBPACK_IMPORTED_MODULE_5__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["tabMenuKey"].bettype,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_8__["default"].getDefaultRes('bettype'),
  component: _tabs_bettype_BettypeTab__WEBPACK_IMPORTED_MODULE_6__["default"]
}, {
  key: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["tabMenuKey"].platform,
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_8__["default"].getDefaultRes('platform'),
  component: _tabs_platform_PlatformTab__WEBPACK_IMPORTED_MODULE_7__["default"]
}];

class TabContainer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onClickTabMenu", tabKey => {
      this.props.onChangeTab(tabKey);
    });
  }

  _getCurrentTab() {
    const {
      selectedTabKey
    } = this.props;
    const item = tabMenuList.find(_ => _.key === selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this._getCurrentTab();

    const {
      selectedTabKey
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_1__["default"], {
      selectedTabMenu: selectedTabKey,
      onClickTabMenu: this._onClickTabMenu,
      tabMenuList: tabMenuList
    }), CurrentTab && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CurrentTab, null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TabContainer);

/***/ }),

/***/ "./src/js/pages/performance/components/charts/DistributionChart.jsx":
/*!**************************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/DistributionChart.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DistributionChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_StackedBarChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/StackedBarChart */ "./src/js/pages/performance/components/charts/base/StackedBarChart.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class DistributionChart extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };
    this.refSelf = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  componentDidMount() {
    const {
      getStyle
    } = this.props;
    getStyle && this.setState({
      style: getStyle(this.refSelf)
    });
  }

  render() {
    const {
      style
    } = this.state;
    const {
      title,
      distributionData,
      topDistributions,
      dataMapper
    } = this.props;
    const {
      labels,
      stackedChartData
    } = dataMapper(distributionData, topDistributions);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-container",
      ref: this.refSelf,
      style: style
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-header"
    }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-body"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_StackedBarChart__WEBPACK_IMPORTED_MODULE_1__["default"], {
      stackedChartData: stackedChartData,
      labels: labels,
      limitAxisY: DistributionChart.limitAxisY
    })));
  }

}

_defineProperty(DistributionChart, "limitAxisY", {
  max: 100
});

/***/ }),

/***/ "./src/js/pages/performance/components/charts/GrowthChart.jsx":
/*!********************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/GrowthChart.jsx ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GrowthChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_MixBarLineChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/MixBarLineChart */ "./src/js/pages/performance/components/charts/base/MixBarLineChart.jsx");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class GrowthChart extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_renderHeaderChart", () => {
      const {
        showBackIcon,
        backToDefaultChart
      } = this.props;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "chart-title"
      }, showBackIcon ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "back-icon",
        onClick: backToDefaultChart
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "arrow-left"
      }), _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__["default"].getDefaultRes('go_back')) : null);
    });

    this.state = {
      style: {}
    };
    this.refSelf = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  componentDidMount() {
    const {
      getStyle
    } = this.props;
    getStyle && this.setState({
      style: getStyle(this.refSelf)
    });
  }

  render() {
    const {
      title,
      lineChartData,
      barChartData,
      labels,
      leftAxisName,
      autoScale,
      calculateBarWidth
    } = this.props;
    const {
      style
    } = this.state;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-container",
      ref: this.refSelf,
      style: style
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-header"
    }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-body"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_MixBarLineChart__WEBPACK_IMPORTED_MODULE_1__["default"], {
      header: this._renderHeaderChart,
      lineChartData: lineChartData,
      barChartData: barChartData,
      leftAxisName: leftAxisName,
      rightAxisName: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_2__["default"].getDefaultRes('growth_rate')} (%)`,
      labels: labels,
      autoScale: autoScale,
      calculateBarWidth: calculateBarWidth
    })));
  }

}

/***/ }),

/***/ "./src/js/pages/performance/components/charts/OverallChart.jsx":
/*!*********************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/OverallChart.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OverallChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_BarChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/BarChart */ "./src/js/pages/performance/components/charts/base/BarChart.jsx");


class OverallChart extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };
    this.refSelf = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  componentDidMount() {
    const {
      getStyle
    } = this.props;
    getStyle && this.setState({
      style: getStyle(this.refSelf)
    });
  }

  render() {
    const {
      style
    } = this.state;
    const {
      title,
      overallData,
      dataMapper
    } = this.props;
    const {
      labels,
      barChartData
    } = dataMapper(overallData);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-container",
      ref: this.refSelf,
      style: style
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-header"
    }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-body"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_BarChart__WEBPACK_IMPORTED_MODULE_1__["default"], {
      barChartData: barChartData,
      labels: labels,
      hideLegend: true
    })));
  }

}

/***/ }),

/***/ "./src/js/pages/performance/components/charts/base/BarChart.jsx":
/*!**********************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/base/BarChart.jsx ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BarChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");



const defaultColorBarChart = ['#208E9B'];

const defaultCalculateBarWidth = numberOfColumn => {
  if (numberOfColumn >= 6) {
    return {
      barPercentage: 0.9,
      categoryPercentage: 0.5
    };
  } else {
    return {
      barPercentage: 0.5,
      categoryPercentage: 0.6
    };
  }
};

const buildBarChartDataSet = barChartData => {
  return barChartData.map((_, index) => {
    return {
      type: 'bar',
      label: _.name,
      data: _.dataSet,
      fill: false,
      backgroundColor: _.color || defaultColorBarChart[index],
      borderColor: _.color || defaultColorBarChart[index],
      hoverBackgroundColor: _.color || defaultColorBarChart[index],
      hoverBorderColor: _.color || defaultColorBarChart[index],
      yAxisID: 'y-axis-1'
    };
  });
};

const buildChartDataSet = barChartData => {
  const barChartDataSet = buildBarChartDataSet(barChartData);
  return {
    datasets: [...barChartDataSet]
  };
};

const drawTextToTopChart = function () {
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
      const text = value + '%';
      const yOffset = value > 0 ? 6 : -7;
      const textWidth = ctx.measureText(text).width;
      const xLabel = element._model.x - textWidth / 2;
      ctx.fillText(text, xLabel, element._model.y - yOffset);
    });
  });
};

const buildChartOption = ({
  labels,
  barChartData,
  hideLegend
}) => {
  const barWidthObj = defaultCalculateBarWidth(barChartData[0].dataSet.length);
  const leftAxisName = barChartData[0].name || '';
  return {
    onClick: function (e, item) {
      const activeElement = this.getElementAtEvent(e);

      if (activeElement && activeElement.length > 0 && activeElement[0]._datasetIndex) {
        const datasetIndex = activeElement[0]._datasetIndex - 1;
        const events = barChartData[datasetIndex].events;
        const eventClicks = events ? events.click : null;

        if (eventClicks && eventClicks.length > 0) {
          const colIndex = item[0]._index;
          const eventClick = eventClicks.find(_ => _.columnIndex === colIndex);
          eventClick && eventClick.callBack && eventClick.callBack();
        }
      }
    },
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataSet = data.datasets[tooltipItem.datasetIndex];

          if (dataSet.type === 'bar') {
            return _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(dataSet.data[tooltipItem.index]);
          }

          return tooltipItem.value;
        }
      }
    },
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
      display: !hideLegend,
      position: 'bottom',
      labels: {
        filter: function (item) {
          return !item.hidden;
        },
        usePointStyle: true,
        boxWidth: 8,
        padding: 20
      },
      onClick: e => e.stopPropagation()
    },
    animation: {
      onComplete: drawTextToTopChart
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20
      }
    },
    scales: {
      xAxes: [{ ...barWidthObj,
        ...{
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          },
          labels: labels
        }
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        labels: {
          show: true
        },
        scaleLabel: {
          display: true,
          fontSize: 13,
          fontFamily: "'Roboto'",
          labelString: leftAxisName
        },
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].nFormatter(value);
          }
        }
      }]
    }
  };
};

class BarChart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  _renderChart() {
    const {
      barChartData,
      labels,
      hideLegend
    } = this.props;
    const data = buildChartDataSet(barChartData);
    const options = buildChartOption({
      labels,
      barChartData,
      hideLegend
    });
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
      data: data,
      options: options
    });
  }

  render() {
    const {
      header
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "chart-container"
    }, header && header(), this._renderChart());
  }

}

/***/ }),

/***/ "./src/js/pages/performance/components/charts/base/MixBarLineChart.jsx":
/*!*****************************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/base/MixBarLineChart.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MixBarLineChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");



const defaultColorBarChart = ['#F1A837', '#36A2EB'];
const defaultColorLineChart = '#690499';

const defaultCalculateBarWidth = numberOfColumn => {
  if (numberOfColumn >= 6) {
    return {
      barPercentage: 0.9,
      categoryPercentage: 0.8
    };
  } else {
    return {
      barPercentage: 0.6,
      categoryPercentage: 0.5
    };
  }
};

const drawTextToTopChart = function () {
  const self = this,
        chart = this.chart,
        ctx = chart.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#555";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const datasets = self.data.datasets;
  const barCharts = datasets.filter(_ => _.type === 'bar' && !_.hidden);
  const numberOfBarChart = barCharts ? barCharts.length : 0;
  datasets.forEach(function (dataset, datasetIndex) {
    const isLineChart = dataset.type === "line";
    const isBarChart = dataset.type === 'bar';
    const meta = self.getDatasetMeta(datasetIndex);
    !meta.hidden && meta.data.forEach(function (element, elementIndex) {
      const value = dataset.data[elementIndex];
      const text = isLineChart ? value : _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].nFormatter(value);
      const yOffset = value > 0 ? 6 : -7;
      let xLabel = 0;

      if (isBarChart) {
        xLabel = element._model.x + (datasetIndex > 1 ? element._model.width / 2 - ctx.measureText(text).width : -element._model.width / 2);
      } else {
        xLabel = element._model.x - (numberOfBarChart > 1 ? ctx.measureText(text).width / 2 : 0);
      }

      const yLabel = element._model.y - yOffset;
      ctx.fillText(text, xLabel, yLabel);
    });
  });
};

const getBarWidthOption = (barChartData, calculateBarWidth) => {
  const numberOfBarColumn = barChartData.reduce((count, chartData) => count += chartData.dataSet.length, 0);
  const barWidthObj = (calculateBarWidth || defaultCalculateBarWidth)(numberOfBarColumn);
  return barWidthObj;
};

const onClickLegend = function (calculateBarWidth, defaultCalculateBarWidth) {
  return function (e, legendItem) {
    const chart = this.chart;
    Chart.defaults.global.legend.onClick.call(chart, e, legendItem);
    const datasets = chart.data.datasets;
    let numberOfBarColumn = 0;
    datasets.forEach((dataset, index) => {
      if (dataset.type === 'bar') {
        const metaDataset = chart.getDatasetMeta(index);
        numberOfBarColumn += metaDataset.hidden ? 0 : dataset.data.length;
      }
    });
    chart.config.options.scales.xAxes[0] = { ...chart.config.options.scales.xAxes[0],
      ...(calculateBarWidth || defaultCalculateBarWidth)(numberOfBarColumn)
    };
    chart.update();
  };
};

const buildLineChartDataSet = lineChartData => {
  return {
    label: lineChartData.name,
    type: 'line',
    lineTension: 0,
    pointRadius: 2,
    borderWidth: 2,
    data: lineChartData.dataSet,
    fill: false,
    borderColor: lineChartData.color || defaultColorLineChart,
    backgroundColor: lineChartData.color || defaultColorLineChart,
    pointBorderColor: lineChartData.color || defaultColorLineChart,
    pointBackgroundColor: lineChartData.color || defaultColorLineChart,
    pointHoverBackgroundColor: lineChartData.color || defaultColorLineChart,
    pointHoverBorderColor: lineChartData.color || defaultColorLineChart,
    yAxisID: 'y-axis-2'
  };
};

const buildBarChartDataSet = barChartData => {
  return barChartData.map((_, index) => {
    return {
      type: 'bar',
      label: _.name,
      data: _.dataSet,
      hidden: _.hidden === undefined ? false : _.hidden,
      fill: false,
      backgroundColor: _.color || defaultColorBarChart[index],
      borderColor: _.color || defaultColorBarChart[index],
      hoverBackgroundColor: _.color || defaultColorBarChart[index],
      hoverBorderColor: _.color || defaultColorBarChart[index],
      yAxisID: 'y-axis-1'
    };
  });
};

const buildMixChartDataSet = ({
  lineChartData,
  barChartData
}) => {
  const lineChartDataSet = buildLineChartDataSet(lineChartData);
  const barChartDataSet = buildBarChartDataSet(barChartData);
  return {
    datasets: [lineChartDataSet, ...barChartDataSet]
  };
};

const buildMixChartOption = ({
  labels,
  barChartData,
  leftAxisName,
  rightAxisName,
  autoScale,
  calculateBarWidth
}) => {
  const barWidthObj = getBarWidthOption(barChartData, calculateBarWidth);
  return {
    maintainAspectRatio: autoScale,
    onClick: function (e, item) {
      const activeElement = this.getElementAtEvent(e);

      if (activeElement && activeElement.length > 0 && activeElement[0]._datasetIndex) {
        const datasetIndex = activeElement[0]._datasetIndex - 1;
        const events = barChartData[datasetIndex].events;
        const eventClicks = events ? events.click : null;

        if (eventClicks && eventClicks.length > 0) {
          const colIndex = item[0]._index;
          const eventClick = eventClicks.find(_ => _.columnIndex === colIndex);
          eventClick && eventClick.callBack && eventClick.callBack();
        }
      }
    },
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataSet = data.datasets[tooltipItem.datasetIndex];

          if (dataSet.type === 'bar') {
            return _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(dataSet.data[tooltipItem.index]);
          }

          return tooltipItem.value;
        }
      }
    },
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
      display: true,
      position: 'bottom',
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      onClick: onClickLegend(calculateBarWidth, defaultCalculateBarWidth),
      labels: {
        filter: function (item) {
          return item.text !== undefined;
        },
        usePointStyle: true,
        boxWidth: 8,
        padding: 20
      }
    },
    animation: {
      onComplete: drawTextToTopChart
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20
      }
    },
    scales: {
      xAxes: [{ ...barWidthObj,
        ...{
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          },
          labels: labels
        }
      }],
      yAxes: [{
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        labels: {
          show: true
        },
        scaleLabel: {
          display: true,
          fontSize: 13,
          fontFamily: "'Roboto'",
          labelString: leftAxisName
        },
        ticks: {
          beginAtZero: true,
          callback: function (value) {
            return _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].nFormatter(value);
          }
        }
      }, {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        labels: {
          show: true
        },
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: rightAxisName
        },
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
};

class MixBarLineChart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  _renderChart() {
    const {
      lineChartData,
      barChartData,
      labels,
      leftAxisName,
      rightAxisName,
      autoScale,
      calculateBarWidth
    } = this.props;
    const data = buildMixChartDataSet({
      lineChartData,
      barChartData
    });
    const options = buildMixChartOption({
      labels,
      barChartData,
      leftAxisName,
      rightAxisName,
      autoScale,
      calculateBarWidth
    });
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
      data: data,
      options: options
    });
  }

  render() {
    const {
      header
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "chart-container"
    }, header && header(), this._renderChart());
  }

}

/***/ }),

/***/ "./src/js/pages/performance/components/charts/base/StackedBarChart.jsx":
/*!*****************************************************************************!*\
  !*** ./src/js/pages/performance/components/charts/base/StackedBarChart.jsx ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StackedBarChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-chartjs-2 */ "./node_modules/react-chartjs-2/es/index.js");


const defaultColorBarChart = ['#2B465B', '#37C2CC', '#F15D21', '#4C6375', '#F1A837', '#208E9B', '#4C6568', '#524C68', '#39AF93', '#5F684C', '#4A863B'];

const defaultTooltip = value => {
  return value + '%';
};

const defaultDisplayAxisY = value => {
  return value + '%';
};

const defaultLlimitAxisY = {
  suggestedMax: 100
};
const heightText = 10;

const buildChartDataSet = stackedChartData => {
  return {
    datasets: stackedChartData.map((_, index) => {
      return {
        type: 'bar',
        label: _.name,
        data: _.dataSet,
        fill: false,
        backgroundColor: _.color || defaultColorBarChart[index],
        borderColor: _.color || defaultColorBarChart[index],
        hoverBackgroundColor: _.color || defaultColorBarChart[index],
        hoverBorderColor: _.color || defaultColorBarChart[index]
      };
    })
  };
};

const drawTextToTopChart = function () {
  const self = this,
        chart = this.chart,
        ctx = chart.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  self.data.datasets.forEach(function (dataset, datasetIndex) {
    const meta = self.getDatasetMeta(datasetIndex);
    !meta.hidden && meta.data.forEach(function (element, elementIndex) {
      const value = dataset.data[elementIndex];

      if (value !== 0) {
        const text = defaultTooltip(value);
        const textWidth = ctx.measureText(text).width;
        const height = element.height();

        if (Math.abs(height) <= heightText) {
          return null;
        }

        const xLabel = element._model.x - textWidth / 3;
        const yLabel = element._model.y + height / 2;
        ctx.fillText(text, xLabel, yLabel);
      }

      return null;
    });
  });
};

const buildChartOption = ({
  labels,
  limitAxisY
}) => {
  limitAxisY = limitAxisY || defaultLlimitAxisY;
  return {
    tooltips: {
      callbacks: {
        title: function () {
          return '';
        },
        label: function (tooltipItem, data) {
          const dataSet = data.datasets[tooltipItem.datasetIndex];
          const label = dataSet.label;
          return label + ' ' + defaultTooltip(tooltipItem.value);
        }
      }
    },
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
      display: true,
      position: 'bottom',
      onHover: function (e) {
        e.target.style.cursor = 'pointer';
      },
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        padding: 20
      }
    },
    animation: {
      onComplete: drawTextToTopChart
    },
    layout: {
      padding: {
        top: 30,
        bottom: 20
      }
    },
    scales: {
      xAxes: [{ ...{
          barPercentage: 0.4
        },
        ...{
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          },
          labels: labels,
          stacked: true
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: { ...{
            beginAtZero: true,
            callback: function (value) {
              return defaultDisplayAxisY(value);
            }
          },
          ...limitAxisY
        }
      }]
    }
  };
};

class StackedBarChart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  _renderChart() {
    const {
      stackedChartData,
      labels,
      limitAxisY
    } = this.props;
    const data = buildChartDataSet(stackedChartData);
    const options = buildChartOption({
      labels,
      limitAxisY
    });
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_chartjs_2__WEBPACK_IMPORTED_MODULE_1__["Bar"], {
      data: data,
      options: options
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "chart-container"
    }, this._renderChart());
  }

}

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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");




const BoxInfoMeasureList = props => {
  const {
    data,
    currencyUnit
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "box-info-measure-list"
  }, data && data.map(_ => {
    const measurement = _lib_constants__WEBPACK_IMPORTED_MODULE_2__["defaultData"].measurements.find(__ => __.id === _.measurementId);
    const totalValue = measurement.id !== 3 ? `${currencyUnit} ${_lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].nFormatter(_.total)}` : `${_.total}%`;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BoxInfoMeasureItem__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: 'box_info_measure_' + _.measurementId,
      currencyUnit: currencyUnit,
      measurement: measurement.name,
      totalValue: totalValue,
      changeValue: _.changePercent
    });
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(BoxInfoMeasureList));

/***/ }),

/***/ "./src/js/pages/performance/components/normal/ComparisonTable.jsx":
/*!************************************************************************!*\
  !*** ./src/js/pages/performance/components/normal/ComparisonTable.jsx ***!
  \************************************************************************/
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

const ComparisonTable = props => {
  const {
    headers,
    data,
    title,
    renderRow
  } = props;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-comparison"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "table-comparison-title"
  }, title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", {
    className: "table-comparison-body"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, headers && renderHeaders(headers)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, data && renderRow && renderRows(data, renderRow))));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.memo(ComparisonTable));

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
/* harmony import */ var _lib_middleware__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/middleware */ "./src/js/lib/middleware.js");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./reducers/index */ "./src/js/pages/performance/reducers/index.js");







const defaultState = {
  isLoading: false,
  currencyInfo: {
    Currency: [],
    BaseCurrency: []
  },
  selectedMeasurement: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["defaultData"].measurements[0],
  selectedBaseCurrency: window.defaultBaseCurrency,
  analyticData: {},
  selectedComparePeriods: _lib_constants__WEBPACK_IMPORTED_MODULE_2__["defaultData"].getComparePeriods()
};

function configureStore(initialState) {
  const middleware = Object(_lib_middleware__WEBPACK_IMPORTED_MODULE_5__["getMiddleware"])();
  const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_4__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_4__["applyMiddleware"])(...middleware));
  return Object(redux__WEBPACK_IMPORTED_MODULE_4__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_6__["default"], initialState, enhancer);
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
/*! exports provided: factoryApi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "factoryApi", function() { return factoryApi; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _tabs_overview_lib_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tabs/overview/lib/api */ "./src/js/pages/performance/tabs/overview/lib/api.js");
/* harmony import */ var _tabs_currency_lib_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tabs/currency/lib/api */ "./src/js/pages/performance/tabs/currency/lib/api.js");
/* harmony import */ var _tabs_product_lib_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tabs/product/lib/api */ "./src/js/pages/performance/tabs/product/lib/api.js");
/* harmony import */ var _tabs_platform_lib_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tabs/platform/lib/api */ "./src/js/pages/performance/tabs/platform/lib/api.js");
/* harmony import */ var _tabs_bettype_lib_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tabs/bettype/lib/api */ "./src/js/pages/performance/tabs/bettype/lib/api.js");






const overviewApiFactory = {
  mainApi: filterData => {
    return _tabs_overview_lib_api__WEBPACK_IMPORTED_MODULE_1__["getCombineData"](filterData);
  },
  lazyApi: null
};
const currencyApiFactory = {
  mainApi: filterData => {
    return _tabs_currency_lib_api__WEBPACK_IMPORTED_MODULE_2__["getCombineData"](filterData);
  },
  lazyApi: async (mainData, filterData) => {
    const topDistributions = mainData.topDistributions;
    const lazyFilterData = { ...filterData,
      ...{
        topDistributions
      }
    };
    const responseData = await _tabs_currency_lib_api__WEBPACK_IMPORTED_MODULE_2__["getAllMonthGrowthData"](lazyFilterData);
    const data = {
      handlerData: state => {
        state['growthData']['monthGrowth'] = responseData;
        return state;
      }
    };
    return data;
  }
};
const productApiFactory = {
  mainApi: filterData => {
    return _tabs_product_lib_api__WEBPACK_IMPORTED_MODULE_3__["getCombineData"](filterData);
  },
  lazyApi: async (mainData, filterData) => {
    const topDistributions = mainData.topDistributions;
    const lazyFilterData = { ...filterData,
      ...{
        topDistributions
      }
    };
    const responseData = await _tabs_product_lib_api__WEBPACK_IMPORTED_MODULE_3__["getAllMonthGrowthData"](lazyFilterData);
    const data = {
      handlerData: state => {
        state['growthData']['monthGrowth'] = responseData;
        return state;
      }
    };
    return data;
  }
};
const platformApiFactory = {
  mainApi: filterData => {
    return _tabs_platform_lib_api__WEBPACK_IMPORTED_MODULE_4__["getCombineData"](filterData);
  },
  lazyApi: async (mainData, filterData) => {
    const topDistributions = mainData.topDistributions;
    const lazyFilterData = { ...filterData,
      ...{
        topDistributions
      }
    };
    const responseData = await _tabs_platform_lib_api__WEBPACK_IMPORTED_MODULE_4__["getAllMonthGrowthData"](lazyFilterData);
    const data = {
      handlerData: state => {
        state['growthData']['monthGrowth'] = responseData;
        return state;
      }
    };
    return data;
  }
};
const bettypeApiFactory = {
  mainApi: filterData => {
    return _tabs_bettype_lib_api__WEBPACK_IMPORTED_MODULE_5__["getCombineData"](filterData);
  },
  lazyApi: async (mainData, filterData) => {
    const topDistributions = mainData.topDistributions;
    const lazyFilterData = { ...filterData,
      ...{
        topDistributions
      }
    };
    const responseData = await _tabs_bettype_lib_api__WEBPACK_IMPORTED_MODULE_5__["getAllMonthGrowthData"](lazyFilterData);
    const data = {
      handlerData: state => {
        state['growthData']['monthGrowth'] = responseData;
        return state;
      }
    };
    return data;
  }
};
const factoryApi = {
  [_lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].overview]: overviewApiFactory,
  [_lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].currency]: currencyApiFactory,
  [_lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].product]: productApiFactory,
  [_lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].platform]: platformApiFactory,
  [_lib_constants__WEBPACK_IMPORTED_MODULE_0__["tabMenuKey"].bettype]: bettypeApiFactory
};

/***/ }),

/***/ "./src/js/pages/performance/lib/constants.js":
/*!***************************************************!*\
  !*** ./src/js/pages/performance/lib/constants.js ***!
  \***************************************************/
/*! exports provided: MEASUREMENT_ID, defaultData, tabMenuKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEASUREMENT_ID", function() { return MEASUREMENT_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultData", function() { return defaultData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuKey", function() { return tabMenuKey; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");



const MEASUREMENT_ID = {
  'TURNOVER': 1,
  'GROSS_PROFIT': 2,
  'MARGIN': 3
};
const defaultData = {
  measurements: [{
    id: MEASUREMENT_ID.TURNOVER,
    name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__["default"].getDefaultRes('turnover')
  }, {
    id: MEASUREMENT_ID.GROSS_PROFIT,
    name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__["default"].getDefaultRes('gross_profit')
  }, {
    id: MEASUREMENT_ID.MARGIN,
    name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_2__["default"].getDefaultRes('margin')
  }],
  getComparePeriods: () => {
    const currentPeriod = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_1__["getPeriodByNumberOfLastMonths"])(Object(_lib_constants__WEBPACK_IMPORTED_MODULE_0__["getCurrentTime"])(), 1);
    const previousPeriod = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_1__["getPreviousPeriod"])(currentPeriod);
    return {
      currentPeriod,
      previousPeriod
    };
  }
};
const tabMenuKey = {
  overview: 'overview',
  currency: 'currency',
  product: 'product',
  bettype: 'bettype',
  platform: 'platform'
};

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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");


const generalService = {
  getFilterData: ({
    selectedMeasurement,
    selectedBaseCurrency,
    selectedComparePeriods
  }) => {
    return {
      measurement: selectedMeasurement,
      baseCurrencyName: selectedBaseCurrency,
      currentPeriod: _convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.currentPeriod)),
      previousPeriod: _convertPeriodToMetaModel(_convertPeriod(selectedComparePeriods.previousPeriod))
    };
  },
  getFilterDataMonthGrowth: ({
    analyticData,
    selectedPeriod
  }) => {
    return {
      baseCurrencyName: analyticData.baseCurrency,
      currentPeriod: selectedPeriod,
      previousPeriod: analyticData.previousPeriod,
      measurement: {
        id: analyticData.measurementId
      }
    };
  },
  getFieldMonthGrowth: (selectedCategory, selectedPeriod) => {
    return selectedCategory + '_' + selectedPeriod.fromMonth + '_' + selectedPeriod.toMonth;
  },
  getMeasurementNameById: measurementId => {
    return _lib_constants__WEBPACK_IMPORTED_MODULE_1__["defaultData"].measurements.find(_ => _.id === measurementId);
  },
  getCurrencyDisplayName: (currency, fieldId, fieldName) => {
    const displayName = _currenyDisplayNameMapper[currency[fieldId]] || currency[fieldName];
    return displayName;
  },
  getScrollTabStyle: () => {
    const {
      innerHeight
    } = window;
    return {
      maxHeight: innerHeight - 200 + 'px'
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

const _currenyDisplayNameMapper = {
  '20': 'UUS',
  '51': 'INH',
  '70': 'MKK',
  '75': 'PTU',
  '76': 'PS',
  '77': 'PTH',
  '92': 'HID'
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
    const {
      mainData,
      handlerData
    } = action;

    if (handlerData) {
      const newData = handlerData(state);
      return newData;
    }

    return mainData || {};
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





/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_loadingReducer__WEBPACK_IMPORTED_MODULE_3__, _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__, _filterReducer__WEBPACK_IMPORTED_MODULE_2__, _analyticDataReducer__WEBPACK_IMPORTED_MODULE_4__)));

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

/***/ "./src/js/pages/performance/tabs/PerformanceChildTab.jsx":
/*!***************************************************************!*\
  !*** ./src/js/pages/performance/tabs/PerformanceChildTab.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PerformanceChildTab; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/js/pages/performance/tabs/constants.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./service */ "./src/js/pages/performance/tabs/service.js");
/* harmony import */ var _components_charts_DistributionChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/charts/DistributionChart */ "./src/js/pages/performance/components/charts/DistributionChart.jsx");
/* harmony import */ var _components_charts_OverallChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/charts/OverallChart */ "./src/js/pages/performance/components/charts/OverallChart.jsx");
/* harmony import */ var _components_normal_ComparisonTable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/normal/ComparisonTable */ "./src/js/pages/performance/components/normal/ComparisonTable.jsx");
/* harmony import */ var _components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/charts/GrowthChart */ "./src/js/pages/performance/components/charts/GrowthChart.jsx");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");











class PerformanceChildTab extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);
    this.state = {
      isPeriodGrowthDataType: true,
      selectedColumnDrillDown: null
    };
    this.titleDistributionChart = '';
    this.isAutoScaleGrowthChart = true;
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  componentDidUpdate(prevProps) {
    const {
      isPeriodGrowthDataType
    } = this.state;

    if (this.props.analyticData !== prevProps.analyticData && !isPeriodGrowthDataType) {
      this.setState({
        isPeriodGrowthDataType: true
      });
    }
  }

  renderDistributionChart() {
    const {
      distributionData,
      topDistributions,
      measurementId,
      dataMapper
    } = this._getDistributionChartData();

    if (!distributionData) {
      return null;
    }

    const measurement = _lib_service__WEBPACK_IMPORTED_MODULE_8__["generalService"].getMeasurementNameById(measurementId) || {};
    const title = `${measurement.name}${_lib_constants__WEBPACK_IMPORTED_MODULE_10__["dashboardLangCode"] !== _lib_constants__WEBPACK_IMPORTED_MODULE_10__["langCodes"].english ? '' : ' '}${this.titleDistributionChart}`;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_charts_DistributionChart__WEBPACK_IMPORTED_MODULE_4__["default"], {
      distributionData: distributionData,
      topDistributions: topDistributions,
      title: title,
      dataMapper: dataMapper || _service__WEBPACK_IMPORTED_MODULE_3__["distributionChartDataMapper"]
    });
  }

  renderOverallChart() {
    const {
      overallMarginData,
      title
    } = this._getOverallChartData();

    if (!overallMarginData) {
      return null;
    }

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_charts_OverallChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
      title: title,
      overallData: overallMarginData,
      dataMapper: _service__WEBPACK_IMPORTED_MODULE_3__["overallChartDataMapper"]
    });
  }

  renderDifferenceTable() {
    const {
      measurementDifferenceData,
      dataMapper
    } = this._getDifferenceTableData();

    if (!measurementDifferenceData) {
      return null;
    }

    const tableData = dataMapper ? dataMapper(measurementDifferenceData, this.tabKey) : Object(_service__WEBPACK_IMPORTED_MODULE_3__["differenceTableDataMapper"])(measurementDifferenceData, this.tabKey);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_ComparisonTable__WEBPACK_IMPORTED_MODULE_6__["default"], tableData);
  }

  renderGrowthChart() {
    const {
      growthData,
      measurementId,
      displayNameMapper
    } = this._getGrowthChartData();

    if (!growthData) {
      return null;
    }

    const measurement = _lib_service__WEBPACK_IMPORTED_MODULE_8__["generalService"].getMeasurementNameById(measurementId) || {};
    const {
      isPeriodGrowthDataType,
      selectedColumnDrillDown
    } = this.state;
    const growthChartData = this._getGrowthData() || [];
    const lineChartData = {
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_9__["default"].getDefaultRes('growth_rate'),
      dataSet: growthChartData.map(_ => _.growthPercent)
    };

    const barChartData = this._getBarChartData(growthChartData, measurement, displayNameMapper);

    const labels = isPeriodGrowthDataType ? growthChartData.map(_ => displayNameMapper ? displayNameMapper(_) : _.name) : growthChartData.map(_ => _.name);
    const title = `${measurement.name}${_lib_constants__WEBPACK_IMPORTED_MODULE_10__["dashboardLangCode"] !== _lib_constants__WEBPACK_IMPORTED_MODULE_10__["langCodes"].english ? '' : ' '}${_lib_languageApi__WEBPACK_IMPORTED_MODULE_9__["default"].getDefaultRes('comparison')}${isPeriodGrowthDataType ? '' : ` - ${selectedColumnDrillDown.name} - ${_constants__WEBPACK_IMPORTED_MODULE_1__["growthChartConsts"][selectedColumnDrillDown.datasetIndex].periodName}`}`;
    const leftAxisName = `${measurement.name} ${measurementId === _lib_constants__WEBPACK_IMPORTED_MODULE_2__["MEASUREMENT_ID"].MARGIN ? '(%)' : ''}`;
    const autoScale = this.isAutoScaleGrowthChart;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_7__["default"], {
      autoScale: autoScale,
      title: title,
      barChartData: barChartData,
      lineChartData: lineChartData,
      labels: labels,
      leftAxisName: leftAxisName,
      showBackIcon: !isPeriodGrowthDataType,
      calculateBarWidth: _service__WEBPACK_IMPORTED_MODULE_3__["calculateBarWidthOfGrowthChart"],
      backToDefaultChart: () => this.setState({
        isPeriodGrowthDataType: true
      })
    });
  }

  _getDrillDownField() {
    const {
      selectedColumnDrillDown
    } = this.state;
    const {
      datasetIndex,
      id
    } = selectedColumnDrillDown;
    const {
      analyticData
    } = this.props;
    const selectedPeriod = analyticData[_constants__WEBPACK_IMPORTED_MODULE_1__["growthChartConsts"][datasetIndex]['periodField']];
    const field = _lib_service__WEBPACK_IMPORTED_MODULE_8__["generalService"].getFieldMonthGrowth(id, selectedPeriod);
    return field;
  }

  _getGrowthData() {
    const {
      isPeriodGrowthDataType
    } = this.state;
    const {
      analyticData
    } = this.props;
    const {
      growthData
    } = analyticData;

    if (isPeriodGrowthDataType) {
      return growthData['periodGrowth'];
    } else {
      const field = this._getDrillDownField();

      const drillDownData = growthData['monthGrowth'][field];
      return drillDownData;
    }
  }

  _getBarChartData(growthChartData, measurement, displayNameMapper) {
    const {
      isPeriodGrowthDataType,
      selectedColumnDrillDown
    } = this.state;

    if (isPeriodGrowthDataType) {
      return _constants__WEBPACK_IMPORTED_MODULE_1__["growthChartConsts"].map((_, datasetIndex) => {
        return {
          name: _.periodName,
          dataSet: growthChartData.map(__ => __[_.periodFieldName]),
          events: {
            click: growthChartData.map((periodData, colIndex) => {
              const drillDownData = {
                id: periodData.id,
                name: displayNameMapper ? displayNameMapper(periodData) : periodData.name,
                distributions: periodData[_.distributionFieldName],
                datasetIndex
              };
              return {
                columnIndex: colIndex,
                callBack: () => {
                  this.setState({
                    isPeriodGrowthDataType: false,
                    selectedColumnDrillDown: drillDownData
                  });
                }
              };
            })
          }
        };
      });
    } else {
      return [{
        name: selectedColumnDrillDown.name + ' ' + measurement.name,
        dataSet: growthChartData.map(_ => _.total),
        color: _constants__WEBPACK_IMPORTED_MODULE_1__["growthChartConsts"][selectedColumnDrillDown.datasetIndex].columnColor
      }, {
        hidden: true,
        dataSet: []
      }];
    }
  }

}

/***/ }),

/***/ "./src/js/pages/performance/tabs/bettype/BettypeTab.jsx":
/*!**************************************************************!*\
  !*** ./src/js/pages/performance/tabs/bettype/BettypeTab.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../PerformanceChildTab */ "./src/js/pages/performance/tabs/PerformanceChildTab.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/performance/tabs/bettype/lib/constants.js");










class BettypeTab extends _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_6__["default"] {
  constructor(props) {
    super(props);
    this.state = { ...this.state,
      ...{}
    };
    this.titleDistributionChart = _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleDistributionChart"];
    this.isAutoScaleGrowthChart = false;
    this.tabKey = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuKey"].bettype;
  }

  _getDistributionChartData() {
    const {
      distributionData,
      topDistributions,
      measurementId
    } = this.props.analyticData;
    return {
      distributionData,
      topDistributions,
      measurementId
    };
  }

  _getOverallChartData() {
    const {
      overallMarginData
    } = this.props.analyticData;
    return {
      overallMarginData,
      title: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleOverallMarginChart"]
    };
  }

  _getDifferenceTableData() {
    const {
      measurementDifferenceData
    } = this.props.analyticData;
    return {
      measurementDifferenceData
    };
  }

  _getGrowthChartData() {
    const {
      growthData,
      measurementId
    } = this.props.analyticData;
    return {
      growthData,
      measurementId
    };
  }

  render() {
    const {
      measurementId
    } = this.props.analyticData;
    return measurementId ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "child-tab bettype-tab",
      style: _lib_service__WEBPACK_IMPORTED_MODULE_5__["generalService"].getScrollTabStyle()
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-left"
    }, measurementId === _lib_constants__WEBPACK_IMPORTED_MODULE_4__["MEASUREMENT_ID"].MARGIN ? this.renderOverallChart() : this.renderDistributionChart()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-right"
    }, this.renderDifferenceTable())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, this.renderGrowthChart())) : null;
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__["setAnalyticData"]
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    analyticData
  } = state;
  return Object.assign({}, {
    analyticData
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(BettypeTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/bettype/lib/api.js":
/*!**********************************************************!*\
  !*** ./src/js/pages/performance/tabs/bettype/lib/api.js ***!
  \**********************************************************/
/*! exports provided: getCombineData, getAllMonthGrowthData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCombineData", function() { return getCombineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMonthGrowthData", function() { return getAllMonthGrowthData; });
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");

const getCombineData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/bettype'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};
const getAllMonthGrowthData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/bettype/month-growth-all'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};

/***/ }),

/***/ "./src/js/pages/performance/tabs/bettype/lib/constants.js":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/bettype/lib/constants.js ***!
  \****************************************************************/
/*! exports provided: titleDistributionChart, titleOverallMarginChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleDistributionChart", function() { return titleDistributionChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleOverallMarginChart", function() { return titleOverallMarginChart; });
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/languageApi */ "./src/js/lib/languageApi.js");

const titleDistributionChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('distribution_chart_title_bettype');
const titleOverallMarginChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('overall_margin_growth');

/***/ }),

/***/ "./src/js/pages/performance/tabs/constants.js":
/*!****************************************************!*\
  !*** ./src/js/pages/performance/tabs/constants.js ***!
  \****************************************************/
/*! exports provided: differenceTableTitle, growthChartConsts, rowDataMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "differenceTableTitle", function() { return differenceTableTitle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "growthChartConsts", function() { return growthChartConsts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rowDataMapper", function() { return rowDataMapper; });
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");

const differenceTableTitle = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('difference_table_title');
const growthChartConsts = [{
  periodName: _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('previous_period'),
  periodFieldName: 'previousPeriodTotal',
  periodField: 'previousPeriod',
  distributionFieldName: 'previousPeriodDistributions'
}, {
  periodName: _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('current_period'),
  periodFieldName: 'currentPeriodTotal',
  periodField: 'currentPeriod',
  distributionFieldName: 'currentPeriodDistributions',
  columnColor: '#36A2EB'
}];
const rowDataMapper = [data => ({
  value: data.differenceTurnover.differenceDistribution,
  isPercentUnit: true
}), data => ({
  value: data.differenceTurnover.differenceTotal,
  isPercentUnit: false
}), data => ({
  value: data.differenceGrossProfit.differenceDistribution,
  isPercentUnit: true
}), data => ({
  value: data.differenceGrossProfit.differenceTotal,
  isPercentUnit: false
}), data => ({
  value: data.differenceMargin.differenceTotal,
  isPercentUnit: true
})];

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
/* harmony import */ var _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/service */ "./src/js/pages/performance/tabs/currency/lib/service.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/performance/tabs/currency/lib/constants.js");
/* harmony import */ var _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../PerformanceChildTab */ "./src/js/pages/performance/tabs/PerformanceChildTab.jsx");










class CurrencyTab extends _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_8__["default"] {
  constructor(props) {
    super(props);
    this.state = { ...this.state,
      ...{}
    };
    this.titleDistributionChart = _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleDistributionChart"];
    this.isAutoScaleGrowthChart = false;
    this.tabKey = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuKey"].currency;
  }

  _getDistributionChartData() {
    const {
      distributionData,
      topDistributions,
      measurementId
    } = this.props.analyticData;
    return {
      distributionData,
      topDistributions,
      measurementId,
      dataMapper: _lib_service__WEBPACK_IMPORTED_MODULE_6__["currencyDistributionChartDataMapper"]
    };
  }

  _getOverallChartData() {
    const {
      overallMarginData
    } = this.props.analyticData;
    return {
      overallMarginData,
      title: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleOverallMarginChart"]
    };
  }

  _getDifferenceTableData() {
    const {
      measurementDifferenceData
    } = this.props.analyticData;
    return {
      measurementDifferenceData,
      dataMapper: _lib_service__WEBPACK_IMPORTED_MODULE_6__["currencyDifferenceTableDataMapper"]
    };
  }

  _getGrowthChartData() {
    const {
      growthData,
      measurementId
    } = this.props.analyticData;
    return {
      growthData,
      measurementId,
      displayNameMapper: _lib_service__WEBPACK_IMPORTED_MODULE_6__["growthChartDisplayNameMapper"]
    };
  }

  render() {
    const {
      measurementId
    } = this.props.analyticData;
    return measurementId ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "child-tab currency-tab",
      style: _lib_service__WEBPACK_IMPORTED_MODULE_5__["generalService"].getScrollTabStyle()
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-left"
    }, measurementId === _lib_constants__WEBPACK_IMPORTED_MODULE_4__["MEASUREMENT_ID"].MARGIN ? this.renderOverallChart() : this.renderDistributionChart()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-right"
    }, this.renderDifferenceTable())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, this.renderGrowthChart())) : null;
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__["setAnalyticData"]
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    analyticData
  } = state;
  return Object.assign({}, {
    analyticData
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(CurrencyTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/currency/lib/api.js":
/*!***********************************************************!*\
  !*** ./src/js/pages/performance/tabs/currency/lib/api.js ***!
  \***********************************************************/
/*! exports provided: getCombineData, getAllMonthGrowthData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCombineData", function() { return getCombineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMonthGrowthData", function() { return getAllMonthGrowthData; });
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");

const getCombineData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/currency'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};
const getAllMonthGrowthData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/currency/month-growth-all'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};

/***/ }),

/***/ "./src/js/pages/performance/tabs/currency/lib/constants.js":
/*!*****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/currency/lib/constants.js ***!
  \*****************************************************************/
/*! exports provided: titleDistributionChart, titleOverallMarginChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleDistributionChart", function() { return titleDistributionChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleOverallMarginChart", function() { return titleOverallMarginChart; });
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/languageApi */ "./src/js/lib/languageApi.js");

const titleDistributionChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('distribution_chart_title_currency');
const titleOverallMarginChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('overall_margin_growth');

/***/ }),

/***/ "./src/js/pages/performance/tabs/currency/lib/service.js":
/*!***************************************************************!*\
  !*** ./src/js/pages/performance/tabs/currency/lib/service.js ***!
  \***************************************************************/
/*! exports provided: currencyDistributionChartDataMapper, currencyDifferenceTableDataMapper, growthChartDisplayNameMapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyDistributionChartDataMapper", function() { return currencyDistributionChartDataMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currencyDifferenceTableDataMapper", function() { return currencyDifferenceTableDataMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "growthChartDisplayNameMapper", function() { return growthChartDisplayNameMapper; });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../service */ "./src/js/pages/performance/tabs/service.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/service */ "./src/js/pages/performance/lib/service.js");


const currencyDistributionChartDataMapper = (distributionData, topDistributions) => {
  const displayNameMapper = currency => {
    return _lib_service__WEBPACK_IMPORTED_MODULE_1__["generalService"].getCurrencyDisplayName(currency, 'displayId', 'displayName');
  };

  const result = Object(_service__WEBPACK_IMPORTED_MODULE_0__["distributionChartDataMapper"])(distributionData, topDistributions, displayNameMapper);
  return result;
};
const currencyDifferenceTableDataMapper = (measurementDifferenceData, tabKey) => {
  const displayNameMapper = currency => {
    return _lib_service__WEBPACK_IMPORTED_MODULE_1__["generalService"].getCurrencyDisplayName(currency, 'id', 'name');
  };

  const result = Object(_service__WEBPACK_IMPORTED_MODULE_0__["differenceTableDataMapper"])(measurementDifferenceData, tabKey, displayNameMapper);
  return result;
};
const growthChartDisplayNameMapper = currency => {
  return _lib_service__WEBPACK_IMPORTED_MODULE_1__["generalService"].getCurrencyDisplayName(currency, 'id', 'name');
};

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
/* harmony import */ var _components_normal_ComparisonTable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/normal/ComparisonTable */ "./src/js/pages/performance/components/normal/ComparisonTable.jsx");
/* harmony import */ var _components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/charts/GrowthChart */ "./src/js/pages/performance/components/charts/GrowthChart.jsx");
/* harmony import */ var _components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/normal/ValueChangeIcon */ "./src/js/pages/performance/components/normal/ValueChangeIcon.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/performance/tabs/overview/lib/constants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../lib/constants */ "./src/js/lib/constants.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















class OverviewTab extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_getStyleGrowthChart", refSelf => {
      const {
        current
      } = refSelf;

      if (current) {
        const {
          offsetLeft
        } = current;
        const {
          innerWidth
        } = window;
        const width = offsetLeft < 30 ? innerWidth - 60 : innerWidth - 710;
        return {
          width: width + 'px'
        };
      } else {
        return {};
      }
    });

    this.state = {
      isPeriodGrowthDataType: true,
      selectedDrillDownColumn: 0,
      selectedDrillDownColumnName: ''
    };
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  componentDidUpdate(prevProps) {
    const {
      isPeriodGrowthDataType
    } = this.state;

    if (this.props.analyticData !== prevProps.analyticData && !isPeriodGrowthDataType) {
      this.setState({
        isPeriodGrowthDataType: true
      });
    }
  }

  _renderTopChangeTableList() {
    let {
      topChangeData,
      measurementId
    } = this.props.analyticData;
    const majorChangeList = Object(_lib_constants__WEBPACK_IMPORTED_MODULE_7__["getMajorChangeList"])(measurementId);
    return topChangeData && majorChangeList.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_ComparisonTable__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
      key: 'major_change_table_' + _.key
    }, { ..._,
      ...{
        data: _.handlerData ? _.handlerData(topChangeData[_.key]) : topChangeData[_.key]
      }
    }, {
      renderRow: (item, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: `major_change_row_${index}_${item.perspectiveName}`
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
        value: item.changePercent
      }), item.perspectiveName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _lib_numberFormat__WEBPACK_IMPORTED_MODULE_11__["default"].formatDecimal(item.total)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.changePercent + '%'))
    })));
  }

  _renderBoxInfoMeasureList() {
    let {
      summaryData,
      baseCurrency
    } = this.props.analyticData;
    summaryData = summaryData || [];
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_BoxInfoMeasureList__WEBPACK_IMPORTED_MODULE_3__["default"], {
      data: summaryData,
      currencyUnit: baseCurrency
    });
  }

  _renderGrowthChart() {
    const {
      measurementId
    } = this.props.analyticData;
    const {
      isPeriodGrowthDataType,
      selectedDrillDownColumnName
    } = this.state;

    const growthChartData = this._getGrowthChartData();

    const measurement = _lib_constants__WEBPACK_IMPORTED_MODULE_10__["defaultData"].measurements.find(_ => _.id === measurementId) || {};
    const labels = growthChartData.map(_ => _.name);
    const lineChartData = {
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_12__["default"].getDefaultRes('growth_rate'),
      dataSet: growthChartData.map(_ => _.growthPercent)
    };
    const barChartData = [{
      name: measurement.name,
      dataSet: growthChartData.map(_ => _.total),
      events: {
        click: isPeriodGrowthDataType ? growthChartData.map((_, colIndex) => {
          return {
            columnIndex: colIndex,
            callBack: () => {
              this.setState({
                isPeriodGrowthDataType: false,
                selectedDrillDownColumn: colIndex,
                selectedDrillDownColumnName: _.name
              });
            }
          };
        }) : []
      }
    }];
    const title = `${measurement.name}${_lib_constants__WEBPACK_IMPORTED_MODULE_13__["dashboardLangCode"] !== _lib_constants__WEBPACK_IMPORTED_MODULE_13__["langCodes"].english ? '' : ' '}${_lib_languageApi__WEBPACK_IMPORTED_MODULE_12__["default"].getDefaultRes('comparison')}${isPeriodGrowthDataType ? '' : ' - ' + selectedDrillDownColumnName}`;
    const leftAxisName = `${measurement.name} ${measurementId === _lib_constants__WEBPACK_IMPORTED_MODULE_10__["MEASUREMENT_ID"].MARGIN ? '(%)' : ''}`;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
      autoScale: true,
      getStyle: this._getStyleGrowthChart,
      title: title,
      barChartData: barChartData,
      lineChartData: lineChartData,
      labels: labels,
      leftAxisName: leftAxisName,
      showBackIcon: !isPeriodGrowthDataType,
      backToDefaultChart: () => this.setState({
        isPeriodGrowthDataType: true
      })
    });
  }

  _getGrowthChartData() {
    const {
      isPeriodGrowthDataType,
      selectedDrillDownColumn
    } = this.state;
    const {
      growthData
    } = this.props.analyticData;

    if (isPeriodGrowthDataType) {
      return growthData['periodGrowth'];
    } else {
      const drillDownData = growthData['monthGrowth'][selectedDrillDownColumn];
      return drillDownData;
    }
  }

  render() {
    const {
      measurementId
    } = this.props.analyticData;
    return measurementId ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "child-tab overview-tab",
      style: _lib_service__WEBPACK_IMPORTED_MODULE_8__["generalService"].getScrollTabStyle()
    }, this._renderBoxInfoMeasureList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-major-list"
    }, this._renderTopChangeTableList()), this._renderGrowthChart()) : null;
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])(Object.assign({}, {
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_9__["setAnalyticData"]
  }), dispatch);
}

function mapStateToProps(state) {
  const {
    analyticData
  } = state;
  return Object.assign({}, {
    analyticData
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(OverviewTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/overview/lib/api.js":
/*!***********************************************************!*\
  !*** ./src/js/pages/performance/tabs/overview/lib/api.js ***!
  \***********************************************************/
/*! exports provided: getCombineData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCombineData", function() { return getCombineData; });
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");

const getCombineData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/overview'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};

/***/ }),

/***/ "./src/js/pages/performance/tabs/overview/lib/constants.js":
/*!*****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/overview/lib/constants.js ***!
  \*****************************************************************/
/*! exports provided: getMajorChangeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMajorChangeList", function() { return getMajorChangeList; });
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../lib/languageApi */ "./src/js/lib/languageApi.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/service */ "./src/js/pages/performance/lib/service.js");



const getMajorChangeList = measurementId => {
  let measurement = _lib_constants__WEBPACK_IMPORTED_MODULE_0__["defaultData"].measurements.find(_ => _.id === measurementId);
  measurement = measurement || {};
  return [{
    key: 'currencyTopChange',
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('marjor_table_title_currency'),
    headers: [[{
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('currency')
    }, {
      name: measurement.name
    }, {
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('change_percent')
    }]],
    data: [],
    handlerData: data => data.map(_ => ({ ..._,
      ...{
        'perspectiveName': _lib_service__WEBPACK_IMPORTED_MODULE_2__["generalService"].getCurrencyDisplayName(_, 'perspectiveId', 'perspectiveName')
      }
    }))
  }, {
    key: 'productTopChange',
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('marjor_table_title_product'),
    headers: [[{
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('product')
    }, {
      name: measurement.name
    }, {
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('change_percent')
    }]],
    data: []
  }, {
    key: 'bettypeTopChange',
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('marjor_table_title_bettype'),
    headers: [[{
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('bettype')
    }, {
      name: measurement.name
    }, {
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('change_percent')
    }]],
    data: []
  }, {
    key: 'platformTopChange',
    title: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('marjor_table_title_platform'),
    headers: [[{
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('platform')
    }, {
      name: measurement.name
    }, {
      name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_1__["default"].getDefaultRes('change_percent')
    }]],
    data: []
  }];
};

/***/ }),

/***/ "./src/js/pages/performance/tabs/platform/PlatformTab.jsx":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/platform/PlatformTab.jsx ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../PerformanceChildTab */ "./src/js/pages/performance/tabs/PerformanceChildTab.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/performance/tabs/platform/lib/constants.js");










class PlatformTab extends _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_6__["default"] {
  constructor(props) {
    super(props);
    this.state = { ...this.state,
      ...{}
    };
    this.titleDistributionChart = _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleDistributionChart"];
    this.isAutoScaleGrowthChart = false;
    this.tabKey = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuKey"].platform;
  }

  _getDistributionChartData() {
    const {
      distributionData,
      topDistributions,
      measurementId
    } = this.props.analyticData;
    return {
      distributionData,
      topDistributions,
      measurementId
    };
  }

  _getOverallChartData() {
    const {
      overallMarginData
    } = this.props.analyticData;
    return {
      overallMarginData,
      title: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleOverallMarginChart"]
    };
  }

  _getDifferenceTableData() {
    const {
      measurementDifferenceData
    } = this.props.analyticData;
    return {
      measurementDifferenceData
    };
  }

  _getGrowthChartData() {
    const {
      growthData,
      measurementId
    } = this.props.analyticData;
    return {
      growthData,
      measurementId
    };
  }

  render() {
    const {
      measurementId
    } = this.props.analyticData;
    return measurementId ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "child-tab platform-tab",
      style: _lib_service__WEBPACK_IMPORTED_MODULE_5__["generalService"].getScrollTabStyle()
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-left"
    }, measurementId === _lib_constants__WEBPACK_IMPORTED_MODULE_4__["MEASUREMENT_ID"].MARGIN ? this.renderOverallChart() : this.renderDistributionChart()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-right"
    }, this.renderDifferenceTable())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, this.renderGrowthChart())) : null;
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__["setAnalyticData"]
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    analyticData
  } = state;
  return Object.assign({}, {
    analyticData
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(PlatformTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/platform/lib/api.js":
/*!***********************************************************!*\
  !*** ./src/js/pages/performance/tabs/platform/lib/api.js ***!
  \***********************************************************/
/*! exports provided: getCombineData, getAllMonthGrowthData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCombineData", function() { return getCombineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMonthGrowthData", function() { return getAllMonthGrowthData; });
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");

const getCombineData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/platform'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};
const getAllMonthGrowthData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/platform/month-growth-all'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};

/***/ }),

/***/ "./src/js/pages/performance/tabs/platform/lib/constants.js":
/*!*****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/platform/lib/constants.js ***!
  \*****************************************************************/
/*! exports provided: titleDistributionChart, titleOverallMarginChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleDistributionChart", function() { return titleDistributionChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleOverallMarginChart", function() { return titleOverallMarginChart; });
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/languageApi */ "./src/js/lib/languageApi.js");

const titleDistributionChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('distribution_chart_title_platform');
const titleOverallMarginChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('overall_margin_growth');

/***/ }),

/***/ "./src/js/pages/performance/tabs/product/ProductTab.jsx":
/*!**************************************************************!*\
  !*** ./src/js/pages/performance/tabs/product/ProductTab.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../actions/analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../PerformanceChildTab */ "./src/js/pages/performance/tabs/PerformanceChildTab.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./lib/constants */ "./src/js/pages/performance/tabs/product/lib/constants.js");










class ProductTab extends _PerformanceChildTab__WEBPACK_IMPORTED_MODULE_6__["default"] {
  constructor(props) {
    super(props);
    this.state = { ...this.state,
      ...{}
    };
    this.titleDistributionChart = _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleDistributionChart"];
    this.isAutoScaleGrowthChart = false;
    this.tabKey = _lib_constants__WEBPACK_IMPORTED_MODULE_4__["tabMenuKey"].product;
  }

  _getDistributionChartData() {
    const {
      distributionData,
      topDistributions,
      measurementId
    } = this.props.analyticData;
    return {
      distributionData,
      topDistributions,
      measurementId
    };
  }

  _getOverallChartData() {
    const {
      overallMarginData
    } = this.props.analyticData;
    return {
      overallMarginData,
      title: _lib_constants__WEBPACK_IMPORTED_MODULE_7__["titleOverallMarginChart"]
    };
  }

  _getDifferenceTableData() {
    const {
      measurementDifferenceData
    } = this.props.analyticData;
    return {
      measurementDifferenceData
    };
  }

  _getGrowthChartData() {
    const {
      growthData,
      measurementId
    } = this.props.analyticData;
    return {
      growthData,
      measurementId
    };
  }

  render() {
    const {
      measurementId
    } = this.props.analyticData;
    return measurementId ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "child-tab product-tab",
      style: _lib_service__WEBPACK_IMPORTED_MODULE_5__["generalService"].getScrollTabStyle()
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-left"
    }, measurementId === _lib_constants__WEBPACK_IMPORTED_MODULE_4__["MEASUREMENT_ID"].MARGIN ? this.renderOverallChart() : this.renderDistributionChart()), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-right"
    }, this.renderDifferenceTable())), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "side-tab-container"
    }, this.renderGrowthChart())) : null;
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__["setAnalyticData"]
  }, dispatch);
}

function mapStateToProps(state) {
  const {
    analyticData
  } = state;
  return Object.assign({}, {
    analyticData
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ProductTab));

/***/ }),

/***/ "./src/js/pages/performance/tabs/product/lib/api.js":
/*!**********************************************************!*\
  !*** ./src/js/pages/performance/tabs/product/lib/api.js ***!
  \**********************************************************/
/*! exports provided: getCombineData, getAllMonthGrowthData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCombineData", function() { return getCombineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllMonthGrowthData", function() { return getAllMonthGrowthData; });
/* harmony import */ var _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/widgetApi */ "./src/js/lib/widgetApi.js");

const getCombineData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/product'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};
const getAllMonthGrowthData = async filterData => {
  const param = Object.assign({}, _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].getCommonParam(4), {
    Data: filterData,
    Url: '/api/performance/product/month-growth-all'
  });
  const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

  if (response && response.data && response.data.isSuccess) {
    return response.data.data;
  }

  return {};
};

/***/ }),

/***/ "./src/js/pages/performance/tabs/product/lib/constants.js":
/*!****************************************************************!*\
  !*** ./src/js/pages/performance/tabs/product/lib/constants.js ***!
  \****************************************************************/
/*! exports provided: titleDistributionChart, titleOverallMarginChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleDistributionChart", function() { return titleDistributionChart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "titleOverallMarginChart", function() { return titleOverallMarginChart; });
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../lib/languageApi */ "./src/js/lib/languageApi.js");

const titleDistributionChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('distribution_chart_title_product');
const titleOverallMarginChart = _lib_languageApi__WEBPACK_IMPORTED_MODULE_0__["default"].getDefaultRes('overall_margin_growth');

/***/ }),

/***/ "./src/js/pages/performance/tabs/service.js":
/*!**************************************************!*\
  !*** ./src/js/pages/performance/tabs/service.js ***!
  \**************************************************/
/*! exports provided: distributionChartDataMapper, overallChartDataMapper, getFilterDataMonthGrowth, differenceTableDataMapper, calculateBarWidthOfGrowthChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "distributionChartDataMapper", function() { return distributionChartDataMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "overallChartDataMapper", function() { return overallChartDataMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFilterDataMonthGrowth", function() { return getFilterDataMonthGrowth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "differenceTableDataMapper", function() { return differenceTableDataMapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "calculateBarWidthOfGrowthChart", function() { return calculateBarWidthOfGrowthChart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/js/pages/performance/tabs/constants.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");
/* harmony import */ var _components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/normal/ValueChangeIcon */ "./src/js/pages/performance/components/normal/ValueChangeIcon.jsx");
/* harmony import */ var _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../lib/languageApi */ "./src/js/lib/languageApi.js");







const distributionChartDataMapper = (distributionData, topDistributions, displayNameMapper = null) => {
  const labels = distributionData.map(_ => _.name + '  ' + _lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].nFormatter(_.total));
  const stackedChartData = topDistributions.map(_ => {
    return {
      name: displayNameMapper ? displayNameMapper(_) : _.displayName,
      dataSet: getDistributionDataSet(distributionData, _.displayId)
    };
  });
  return {
    labels,
    stackedChartData
  };
};
const overallChartDataMapper = overallData => {
  const labels = overallData.map(_ => _.name);
  const barChartData = [{
    dataSet: overallData.map(_ => _.total)
  }];
  return {
    labels,
    barChartData
  };
};
const getFilterDataMonthGrowth = ({
  analyticData,
  selectedPeriod,
  selectedCurrency
}) => {
  const filter = _lib_service__WEBPACK_IMPORTED_MODULE_1__["generalService"].getFilterDataMonthGrowth({
    analyticData,
    selectedPeriod
  });
  return { ...filter,
    ...{
      currencies: selectedCurrency.distributions.map(_ => _.name)
    }
  };
};

const getDistributionDataSet = (data, distributionId) => {
  const dataSet = data.map(__ => {
    const distribution = __.distributions.find(distribution => distribution.id === distributionId);

    return distribution.percent;
  });
  return dataSet;
};

const getDifferenceTableHeader = tabKey => [[{
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultRes(tabKey),
  rowSpan: 2
}, ...[{
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultRes('turnover'),
  colSpan: 2
}, {
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultRes('gross_profit'),
  colSpan: 2
}, {
  name: `${_lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultRes('margin')} %`,
  rowSpan: 2
}]], [{
  name: '%'
}, {
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultRes('value')
}, {
  name: '%'
}, {
  name: _lib_languageApi__WEBPACK_IMPORTED_MODULE_5__["default"].getDefaultRes('value')
}]];

const renderDiffenrenceTableRow = (rowData, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
  key: `table_comparison_row_${index}_${rowData}`
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, rowData.name)), rowData.data.map(_ => {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _.isPercentUnit ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-b-5"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_4__["default"], {
    value: _.value
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _.value + '%')) : null, _.isPercentUnit ? null : _lib_numberFormat__WEBPACK_IMPORTED_MODULE_3__["default"].formatDecimal(_.value));
}));

const differenceTableDataMapper = (measurementDifferenceData, tabKey, displayNameMapper = null) => {
  const rows = measurementDifferenceData.map(_ => ({
    name: displayNameMapper ? displayNameMapper(_) : _.name,
    data: _constants__WEBPACK_IMPORTED_MODULE_2__["rowDataMapper"].map(__ => __(_))
  }));
  const headers = getDifferenceTableHeader(tabKey);
  return {
    title: _constants__WEBPACK_IMPORTED_MODULE_2__["differenceTableTitle"],
    headers,
    data: rows,
    renderRow: renderDiffenrenceTableRow
  };
};
const calculateBarWidthOfGrowthChart = numberOfColumn => {
  if (numberOfColumn < 6) {
    return {
      barPercentage: 0.6,
      categoryPercentage: 0.5
    };
  }

  if (numberOfColumn < 11) {
    return {
      barPercentage: 0.7,
      categoryPercentage: 0.6
    };
  }

  return {
    barPercentage: 0.9,
    categoryPercentage: 0.8
  };
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

/***/ })

}]);
//# sourceMappingURL=performanceDashboard.chunk.js.map