(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["performance/performanceDashboard"],{

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
  label: "Previous Period",
  onSelect: selectedCurrentPeriod => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPreviousPeriod"])(selectedCurrentPeriod)
}, {
  label: "Previous Year",
  onSelect: selectedCurrentPeriod => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPreviousYear"])(selectedCurrentPeriod)
}];
const currentPeriodQuickSelections = [{
  label: "Last Month",
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByNumberOfLastMonths"])(currentTime, 1)
}, {
  label: "Last Quarter",
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByLastQuarter"])(currentTime)
}, {
  label: "Last 3 months",
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByNumberOfLastMonths"])(currentTime, 3)
}, {
  label: "Last 6 months",
  onSelect: currentTime => Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getPeriodByNumberOfLastMonths"])(currentTime, 6)
}];
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
  }

  render() {
    const {
      currentPeriod,
      previousPeriod
    } = this.state;
    const rangeTo = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_2__["getDistanceBetweenPeriod"])(currentPeriod) + 1;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "couple-month-range"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-range-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["langCode"], "currerntPeriodPicker")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      from: currentPeriod.from,
      to: currentPeriod.to,
      onChangeRange: this._onChangeRangeCurrentPeriod,
      quickSelections: this._renderCurrentPeriodQuickSelection
    })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "month-range-item"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "label"
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_4__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_3__["langCode"], "previousPeriodPicker")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MonthRangePicker__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isDisableTo: true,
      range: rangeTo,
      maxMonthFrom: previousPeriod.from.month + 1,
      maxYearFrom: previousPeriod.from.year,
      from: previousPeriod.from,
      to: previousPeriod.to,
      onChangeRange: this._onChangeRangePreviousPeriod,
      quickSelections: this._renderPreviousPeriodQuickSelection
    })));
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const isTimeEqual = (time1, time2) => {
  return time1.year === time2.year && time1.month === time2.month;
};

const isPeriodEqual = (period1, period2) => {
  return isTimeEqual(period1.from, period2.from) && isTimeEqual(period1.to, period2.to);
};

const getMaxYearTo = ({
  year,
  month
}, range, maxYear = new Date().getFullYear()) => {
  let maxDate = new Date(year, month);
  maxDate = new Date(maxDate.setMonth(maxDate.getMonth() + range));
  let maxYearTo = maxDate.getFullYear();
  return maxYearTo;
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
    const maxYearTo = getMaxYearTo(from, range);
    const maxMonthTo = getMaxMonthTo(from.month + 1, range);

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
    }, quickSelections && quickSelections(this), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: ""
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-confirm",
      onClick: this._onConfirmChangeRange
    }, "OK"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-cancel m-l-5",
      onClick: this._cancel
    }, "Cancel"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
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
  minYearFrom: new Date().getFullYear() - 5,
  maxYearFrom: new Date().getFullYear(),
  minMonthFrom: 1,
  maxMonthFrom: 12,
  hasRange: true,
  range: 12,
  isDisableTo: false
});

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
      const data = await _lib_api__WEBPACK_IMPORTED_MODULE_2__["factoryApi"][tabKey](filterData);
      dispatch(setAnalyticData(data));
    } catch (error) {
      console.log('error', error.message);
    }

    dispatch(Object(_loadingAction__WEBPACK_IMPORTED_MODULE_1__["setLoading"])(false));
    console.log('filter', filterData);
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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _components_CoupleMonthRangePicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../components/CoupleMonthRangePicker */ "./src/js/components/CoupleMonthRangePicker.jsx");
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
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_CoupleMonthRangePicker__WEBPACK_IMPORTED_MODULE_7__["default"], {
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
    }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "btn btn-confirm",
      onClick: this._onSubmit
    }, _lib_languageApi__WEBPACK_IMPORTED_MODULE_3__["default"].getRes(_lib_constants__WEBPACK_IMPORTED_MODULE_6__["langCode"], "submit")));
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
    selectedComparePeriods,
    currentChildTabKey
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
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lib/constants */ "./src/js/pages/performance/lib/constants.js");
/* harmony import */ var _dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../dashboard/components/TabMenu */ "./src/js/pages/dashboard/components/TabMenu.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





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
    const item = _lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuList"].find(_ => _.key === selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this._getCurrentTab();

    const {
      selectedTabKey
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tab-container"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_dashboard_components_TabMenu__WEBPACK_IMPORTED_MODULE_2__["default"], {
      selectedTabMenu: selectedTabKey,
      onClickTabMenu: this._onClickTabMenu,
      tabMenuList: _lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuList"]
    }), CurrentTab && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CurrentTab, null));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TabContainer);

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
      }), 'Go back') : null);
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
      currentMeasuremnent,
      lineChartData,
      barChartData,
      labels
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
    }, `${currentMeasuremnent || ''} Growth`), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-zone-body"
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_base_MixBarLineChart__WEBPACK_IMPORTED_MODULE_1__["default"], {
      header: this._renderHeaderChart,
      lineChartData: lineChartData,
      barChartData: barChartData,
      labels: labels
    })));
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const defaultColorBarChart = '#F1A837';
const defaultColorLineChart = '#690499';

const buildLineChartDataSet = lineChartData => {
  return {
    label: lineChartData.name,
    type: 'line',
    lineTension: 0,
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
  return {
    type: 'bar',
    label: barChartData.name,
    data: barChartData.dataSet,
    fill: false,
    backgroundColor: barChartData.color || defaultColorBarChart,
    borderColor: barChartData.color || defaultColorBarChart,
    hoverBackgroundColor: barChartData.color || defaultColorBarChart,
    hoverBorderColor: barChartData.color || defaultColorBarChart,
    yAxisID: 'y-axis-1'
  };
};

const buildMixChartDataSet = ({
  lineChartData,
  barChartData
}) => {
  const lineChartDataSet = buildLineChartDataSet(lineChartData);
  const barChartDataSet = buildBarChartDataSet(barChartData);
  return {
    datasets: [lineChartDataSet, barChartDataSet]
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
    const isLineChart = dataset.type === "line" ? true : false;
    const suffix = isLineChart ? "%" : '';
    const meta = self.getDatasetMeta(datasetIndex);
    meta.data.forEach(function (element, elementIndex) {
      const value = dataset.data[elementIndex];
      const text = _lib_numberFormat__WEBPACK_IMPORTED_MODULE_2__["default"].formatDecimal(value) + suffix;
      const yOffset = value > 0 ? 6 : -7;
      const xLabel = element._model.x - (isLineChart ? 0 : element._model.width / 2);
      ctx.fillText(text, xLabel, element._model.y - yOffset);
    });
  });
};

const buildMixChartOption = ({
  labels,
  barChartData
}) => {
  const events = barChartData.events;
  const eventClicks = events ? events.click : null;
  const barWidthObj = barChartData.dataSet.length >= 6 ? {
    barPercentage: 0.9
  } : {
    barPercentage: 0.4
  };
  const leftAxisName = barChartData.name;
  return {
    onClick: (e, item) => {
      if (item && item.length == 2) {
        if (eventClicks && eventClicks.length > 0) {
          const eventClick = eventClicks.find(_ => _.columnIndex === item[1]._index);
          eventClick && eventClick.callBack && eventClick.callBack();
        }
      }
    },
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
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
          labelString: 'Growth rate(%)'
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

    _defineProperty(this, "_renderFooter", () => {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "chart-footer"
      });
    });
  }

  _renderChart() {
    const {
      lineChartData,
      barChartData,
      labels
    } = this.props;
    const data = buildMixChartDataSet({
      lineChartData,
      barChartData
    });
    const options = buildMixChartOption({
      labels,
      barChartData
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
    }, header && header(), this._renderChart(), this._renderFooter());
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
  return header.map((_, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", {
    key: `table_major_header_${index}`
  }, _ + ''));
};

const renderRows = (data, renderRow) => {
  return data.map((rowData, index) => renderRow(rowData, index));
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
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuKey"].overview]: filterData => {
    return overviewApi.getCombineData(filterData);
  },
  [_lib_constants__WEBPACK_IMPORTED_MODULE_1__["tabMenuKey"].currency]: filterData => {
    return currencyApi.getCombineData(filterData);
  }
};
const commonParam = {
  IsCrossSite: true,
  Data: {},
  Url: '',
  Type: 4
};
const overviewApi = {
  getCombineData: async filterData => {
    const param = Object.assign({}, commonParam, {
      Data: filterData,
      Url: '/api/performance/overview'
    });
    const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

    if (response && response.data) {
      return response.data.data;
    }

    return null;
  }
};
const currencyApi = {
  getCombineData: async filterData => {
    const param = Object.assign({}, commonParam, {
      Data: filterData,
      Url: '/api/performance/currency'
    });
    const response = await _lib_widgetApi__WEBPACK_IMPORTED_MODULE_0__["default"].postData(param);

    if (response && response.data) {
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
/*! exports provided: defaultData, tabMenuKey, tabMenuList, getMajorChangeList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultData", function() { return defaultData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuKey", function() { return tabMenuKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tabMenuList", function() { return tabMenuList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMajorChangeList", function() { return getMajorChangeList; });
/* harmony import */ var _tabs_overview_OverviewTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../tabs/overview/OverviewTab */ "./src/js/pages/performance/tabs/overview/OverviewTab.jsx");
/* harmony import */ var _tabs_currency_CurrencyTab__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tabs/currency/CurrencyTab */ "./src/js/pages/performance/tabs/currency/CurrencyTab.jsx");
/* harmony import */ var _lib_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../lib/constants */ "./src/js/lib/constants.js");
/* harmony import */ var _lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../lib/dateTimeHelper */ "./src/js/lib/dateTimeHelper.js");




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
  getComparePeriods: () => {
    const currentPeriod = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__["getPeriodByNumberOfLastMonths"])(Object(_lib_constants__WEBPACK_IMPORTED_MODULE_2__["getCurrentTime"])(), 3);
    const previousPeriod = Object(_lib_dateTimeHelper__WEBPACK_IMPORTED_MODULE_3__["getPreviousPeriod"])(currentPeriod);
    return {
      currentPeriod,
      previousPeriod
    };
  }
};
const tabMenuKey = {
  overview: 'overview',
  currency: 'currency'
};
const tabMenuList = [{
  key: tabMenuKey.overview,
  name: 'Overview',
  component: _tabs_overview_OverviewTab__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  key: tabMenuKey.currency,
  name: 'Currency',
  component: _tabs_currency_CurrencyTab__WEBPACK_IMPORTED_MODULE_1__["default"]
}];
const getMajorChangeList = measurementId => {
  let measurement = defaultData.measurements.find(_ => _.id === measurementId);
  measurement = measurement || {};
  return [{
    key: 'currencyTopChange',
    title: 'MAJOR CHANGES - By CURRENCY',
    header: ['Currency', measurement.name, '%CHG'],
    data: []
  }, {
    key: 'productTopChange',
    title: 'MAJOR CHANGES - By PRODUCT',
    header: ['Product', measurement.name, '%CHG'],
    data: []
  }, {
    key: 'bettypeTopChange',
    title: 'MAJOR CHANGES - By BETTYPE',
    header: ['Bettype', measurement.name, '%CHG'],
    data: []
  }, {
    key: 'platformTopChange',
    title: 'MAJOR CHANGES - By PLATFORM',
    header: ['Platform', measurement.name, '%CHG'],
    data: []
  }];
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
/* harmony import */ var _tabs_overview_reducers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../tabs/overview/reducers */ "./src/js/pages/performance/tabs/overview/reducers/index.js");






/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(Object.assign(_loadingReducer__WEBPACK_IMPORTED_MODULE_3__, _reducers_currencyReducer__WEBPACK_IMPORTED_MODULE_1__, _filterReducer__WEBPACK_IMPORTED_MODULE_2__, _analyticDataReducer__WEBPACK_IMPORTED_MODULE_4__, _tabs_overview_reducers__WEBPACK_IMPORTED_MODULE_5__["default"])));

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




class CurrencyTab extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Currency Tab");
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])({
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_2__["setAnalyticData"]
  }, dispatch);
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
/* harmony import */ var _lib_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../lib/service */ "./src/js/pages/performance/lib/service.js");
/* harmony import */ var _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../actions/analyticDataAction */ "./src/js/pages/performance/actions/analyticDataAction.js");
/* harmony import */ var _lib_numberFormat__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../lib/numberFormat */ "./src/js/lib/numberFormat.js");
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
      isPeriodGrowthDataType: true
    };
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  _renderTopChangeTableList() {
    let {
      topChangeData,
      measurementId
    } = this.props.analyticData;
    const majorChangeList = Object(_lib_constants__WEBPACK_IMPORTED_MODULE_7__["getMajorChangeList"])(measurementId);
    return topChangeData && majorChangeList.map(_ => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_TableMajorChangeItem__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({
      key: 'major_change_table_' + _.key
    }, { ..._,
      ...{
        data: topChangeData[_.key]
      }
    }, {
      renderRow: (item, index) => react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
        key: `major_change_row_${index}_${item.perspectiveName}`
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_normal_ValueChangeIcon__WEBPACK_IMPORTED_MODULE_6__["default"], {
        value: item.changePercent
      }), item.perspectiveName), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, _lib_numberFormat__WEBPACK_IMPORTED_MODULE_10__["default"].formatDecimal(item.total)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, item.changePercent + '%'))
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
    let {
      growthData,
      measurementId
    } = this.props.analyticData;
    if (!measurementId) return null;
    growthData = growthData || {};
    const {
      isPeriodGrowthDataType
    } = this.state;
    const currentChartData = growthData[isPeriodGrowthDataType ? 'periodGrowth' : 'monthGrowth'] || [];
    let measurement = _lib_constants__WEBPACK_IMPORTED_MODULE_7__["defaultData"].measurements.find(_ => _.id === measurementId) || {};
    measurement = measurement || {};
    const lineChartData = {
      name: 'Growth',
      dataSet: currentChartData.map(_ => _.growthPercent)
    };
    const barChartData = {
      name: measurement.name,
      dataSet: currentChartData.map(_ => _.total),
      events: {
        click: [{
          columnIndex: currentChartData.length - 1,
          callBack: () => {
            this.setState({
              isPeriodGrowthDataType: false
            });
          }
        }]
      }
    };
    const labels = currentChartData.map(_ => _.time);
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_charts_GrowthChart__WEBPACK_IMPORTED_MODULE_5__["default"], {
      getStyle: this._getStyleGrowthChart,
      currentMeasuremnent: measurement.name,
      barChartData: barChartData,
      lineChartData: lineChartData,
      labels: labels,
      showBackIcon: !this.state.isPeriodGrowthDataType,
      backToDefaultChart: () => this.setState({
        isPeriodGrowthDataType: true
      })
    });
  }

  render() {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "child-tab overview-tab",
      style: _lib_service__WEBPACK_IMPORTED_MODULE_8__["generalService"].getScrollTabStyle()
    }, this._renderBoxInfoMeasureList(), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-major-list"
    }, this._renderTopChangeTableList()), this._renderGrowthChart());
  }

}

function mapDispatchToProps(dispatch) {
  return Object(redux__WEBPACK_IMPORTED_MODULE_1__["bindActionCreators"])(Object.assign({}, {
    setAnalyticData: _actions_analyticDataAction__WEBPACK_IMPORTED_MODULE_9__["setAnalyticData"]
  }), dispatch);
}

function mapStateToProps(state) {
  const {
    selectedBaseCurrency,
    selectedMeasurement,
    analyticData,
    selectedComparePeriods
  } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    selectedComparePeriods,
    analyticData
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(OverviewTab));

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

/***/ })

}]);
//# sourceMappingURL=performanceDashboard.chunk.js.map