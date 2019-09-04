import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import languageApi from '../../../lib/languageApi';
import { connect } from 'react-redux';
import { defaultData } from '../lib/constants'

class FilterTopPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  onChangeBaseCurrency = value => {
    this.props.setBaseCurrency(value);
  }

  onChangeMeasurement = e => {
    this.props.setMeasurement(e);
  }

  render() {
    const { langCode } = this.props;

    return (
      <div className="filter-top-panel">
        <div className="filter-item">
          <label className="label">{languageApi.getRes(langCode, "date")}</label>
        </div>
        <div className="filter-item">
          <label className="label">{languageApi.getRes(langCode, "Based")}</label>
          <select
            onChange={this.onChangeBaseCurrency}
            value={this.props.selectedBaseCurrency.id}>
            {this.props.currencyInfo.BaseCurrency.map((item, i) => {
              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="filter-item">
          <label className="label">{languageApi.getRes(langCode, "measurement")}</label>
          <select
            onChange={this.onChangeMeasurement}
            value={this.props.selectedMeasurement.id}>
            {defaultData.measurements.map((item, i) => {
              return <option key={item.id} value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrencyInfo: ActionCreators.getCurrencyInfo,
    setBaseCurrency: ActionCreators.setBaseCurrency,
    setMeasurement: ActionCreators.setMeasurement
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement,
    currencyInfo: state.currencyInfo,
    measurements: state.measurements
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterTopPanel)
