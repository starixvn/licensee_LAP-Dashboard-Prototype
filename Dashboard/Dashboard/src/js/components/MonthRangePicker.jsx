import React from 'react';
import PropTypes from 'prop-types';
import { YearSelector, MonthList } from '@9softstudio/react-monthpicker';
import { getPreviousPeriod } from '../lib/dateTimeHelper';

const defaultFormatFunc = (month, year) => {
  return `${month < 10 ? '0' + month : month}/${year}`
}

const getMaxYearTo = ({ year, month}, range, maxYear) => {
  let maxDate = new Date(year, month + 1);
  maxDate = new Date(maxDate.setMonth(maxDate.getMonth() + range - 1));
  let maxYearTo = maxDate.getFullYear();
  return  maxYearTo < maxYear ? maxYearTo : maxYear;
}

const getMaxMonthTo = (month, range) => {
  const result =  (month + range - 1) % 12 || -1;
  return result;
}


export default class MonthRangePicker extends React.Component {
  constructor(props) {
    super(props);
    const { open, selectedDropdownYear, selectedMonth, selectedYear } = this.props;
    const now = new Date();
    const initialYear = selectedDropdownYear || now.getFullYear();
    this.state = {
      open: open,
      from: {
        dropdownYear: selectedYear || initialYear,
        year: selectedYear || initialYear,
        month: selectedMonth ? selectedMonth - 1 : now.getMonth()
      },
      to: {
        dropdownYear: selectedYear || initialYear,
        year: selectedYear || initialYear,
        month: selectedMonth ? selectedMonth - 1 : now.getMonth()
      }
    }
    this.container = React.createRef();
  }

  static propTypes = {
    open: PropTypes.bool,
    minMonth: PropTypes.number,
    minYear: PropTypes.number,
    maxMonth: PropTypes.number,
    maxYear: PropTypes.number,
    monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    hasRange: PropTypes.bool,
    range: PropTypes.number,
    selectedDropdownYear: PropTypes.number,
    selectedMonth: PropTypes.number,
    onSelect: PropTypes.func,
    onFormat: PropTypes.func,
    isReadonly: PropTypes.bool,
    iconElement: PropTypes.any,
    enable: PropTypes.bool
  }

  static defaultProps = {
    open: false,
    onSelect: () => { },
    onFormat: defaultFormatFunc,
    isReadonly: true,
    enable: true,
    minYear: new Date().getFullYear() - 5,
    maxYear: new Date().getFullYear(),
    hasRange: true,
    range: 12,
  }

  componentDidMount() {
    document.addEventListener('click', this._handleClickOutSide, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleClickOutSide, true);
  }

  _toggle = () => {
    if (this.props.enable) {
      this.setState(prevState => {
        !prevState.open && this._saveCurrentRange();
        return {
          open: !prevState.open
        }
      })
    }
  }

  _onChangeYearFrom = selectedYear => {
    let { from } = this.state;
    from = {
      ...from,
      ...{
        dropdownYear: selectedYear
      }
    }

    this.setState({ from });
  }

  _onChangeMonthFrom = selectedMonth => {
    let { from, to } = this.state;
    from = {
      ...from,
      ...{
        month: selectedMonth,
        year: from.dropdownYear
      }
    };

    to = {
      ...to,
      ...from
    };

    this.setState({ from, to });
  }

  _onChangeYearTo = selectedYear => {
    let { to } = this.state;
    to = {
      ...to,
      ...{
        dropdownYear: selectedYear
      }
    }
    this.setState({ to });
  }

  _onChangeMonthTo = selectedMonth => {
    let { to } = this.state;
    to = {
      ...to,
      ...{
        month: selectedMonth,
        year: to.dropdownYear
      }
    }
    this.setState({ to });
  }

  _handleClickOutSide = (event) => {
    const containerElement = this.container.current;
    const clickOutside = containerElement && !containerElement.contains(event.target);
    if (clickOutside && this.state.open) {
      this._cancel();
    }
  }

  _onConfirmChangeRange = () => {
    const { onChange } = this.props;
    const { from, to } = this.state;
    this.setState({
      open: false
    }, () => onChange && onChangeRange({ from, to }))
  }

  _cancel = () => {
    this.setState({
      ...this.currentRange,
      open: false
    })
  }

  _saveCurrentRange() {
    const { from, to } = this.state;
    this.currentRange = { from, to };
  }

  _getDisplayText() {
    const { from, to } = this.state;
    const { onFormat } = this.props;
    return `${onFormat(from.month + 1, from.year)}  -  ${onFormat(to.month + 1, to.year)}`;
  }

  _onSelectPreviousPeriod = currentPeriod => {
    getPreviousPeriod(currentPeriod)
  }

  render() {
    const { open, from, to } = this.state;
    let { monthNames, hasRange, minMonth, minYear, maxMonth, maxYear, isReadonly, iconElement, enable, range } = this.props;
    const maxYearTo = getMaxYearTo(from, range, maxYear);
    const maxMonthTo = getMaxMonthTo(from.month + 1, range);

    return (
      <div className="rmp-main-container">
        <div className={enable ? 'mp-form-container' : 'mp-form-container disable'} onClick={this._toggle}>
          <input type="text" className="mp-form-input" value={this._getDisplayText()} readOnly={isReadonly} />
          {iconElement}
        </div>
        <div className="range-mp-container" style={{ display: open ? 'block' : 'none' }} ref={this.container}>
          <div className="quick-selection-container">
            <div class="quick-selection" onClick={this._onSelectPreviousPeriod}>Previous Period</div>
            <div class="quick-selection">Previous Year</div>
            <div>
              <button className="btn btn-confirm" onClick={this._onConfirmChangeRange}>OK</button>
              <button className="btn btn-cancel" onClick={this._cancel}>Cancel</button>
            </div>
          </div>
          <div className="mp-container mp-from" >
            <YearSelector minYear={minYear} maxYear={maxYear}
              selectedDropdownYear={from.dropdownYear}
              onSelect={this._onChangeYearFrom} />
            <MonthList monthNames={monthNames} hasRange={hasRange}
              selectedDropdownYear={from.dropdownYear}
              selectedMonth={from.month} selectedYear={from.year}
              minYear={minYear} maxYear={maxYear}
              minMonth={minMonth} maxMonth={maxMonth}
              onSelect={this._onChangeMonthFrom} />
          </div>
          <div className="mp-container mp-to">
            <YearSelector minYear={from.year} maxYear={maxYearTo}
             selectedDropdownYear={to.dropdownYear}
             onSelect={this._onChangeYearTo} />
            <MonthList monthNames={monthNames} hasRange={hasRange}
              selectedDropdownYear={to.dropdownYear}
              selectedMonth={to.month} selectedYear={to.year}
              minYear={from.year} maxYear={maxYearTo}
              minMonth={from.month + 1} maxMonth={maxMonthTo}
              onSelect={this._onChangeMonthTo} />
          </div>
        </div>
      </div>
    )
  }
}


