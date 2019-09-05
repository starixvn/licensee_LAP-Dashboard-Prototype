import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { connect } from 'react-redux';

export class CurrencyTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Currency Tab
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTab);
