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

  onChangeBaseCurrency = e => {
    this.props.setBaseCurrency(e.target.value);
  }

  onChangeMeasurement = e => {
    const value = defaultData.measurements.find(_ => _.id == e.target.value);
    this.props.setMeasurement(value);
  }

  onSubmit = () => {
    alert('submit')
  }

  render() {
    const { langCode } = this.props;

    return (
      <div className="filter-top-panel">
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "date")}</div>
          <input type="date"></input>
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "Based")}</div>
          <select
            onChange={this.onChangeBaseCurrency}
            value={this.props.selectedBaseCurrency}>
            {this.props.currencyInfo.BaseCurrency.map((item, i) => {
              return <option key={i} value={item}>{item}</option>
            })}
          </select>
        </div>
        <div className="filter-item">
          <div className="label">{languageApi.getRes(langCode, "measurement")}</div>
          <select
            onChange={this.onChangeMeasurement}
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
