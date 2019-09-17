import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../../components/normal/BoxInfoMeasureList';
import TableMajorChangeItem from '../../components/normal/TableMajorChangeItem';
import GrowthChart from '../../components/charts/GrowthChart';
import TimeComparisonSelect from '../../components/normal/TimeComparisonSelect';
import ValueChangeIcon from '../../components/normal/ValueChangeIcon';

import { majorChangeList, ComparisonType } from '../../lib/constants';
import overviewActions from './actions';

import { overviewService  } from '../../lib/service';


const majorChangeData = {
  data: [{ name: 'MYR', totalValue: 1235, changeValue: 5 },
  { name: 'THB', totalValue: 1235, changeValue: 5 },
  { name: 'USD', totalValue: 91231239, changeValue: 0 },
  { name: 'CNY', totalValue: 91231239, changeValue: -5 },
  { name: 'INH', totalValue: 91231239, changeValue: 5 }
  ]
}

class OverviewTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedComparison: {
        type: ComparisonType.PREVIOUS_PERIOD,
        value: null
      }
    }
  }

  componentDidMount() {
    var filterData = overviewService.getFilterData(this.props);
    this.props.getPerformanceOverviewTotal(filterData);
    this.props.getPerformanceOverviewTopChange(filterData);
  }

  onChangeComparison = value => {
    this.setState({
      selectedComparison: value
    })
  }

  renderMajorChangeTableList() {
    return majorChangeList.map(_ => <TableMajorChangeItem
      {...{ ..._, ...majorChangeData }}
      renderRow={item => <tr key={item.name}>
        <td><ValueChangeIcon value={item.changeValue} />{item.name}</td>
        <td>{item.totalValue}</td>
        <td>{item.changeValue + '%'}</td>
      </tr>}
    />)
  }

  renderBoxInfoMeasureList() {
    return <BoxInfoMeasureList items={this.props.performanceOverviewTotal} />
  }

  render() {
    return (
      <div className="overview-tab">
        {<TimeComparisonSelect onChangeComparison={this.onChangeComparison}
          selectedDateRange={this.props.selectedDateRange}
          selectedComparison={this.state.selectedComparison} />}
        {this.renderBoxInfoMeasureList()}
        <div className="table-major-list">
          {this.renderMajorChangeTableList()}
        </div>
        <GrowthChart currentMeasuremnent={this.props.selectedMeasurement.name} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { getPerformanceOverviewTotal, getPerformanceOverviewTopChange } = overviewActions;
  return bindActionCreators(Object.assign({},
  {
    getPerformanceOverviewTotal,
    getPerformanceOverviewTopChange
  }), dispatch);
}

function mapStateToProps(state) {
  const { selectedBaseCurrency, selectedMeasurement, selectedDateRange, performanceOverviewTotal, performanceOverviewTopChange } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    performanceOverviewTotal,
    performanceOverviewTopChange
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
