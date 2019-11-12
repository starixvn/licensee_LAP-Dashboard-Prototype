import React, { PureComponent } from 'react';
import { growthChartConsts } from './constants';
import { getDiffenrenceTableData, getDistributionChartData, getOverallChartData } from './service';
import DistributionChart from '../components/charts/DistributionChart';
import OverallChart from '../components/charts/OverallChart';
import ComparisonTable from '../components/normal/ComparisonTable';
import GrowthChart from '../components/charts/GrowthChart';
import { generalService } from '../lib/service';

export default class PerformanceChildTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPeriodGrowthDataType: true,
      selectedColumnDrillDown: null
    }
    this.titleDistributionChart = '';
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  componentDidUpdate(prevProps) {
    const { isPeriodGrowthDataType } = this.state;
    if (this.props.analyticData !== prevProps.analyticData && !isPeriodGrowthDataType) {
      this.setState({
        isPeriodGrowthDataType: true
      })
    }
  }

  renderDistributionChart() {
    const { distributionData, topDistributions, measurementId } = this._getDistributionChartData();
    if (!distributionData) {
      return null;
    }
    const measurement = generalService.getMeasurementNameById(measurementId) || {};
    const title = measurement.name + ' ' + this.titleDistributionChart;
    return <DistributionChart
      distributionData={distributionData}
      topDistributions={topDistributions}
      title={title}
      dataMapper={getDistributionChartData}
    />
  }

  renderOverallChart() {
    const { overallMarginData, title } = this._getOverallChartData();
    if (!overallMarginData) {
      return null;
    }
    return <OverallChart
      title={title}
      overallData={overallMarginData}
      dataMapper={getOverallChartData}
    />
  }

  renderDifferenceTable() {
    const { measurementDifferenceData } = this._getDifferenceTableData();
    if (!measurementDifferenceData) {
      return null;
    }
    const tableData = getDiffenrenceTableData(measurementDifferenceData);
    return <ComparisonTable
      {...tableData}
    />;
  }

  renderGrowthChart() {
    const { growthData, measurementId } = this.props.analyticData;
    if (!growthData) {
      return null;
    }
    const measurement = generalService.getMeasurementNameById(measurementId) || {};
    const { isPeriodGrowthDataType, selectedColumnDrillDown } = this.state;

    const growthChartData = this._getGrowthChartData() || [];
    const lineChartData = {
      name: 'Growth',
      dataSet: growthChartData.map(_ => _.growthPercent)
    };
    const barChartData = this._getBarChartData(growthChartData, measurement);
    const labels = growthChartData.map(_ => _.name);
    const title = `${measurement.name} Comparison${isPeriodGrowthDataType ? '' :
      ` - ${selectedColumnDrillDown.name} - ${growthChartConsts[selectedColumnDrillDown.datasetIndex].periodName}`}`;

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

  _getDrillDownField() {
    const { selectedColumnDrillDown } = this.state;
    const { datasetIndex, id } = selectedColumnDrillDown;
    const { analyticData } = this.props;

    const selectedPeriod = analyticData[growthChartConsts[datasetIndex]['periodField']];
    const field = generalService.getFieldMonthGrowth(id, selectedPeriod);
    return field;
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

  _getBarChartData(growthChartData, measurement) {
    const { isPeriodGrowthDataType, selectedColumnDrillDown } = this.state;
    if (isPeriodGrowthDataType) {
      return growthChartConsts.map((_, datasetIndex) => {
        return {
          name: _.periodName,
          dataSet: growthChartData.map(__ => __[_.periodFieldName]),
          events: {
            click: growthChartData.map((periodData, colIndex) => {
              const drillDownData = {
                id: periodData.id,
                name: periodData.name,
                distributions: periodData[_.distributionFieldName],
                datasetIndex
              }
              return {
                columnIndex: colIndex,
                callBack: () => {
                  this.setState({
                    isPeriodGrowthDataType: false,
                    selectedColumnDrillDown: drillDownData
                  })
                }
              }
            })
          }
        }
      })
    } else {
      return [{
        name: selectedColumnDrillDown.name + ' ' + measurement.name,
        dataSet: growthChartData.map(_ => _.total),
        color: growthChartConsts[selectedColumnDrillDown.datasetIndex].columnColor
      }, { hidden: true, dataSet: [] }];
    }
  }
}
