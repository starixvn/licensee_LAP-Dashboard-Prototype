import React from 'react';
import datetimeFormat from '../lib/datetimeFormat';
import MonthPicker from "@9softstudio/react-monthpicker";
import PropTypes from 'prop-types';
import { YearSelector, MonthList } from "@9softstudio/react-monthpicker";

const defaultFormatFunc = (month, year) => {
  return `${month < 10 ? '0' + month : month}/${year}`
}
export default class MonthRangePicker extends React.Component {
  constructor(props) {
    super(props);

    const { open, selectedDropdownYear, selectedMonth, selectedYear } = this.props;
    const now = new Date();

    const initialYear = selectedDropdownYear || now.getFullYear();

    this.state = {
      open,
      selectedDropdownYear: initialYear,
      selectedYear: selectedYear || initialYear,
      selectedMonth: selectedMonth ? selectedMonth - 1 : now.getMonth()
    }

    this.container = React.createRef();
    this.currentRange = {
      selectedDropdownYear: this.state.initialYear,
      selectedYear: this.state.selectedYear,
      selectedMonth: this.state.selectedMonth
    }
  }

  static propTypes = {
    open: PropTypes.bool,
    minMonth: PropTypes.number,
    minYear: PropTypes.number,
    maxMonth: PropTypes.number,
    maxYear: PropTypes.number,
    monthNames: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    hasRange: PropTypes.bool,
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
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutSide, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutSide, true);
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedDropdownYear, selectedMonth, selectedYear } = this.props;

    if (selectedMonth !== prevProps.selectedMonth ||
      selectedYear !== prevProps.selectedYear ||
      selectedDropdownYear !== prevProps.selectedDropdownYear) {
      this.setState({
        selectedYear: selectedDropdownYear,
        selectedMonth: selectedMonth - 1,
        selectedDropdownYear
      });
    }
  }

  toggle = () => {
    if (this.props.enable) {
      this.setState((prevState) => ({
        open: !prevState.open
      }));
    }
  }

  handleChangeYear = (selectedValue) => {
    this.setState({ selectedDropdownYear: selectedValue });
  }

  handleSelectMonth = (selectedValue) => {
    const { selectedDropdownYear } = this.state;
    this.setState({
      selectedMonth: selectedValue,
      selectedYear: selectedDropdownYear
    });
  }

  handleClickOutSide = (event) => {
    const containerElement = this.container.current;
    const clickOutside = containerElement && !containerElement.contains(event.target);

    if (clickOutside && this.state.open) {
      this.setState({ open: false });
    }
  }

  _onChangeMonthRange = () => {
    const { selectedDropdownYear } = this.state;
    this.setState({
      selectedMonth: selectedValue,
      selectedYear: selectedDropdownYear,
      open: false
    }, () => this.props.onSelect(selectedValue + 1, selectedDropdownYear));
  }

  _cancel = () => {
    this.setState({
      open: false
    })
  }

  saveCurrentRange() {
    this.currentRange = {
      selectedDropdownYear: this.state.initialYear,
      selectedYear: this.state.selectedYear,
      selectedMonth: this.state.selectedMonth
    }
  }

  render() {
    const { open, selectedDropdownYear, selectedYear, selectedMonth } = this.state;
    let { monthNames, hasRange, minMonth, minYear, maxMonth, maxYear, isReadonly, onFormat, iconElement, enable } = this.props;
    const displayText = onFormat(selectedMonth + 1, selectedYear) + '  -  ' + onFormat(selectedMonth + 1, selectedYear);
    const inputClassName = enable ? 'mp-form-container' : 'mp-form-container disable';

    return (
      <div className="rmp-main-container ">
        <div className={inputClassName} onClick={this.toggle}>
          <input type="text" className="mp-form-input" value={displayText} readOnly={isReadonly} />
          {iconElement}
        </div>
        <div className="range-mp-container" style={{ display: open ? 'block' : 'none' }} ref={this.container}>
          <div className="quick-selection-container">
            <div class="quick-selection">Previous Period</div>
            <div class="quick-selection">Previous Year</div>
            <div>
              <button className="rdr-Button rdr-ApplyButton" onClick={this._onChangeMonthRange}>OK</button>
              <button className="rdr-Button rdr-CancelButton" onClick={this._cancel}>Cancel</button>
            </div>
          </div>
          <div className="mp-container" >
            <YearSelector minYear={minYear} maxYear={maxYear} selectedDropdownYear={selectedDropdownYear} onSelect={this.handleChangeYear} />
            <MonthList monthNames={monthNames} hasRange={hasRange}
              selectedDropdownYear={selectedDropdownYear} selectedMonth={selectedMonth} selectedYear={selectedYear}
              minMonth={minMonth} minYear={minYear} maxMonth={maxMonth} maxYear={maxYear}
              onSelect={this.handleSelectMonth} />
          </div>
          <div className="mp-container">
            <YearSelector minYear={minYear} maxYear={maxYear} selectedDropdownYear={selectedDropdownYear} onSelect={this.handleChangeYear} />
            <MonthList monthNames={monthNames} hasRange={hasRange}
              selectedDropdownYear={selectedDropdownYear} selectedMonth={selectedMonth} selectedYear={selectedYear}
              minMonth={minMonth} minYear={minYear} maxMonth={maxMonth} maxYear={maxYear}
              onSelect={this.handleSelectMonth} />
          </div>
        </div>
      </div>
    )
  }
}
