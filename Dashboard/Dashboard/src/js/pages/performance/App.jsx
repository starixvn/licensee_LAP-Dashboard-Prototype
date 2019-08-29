import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { ActionCreators } from './actions/index'
import { connect } from 'react-redux';
class PerformanceDashboard extends Component {
  constructor(props) {
    super(props);
    }

  componentDidMount() {
    this.props.getCurrencyInfo();
  }

  render() {
    return (
      <div>
        <h1>Performance Dashboard</h1>
        <select

          onChange={(e) => this.props.setBaseCurrency(e.target.value)}
          value={this.props.selectedBaseCurrency}>
          {this.props.currencyInfo.BaseCurrency.map((item, i) => {
            return <option key={"base_c" + i} value={item}>{item}</option>
          })}
        </select>
      </div >
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, state);
}
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceDashboard)
