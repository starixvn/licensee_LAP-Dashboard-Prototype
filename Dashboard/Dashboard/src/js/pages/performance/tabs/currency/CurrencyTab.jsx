import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { setAnalyticData } from '../../actions/analyticDataAction';
import currencyTabAction from '../currency/actions/index';
import { connect } from 'react-redux';
import DistributionChart from '../../components/charts/DistributionChart';
import OverallChart from '../../components/charts/OverallChart';
import GrowthChart from '../../components/charts/GrowthChart';
import ComparisonTable from '../../components/normal/ComparisonTable';
import { defaultData, MEASUREMENT_ID } from '../../lib/constants';
import { growthChartConsts } from './lib/constants';
import { getDiffenrenceTableData, getDistributionChartData, getFilterDataMonthGrowth, getOverallChartData } from './lib/service';
import { generalService } from '../../lib/service';

export class CurrencyTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPeriodGrowthDataType: true,
      selectedDrillDownDataset: 0,
      selectedDrillDownCurrency: {}
    }
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  componentDidUpdate(prevProps) {
    const { isPeriodGrowthDataType } = this.state;
    if(this.props.analyticData !== prevProps.analyticData && !isPeriodGrowthDataType) {
      this.setState({
        isPeriodGrowthDataType: true
      })
    }
  }

  _renderDifferenceTable() {
    const { measurementDifferenceData } = this.props.analyticData;
    if (!measurementDifferenceData) {
      return null;
    }
    const tableData = getDiffenrenceTableData(measurementDifferenceData);
    return <ComparisonTable
      {...tableData}
    />;
  }

  _renderDistributionChart() {
    const { distributionData, topDistributions, measurementId } = this.props.analyticData;
    if (!distributionData) {
      return null;
    }
    const measurement = defaultData.measurements.find(_ => _.id === measurementId) || {};
    const title = measurement.name + ' Distribution - Top 5 Currencies';
    return <DistributionChart
      distributionData={distributionData}
      topDistributions={topDistributions}
      title={title}
      dataMapper={getDistributionChartData}
    />
  }

  _renderOverallChart() {
    const { overallMarginData } = this.props.analyticData;
    if (!overallMarginData) {
      return null;
    }
    return <OverallChart
      title={'Overall margin growth'}
      overallData={overallMarginData}
      dataMapper={getOverallChartData}
    />
  }

  _renderGrowthChart() {
    const { measurementId } = this.props.analyticData;
    const measurement = defaultData.measurements.find(_ => _.id === measurementId) || {};
    const { isPeriodGrowthDataType, selectedDrillDownCurrency, selectedDrillDownDataset } = this.state;

    const growthChartData = this._getGrowthChartData() || [];
    const lineChartData = {
      name: 'Growth',
      dataSet: growthChartData.map(_ => _.growthPercent)
    };
    const barChartData = this._getBarChartData(growthChartData, measurement);
    const labels = growthChartData.map(_ => _.name);
    const title = `${measurement.name} Comparison${isPeriodGrowthDataType ? '' :
      ` - ${selectedDrillDownCurrency.name} - ${growthChartConsts[selectedDrillDownDataset].periodName}`}`;

    return <GrowthChart
      title={title}
      barChartData={barChartData}
      lineChartData={lineChartData}
      labels={labels}
      leftAxisName={measurement.name}
      showBackIcon={!isPeriodGrowthDataType}
      backToDefaultChart={() => this.setState({ isPeriodGrowthDataType: true })}
    />;
  }

  _getGrowthChartData() {
    const { isPeriodGrowthDataType } = this.state;
    const { analyticData } = this.props;
    const { growthData } = analyticData;

    if (isPeriodGrowthDataType) {
      return growthData['periodGrowth'];
    } else {
      const field = this._getDrillDownField();
      const drillDownData = growthData['monthGrowth'][field];
      return drillDownData;
    }
  }

  _getDrillDownField() {
    const { selectedDrillDownCurrency, selectedDrillDownDataset } = this.state;
    const { analyticData } = this.props;

    const selectedPeriod = analyticData[growthChartConsts[selectedDrillDownDataset]['periodField']];
    const field = generalService.getFieldMonthGrowth(selectedDrillDownCurrency.name, selectedPeriod);
    return field;
  }

  _getBarChartData(growthChartData, measurement) {
    const { isPeriodGrowthDataType, selectedDrillDownCurrency, selectedDrillDownDataset } = this.state;
    if (isPeriodGrowthDataType) {
      return growthChartConsts.map((_, datasetIndex) => {
        return {
          name: _.periodName,
          dataSet: growthChartData.map(__ => __[_.periodFieldName]),
          events: {
            click: growthChartData.map((periodData, colIndex) => {
              const drillDownCurrency = {
                id: periodData.id,
                name: periodData.name,
                distributions: periodData[_.distributionFieldName]
              }
              return {
                columnIndex: colIndex,
                callBack: () => {
                  this.setState({
                    isPeriodGrowthDataType: false,
                    selectedDrillDownDataset: datasetIndex,
                    selectedDrillDownCurrency: drillDownCurrency,
                  }, this._handleDrillDownGrowthChart)
                }
              }
            })
          }
        }
      })
    } else {
      return [{
        name: selectedDrillDownCurrency.name + ' ' + measurement.name,
        dataSet: growthChartData.map(_ => _.total),
        color: growthChartConsts[selectedDrillDownDataset].columnColor
      }, { hidden: true, dataSet: [] }];
    }
  }


  _handleDrillDownGrowthChart() {
    const { selectedDrillDownCurrency, selectedDrillDownDataset } = this.state;
    const { analyticData } = this.props;
    const { growthData } = analyticData;

    const selectedPeriod = analyticData[growthChartConsts[selectedDrillDownDataset]['periodField']];
    const field = generalService.getFieldMonthGrowth(selectedDrillDownCurrency.name, selectedPeriod);
    const drillDownData = growthData['monthGrowth'][field];
    if (!drillDownData) {
      const filterData = getFilterDataMonthGrowth({ analyticData, selectedPeriod, selectedCurrency: selectedDrillDownCurrency });
      this.props.getDrillDownData(filterData, field);
    }
  }

  render() {
    const { measurementId } = this.props.analyticData;
    return measurementId ? (
      <div className="child-tab currency-tab" style={generalService.getScrollTabStyle()}>
        <div className="side-tab-left">
        {measurementId === MEASUREMENT_ID.MARGIN ? this._renderOverallChart() : this._renderDistributionChart()}
        {this._renderDifferenceTable()}
        </div>
        <div className="side-tab-right">
        {this._renderGrowthChart()}
        </div>
      </div>
    ) : null;
  }
}

function mapDispatchToProps(dispatch) {
  const { getDrillDownData } = currencyTabAction;
  return bindActionCreators({
    setAnalyticData,
    getDrillDownData
  }, dispatch);
}

function mapStateToProps(state) {
  const { analyticData } = state;
  return Object.assign({}, {
    analyticData
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTab);
