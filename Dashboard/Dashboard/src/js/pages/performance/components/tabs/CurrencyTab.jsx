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
  const { getCurrencyInfo, setBaseCurrency, setMeasurement } = ActionCreators;
  return bindActionCreators({  getCurrencyInfo, setBaseCurrency, setMeasurement }, dispatch);
}

function mapStateToProps(state) {
  const { ...rest } = state;
  return Object.assign({}, rest );
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTab);
