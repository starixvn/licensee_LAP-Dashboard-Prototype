import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { setAnalyticData } from '../../actions/analyticDataAction';
import currencyTabAction from '../currency/actions/index';
import { connect } from 'react-redux';
import DistributionChart from '../../components/charts/DistributionChart';
import GrowthChart from '../../components/charts/GrowthChart';
import ValueChangeIcon from '../../components/normal/ValueChangeIcon';
import ComparisonTable from '../../components/normal/ComparisonTable';
import { defaultData } from '../../lib/constants';
import { growthChartConsts } from './lib/constants';
import { getDiffenrenceTableData, getDistributionChartData, getFilterDataMonthGrowth } from './lib/service';
import { generalService } from '../../lib/service';

export class CurrencyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPeriodGrowthDataType: true,
      selectedDrillDownDataset: 0,
      selectedDrillDownName: null
    }
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  _renderDifferenceTable() {
    const { measurementDifferenceData } = this.props.analyticData;
    if(!measurementDifferenceData) {
      return null;
    }
    const data = getDiffenrenceTableData(measurementDifferenceData);
    return <ComparisonTable
      {...data}
      renderRow={(rowData, index) => <tr key={`table_comparison_row_${index}_${rowData}`}>
        <td><span>{rowData.name}</span></td>
        {rowData.data.map(_ => {
          const differenceDistribution = rowData.id === 3 ? _.differenceTotal : _.differenceDistribution;
          const differenceTotal = rowData.id === 3 ? null : _.differenceTotal;
          return <td>
          <div className="m-b-5 m-t-5"><ValueChangeIcon value={differenceDistribution} /><span>{differenceDistribution + '%'}</span></div>
            {differenceTotal}
          </td>
        })}
      </tr>}
    />;
  }

  _renderDistributionChart() {
    const { distributionData } = this.props.analyticData;
    if(!distributionData) {
      return null;
    }
    const { labels, stackedChartData } = getDistributionChartData(distributionData);
    return <DistributionChart
      title={'Turnover Distribution'}
      barChartData={stackedChartData}
      labels={labels}
    />
  }

  _renderGrowthChart() {
    const { measurementId } = this.props.analyticData;
    const measurement = defaultData.measurements.find(_ => _.id === measurementId) || {};
    const { isPeriodGrowthDataType, selectedDrillDownCategory, selectedDrillDownDataset } = this.state;

    const growthChartData = this._getGrowthChartData() || [];

    const labels = growthChartData.map(_ => _.name);

    const lineChartData = {
      name: 'Growth',
      dataSet: growthChartData.map(_ => _.growthPercent)
    };

    const barChartData = this._getBarChartData(growthChartData, labels, measurement);

    const title = `${measurement.name} Comparison${isPeriodGrowthDataType ? '' :
      ` - ${selectedDrillDownCategory} - ${growthChartConsts[selectedDrillDownDataset].periodName}`}`;

    return <GrowthChart
      title={title}
      barChartData={barChartData}
      lineChartData={lineChartData}
      labels={labels}
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
    const { selectedDrillDownCategory, selectedDrillDownDataset } = this.state;
    const { analyticData } = this.props;

    const selectedPeriod = analyticData[growthChartConsts[selectedDrillDownDataset]['periodField']];
    const field = generalService.getFieldMonthGrowth(selectedDrillDownCategory, selectedPeriod);
    return field;
  }

  _handleDrillDownGrowthChart() {
    const { selectedDrillDownCategory, selectedDrillDownDataset } = this.state;
    const { analyticData } = this.props;
    const { growthData } = analyticData;

    const selectedPeriod = analyticData[growthChartConsts[selectedDrillDownDataset]['periodField']];
    const field = generalService.getFieldMonthGrowth(selectedDrillDownCategory, selectedPeriod);
    const drillDownData = growthData['monthGrowth'][field];
    if (!drillDownData) {
      const filterData = getFilterDataMonthGrowth({ analyticData, selectedPeriod, selectedCurrency: selectedDrillDownCategory });
      this.props.getDrillDownData(filterData, field);
    }
  }

  _getBarChartData(growthChartData, labels, measurement) {
    const { isPeriodGrowthDataType, selectedDrillDownCategory, selectedDrillDownDataset } = this.state;
    if (isPeriodGrowthDataType) {
      return growthChartConsts.map((_, datasetIndex) => {
        return {
          name: _.periodName,
          dataSet: growthChartData.map(__ => __[_.periodFieldName]),
          events: {
            click: labels.map((__, colIndex) => {
              return {
                columnIndex: colIndex,
                callBack: () => {
                  this.setState({
                    isPeriodGrowthDataType: false,
                    selectedDrillDownDataset: datasetIndex,
                    selectedDrillDownCategory: __
                  }, this._handleDrillDownGrowthChart)
                }
              }
            })
          }
        }
      })
    } else {
      return [{
        name: selectedDrillDownCategory + ' ' + measurement.name,
        dataSet: growthChartData.map(_ => _.total),
        color: growthChartConsts[selectedDrillDownDataset].columnColor
      }, { hidden: true, dataSet: [] }];
    }
  }

  render() {
    const { measurementId } = this.props.analyticData;
    return measurementId ? (
      <div className="child-tab currency-tab" style={generalService.getScrollTabStyle()}>
        <div className="side-tab-left">
          {this._renderGrowthChart()}
        </div>
        <div className="side-tab-right">
          {this._renderDifferenceTable()}
          {this._renderDistributionChart()}
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
