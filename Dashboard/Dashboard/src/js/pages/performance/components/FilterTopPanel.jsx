import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import languageApi from '../../../lib/languageApi';
import { connect } from 'react-redux';
import { defaultData } from '../lib/constants'
import MonthRangePicker from '../../../components/MonthRangePicker';
import { langCode } from '../../../lib/constants'
export { overviewService } from '../lib/service';

class FilterTopPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  _onChangeBaseCurrency = e => {
    this.props.setBaseCurrency(e.target.value);
  }

  _onChangeMeasurement = e => {
    const value = defaultData.measurements.find(_ => _.id == e.target.value);
    this.props.setMeasurement(value);
  }

  _onChangeMonthRange = monthRange => {
    debugger
  }

  _onSubmit = () => {
  }

  render() {
    return (
      <div className="filter-top-panel">
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "currerntPeriodPicker")}</div>
          <MonthRangePicker onChangeMonthRange={this._onChangeMonthRange}/>
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "previousPeriodPicker")}</div>
          <MonthRangePicker onChangeMonthRange={this._onChangeMonthRange}/>
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "Based")}</div>
          <select
            className="select-filter"
            onChange={(e) => this._onChangeBaseCurrency(e)}
            value={this.props.selectedBaseCurrency}>
            {this.props.currencyInfo.BaseCurrency.map((item, i) => {
              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "measurement")}</div>
          <select
            className="select-filter"
            onChange={(e) => this._onChangeMeasurement(e)}
            value={this.props.selectedMeasurement.id}>
            {defaultData.measurements.map((item, i) => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <a className="btn-submit" href="#" onClick={this.onSubmit}>{languageApi.getRes(langCode, "submit")}</a>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(

    ActionCreators, dispatch);
}

function mapStateToProps(state) {
  const { selectedBaseCurrency, selectedMeasurement, currencyInfo } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    currencyInfo
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTopPanel)
