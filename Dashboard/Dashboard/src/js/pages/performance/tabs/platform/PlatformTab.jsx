import React from 'react';
import { bindActionCreators } from 'redux';
import { setAnalyticData } from '../../actions/analyticDataAction';
import { connect } from 'react-redux';
import { MEASUREMENT_ID } from '../../lib/constants';
import { generalService } from '../../lib/service';
import PerformanceChildTab from '../PerformanceChildTab';
import { titleDistributionChart, titleOverallMarginChart } from './lib/constants';

class PlatformTab extends PerformanceChildTab {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      ...{}
    }
    this.titleDistributionChart = titleDistributionChart;
  }

  _getDistributionChartData() {
    const { distributionData, topDistributions, measurementId } = this.props.analyticData;
    return {
      distributionData,
      topDistributions,
      measurementId
    }
  }

  _getOverallChartData() {
    const { overallMarginData } = this.props.analyticData;
    return {
      overallMarginData,
      title: titleOverallMarginChart
    }
  }

  _getDifferenceTableData() {
    const { measurementDifferenceData } = this.props.analyticData;
    return {
      measurementDifferenceData
    }
  }

  _getGrowthChartData() {
    const { growthData, measurementId } = this.props.analyticData;
    return {
      growthData,
      measurementId
    }
  }

  render() {
    const { measurementId } = this.props.analyticData;
    return measurementId ? (
      <div className="child-tab platform-tab" style={generalService.getScrollTabStyle()}>
        <div className="side-tab-left">
        {measurementId === MEASUREMENT_ID.MARGIN ? this.renderOverallChart() : this.renderDistributionChart()}
        {this.renderDifferenceTable()}
        </div>
        <div className="side-tab-right">
        {this.renderGrowthChart()}
        </div>
      </div>
    ) : null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAnalyticData
  }, dispatch);
}

function mapStateToProps(state) {
  const { analyticData } = state;
  return Object.assign({}, {
    analyticData
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(PlatformTab);
