import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { ActionCreators } from './actions'
import { connect } from 'react-redux';
import FilterTopPanel from './components/FilterTopPanel';
import TabContainer from './components/TabContainer';
import Loader from '../../components/Loader';
import { generalService } from '../performance/lib/service';

class PerformanceDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const { currentChildTabKey, selectedComparePeriods, selectedBaseCurrency, selectedMeasurement } = this.props;
    const filterData = generalService.getFilterData({ selectedComparePeriods, selectedBaseCurrency, selectedMeasurement });
    this.props.getAnalyticData(filterData, currentChildTabKey);
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="performance-container">
          <Loader isLoading={isLoading} widgetKey={this.props.widgetKey} />
          <FilterTopPanel />
          <TabContainer />
      </div >
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { getAnalyticData } = ActionCreators;
  return bindActionCreators({
    getAnalyticData
  }, dispatch);
}

function mapStateToProps(state) {
  const { isLoading, currentChildTabKey, selectedComparePeriods, selectedBaseCurrency, selectedMeasurement } = state;
  return Object.assign({}, {
    isLoading,
    currentChildTabKey,
    selectedComparePeriods,
    selectedBaseCurrency,
    selectedMeasurement
  });
}
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceDashboard)
