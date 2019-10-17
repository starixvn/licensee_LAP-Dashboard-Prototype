import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../../components/normal/BoxInfoMeasureList';
import TableMajorChangeItem from '../../components/normal/TableMajorChangeItem';
import GrowthChart from '../../components/charts/GrowthChart';
import ValueChangeIcon from '../../components/normal/ValueChangeIcon';

import { getMajorChangeList } from '../../lib/constants';
import { generalService } from '../../lib/service';
import { setAnalyticData } from '../../actions/analyticDataAction';
import { defaultData } from '../../lib/constants';
import numberFormat from '../../../../lib/numberFormat';

class OverviewTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPeriodGrowthDataType: true
    };
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  _renderTopChangeTableList() {
    let { topChangeData, measurementId } = this.props.analyticData;
    const majorChangeList = getMajorChangeList(measurementId)

    return topChangeData && majorChangeList.map(_ => <TableMajorChangeItem
      key={'major_change_table_' + _.key}
      {...{
        ..._,
        ...{
          data: topChangeData[_.key]
        }
      }}
      renderRow={(item, index) => <tr key={`major_change_row_${index}_${item.perspectiveName}`}>
        <td><ValueChangeIcon value={item.changePercent} />{item.perspectiveName}</td>
        <td>{numberFormat.formatDecimal(item.total)}</td>
        <td>{item.changePercent + '%'}</td>
      </tr>}
    />);
  }

  _renderBoxInfoMeasureList() {
    let { summaryData, baseCurrency } = this.props.analyticData;
    summaryData = summaryData || [];
    return <BoxInfoMeasureList data={summaryData} currencyUnit={baseCurrency} />;
  }

  _renderGrowthChart() {
    let { growthData, measurementId } = this.props.analyticData;
    if(!measurementId)
      return null;

    growthData = growthData || {};

    const { isPeriodGrowthDataType } = this.state;
    const currentChartData = growthData[isPeriodGrowthDataType ? 'periodGrowth' : 'monthGrowth'] || [];

    let measurement = defaultData.measurements.find(_ => _.id === measurementId) || {};
    measurement = measurement || {};

    const lineChartData = {
      name: 'Growth',
      dataSet: currentChartData.map(_ => _.growthPercent)
    };

    const barChartData = {
      name: measurement.name,
      dataSet: currentChartData.map(_ => _.total),
      events: {
        click: [
          {
            columnIndex: currentChartData.length - 1,
            callBack: () => {
              this.setState({
                isPeriodGrowthDataType: false
              })
            }
          }
        ]
      }
    };

    const labels = currentChartData.map(_ => _.time);

    return <GrowthChart
    getStyle={this._getStyleGrowthChart}
    currentMeasuremnent={measurement.name}
    barChartData={barChartData}
    lineChartData={lineChartData}
    labels={labels}
    showBackIcon={!this.state.isPeriodGrowthDataType}
    backToDefaultChart={() => this.setState({ isPeriodGrowthDataType: true })}
    />;
  }

  _getStyleGrowthChart = (refSelf) => {
    const { current } = refSelf;
    if(current) {
      const { offsetLeft } = current;
      const { innerWidth } = window;
      const width = offsetLeft < 30  ? innerWidth - 60 : innerWidth - 710;
      return {
        width: width + 'px'
      }
    } else {
      return {}
    }
  }

  render() {
    return (
      <div className="child-tab overview-tab" style={generalService.getScrollTabStyle()}>
        {this._renderBoxInfoMeasureList()}
        <div className="table-major-list">
          {this._renderTopChangeTableList()}
        </div>
        {this._renderGrowthChart()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {
    setAnalyticData
  }), dispatch);
}

function mapStateToProps(state) {
  const { selectedBaseCurrency, selectedMeasurement, analyticData, selectedComparePeriods } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    selectedComparePeriods,
    analyticData
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
