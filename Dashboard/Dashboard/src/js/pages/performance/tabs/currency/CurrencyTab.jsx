import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { setAnalyticData } from '../../actions/analyticDataAction';
import currencyTabAction from '../currency/actions/index';
import { connect } from 'react-redux';
import DistributionChart from '../../components/charts/DistributionChart';
import GrowthChart from '../../components/charts/GrowthChart';
import ValueChangeIcon from '../../components/normal/ValueChangeIcon';
import TableMajorChangeItem from '../../components/normal/TableMajorChangeItem';
import { defaultData } from '../../lib/constants';
import { convertPeriodToMetaModel } from '../../lib/service';
import { growthChartConsts } from '../currency/lib/constants';

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

  _renderDifferencePeriodBoard() {
    return <TableMajorChangeItem
      key={'major_change_table_'}
      {...{
        title: 'MAJOR CHANGES - By CURRENCY',
        header: ['Difference', 'THB', 'KRW', "USD", 'SGD', 'THB'],
        data: [{
          "perspectiveName": "Tablet",
          "total": 128728.23,
          "changePercent": 4428620.25
        }, {
          "perspectiveName": "Tablet",
          "total": 128728.23,
          "changePercent": 4428620.25
        }, {
          "perspectiveName": "Tablet",
          "total": 128728.23,
          "changePercent": 4428620.25
        }]
      }}
      renderRow={(item, index) => <tr key={`major_change_row_${index}_${item.perspectiveName}`}>
        <td>{item.perspectiveName}</td>
        <td><ValueChangeIcon value={item.changePercent} />{item.perspectiveName}</td>
        <td><ValueChangeIcon value={item.changePercent} />{item.perspectiveName}</td>
        <td><ValueChangeIcon value={item.changePercent} />{item.perspectiveName}</td>
        <td><ValueChangeIcon value={item.changePercent} />{item.perspectiveName}</td>
        <td><ValueChangeIcon value={item.changePercent} />{item.perspectiveName}</td>
      </tr>}
    />;
  }

  _renderDistributionChart() {
    const { analyticData } = this.props;

    const barChartData = [
      {
        name: 'USD',
        dataSet: [-30, 50]
      },
      {
        name: 'SGD',
        dataSet: [70, 10]
      },
      {
        name: 'HKD',
        dataSet: [10, 30]
      },
      {
        name: 'THB',
        dataSet: [10, 10]
      }
    ]

    const labels = ['Current', 'Previous ']
    return <DistributionChart
      title={'Turnover Distribution'}
      barChartData={barChartData}
      labels={labels}
    />
  }

  _renderGrowthChart() {
    const { measurementId } = this.props.analyticData;
    if (!measurementId)
      return null;

    const measurement = defaultData.measurements.find(_ => _.id === measurementId) || {};
    const { isPeriodGrowthDataType, selectedDrillDownCategory, selectedDrillDownDataset } = this.state;

    const growthChartData = this._getGrowthChartData();
    if(!growthChartData)
      return null;

    const labels = growthChartData.map(_ => _.category);

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
      let drillDownData = growthData['monthGrowth'][field];
      return drillDownData;
    }
  }

  _getDrillDownField() {
    const { selectedDrillDownCategory, selectedDrillDownDataset } = this.state;
    const { analyticData } = this.props;

    const period = analyticData[growthChartConsts[selectedDrillDownDataset]['periodField']];
    const parsedPeriod = convertPeriodToMetaModel(period);
    const field = selectedDrillDownCategory + '_' + parsedPeriod.fromMonth + '_' + parsedPeriod.toMonth;

    return field;
  }

  _getBarChartData(growthChartData, labels, measurement) {
    const { isPeriodGrowthDataType, selectedDrillDownCategory, selectedDrillDownDataset } = this.state;
    const { growthData } = this.props.analyticData;

    if(isPeriodGrowthDataType) {
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
                  }, () => {
                    const field = this._getDrillDownField();
                    let drillDownData = growthData['monthGrowth'][field];
                    if(!drillDownData) {
                      this.props.getDrillDownData({}, field);
                    }
                  })
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
      }, { hidden: true }];
    }
  }

  render() {
    return (
      <div className="child-tab currency-tab">
        <div className="side-tab-left">
          {this._renderGrowthChart()}
        </div>
        <div className="side-tab-right">
          {this._renderDifferencePeriodBoard()}
          {this._renderDistributionChart()}
        </div>
      </div>
    );
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
