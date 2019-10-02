import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../../components/normal/BoxInfoMeasureList';
import TableMajorChangeItem from '../../components/normal/TableMajorChangeItem';
import GrowthChart from '../../components/charts/GrowthChart';
import ValueChangeIcon from '../../components/normal/ValueChangeIcon';

import { majorChangeList } from '../../lib/constants';
import overviewActions from './actions';

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
    }
  }

  componentDidMount() {
  }

  _renderMajorChangeTableList() {
    return majorChangeList.map(_ => <TableMajorChangeItem
      {...{ ..._, ...majorChangeData }}
      renderRow={item => <tr key={item.name}>
        <td><ValueChangeIcon value={item.changeValue} />{item.name}</td>
        <td>{item.totalValue}</td>
        <td>{item.changeValue + '%'}</td>
      </tr>}
    />);
  }

  _renderBoxInfoMeasureList() {
    return <BoxInfoMeasureList items={this.props.analyticData.summary} />;
  }

  _renderGrowthChart() {
    const { analyticData } = this.props;
    return <GrowthChart currentMeasuremnent={this.props.selectedMeasurement.name}
              data={analyticData.periodGrowth} />;
  }

  render() {

    return (
      <div className="overview-tab">
        {this._renderBoxInfoMeasureList()}
        <div className="table-major-list">
          {this._renderMajorChangeTableList()}
        </div>
        {this._renderGrowthChart()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { } = overviewActions;
  return bindActionCreators(Object.assign({}, {
  }), dispatch);
}

function mapStateToProps(state) {
  const { selectedBaseCurrency, selectedMeasurement, performanceOverviewTotal, analyticData } = state;
  return Object.assign({}, {
    selectedBaseCurrency,
    selectedMeasurement,
    performanceOverviewTotal,
    analyticData // { summaryData, }
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
