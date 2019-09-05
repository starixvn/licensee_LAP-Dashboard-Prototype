import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../normal/BoxInfoMeasureList';

class OverviewTab extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="overview-tab">
        <BoxInfoMeasureList items={[
            {measurementName: 'Turnover', totalValue: 'EUR 123,59k', changeValue: -5},
            {measurementName: 'Win Loss', totalValue: 'EUR 123,59k', changeValue: 5},
            {measurementName: 'Margin', totalValue: '3%', changeValue: 23},
          ]} />
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

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
