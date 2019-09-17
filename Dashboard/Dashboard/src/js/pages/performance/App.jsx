import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { ActionCreators } from './actions'
import { connect } from 'react-redux';
import FilterTopPanel from './components/FilterTopPanel';
import TabContainer from "./components/TabContainer";

class PerformanceDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpdate: true
    }
  }

  componentDidMount() {
  }


  render() {
    return (
      <div className="performance-container">
          <FilterTopPanel onSubmit={null}/>
          <TabContainer />
      </div >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrencyInfo: ActionCreators.getCurrencyInfo,
    setBaseCurrency: ActionCreators.setBaseCurrency
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    currencyInfo: state.currencyInfo
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceDashboard)
