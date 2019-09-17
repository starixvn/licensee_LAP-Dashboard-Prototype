import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../normal/BoxInfoMeasureList';
import TableMajorChangeItem from '../normal/TableMajorChangeItem';
import GrowthChart from '../charts/GrowthChart';
import TimeComparisonSelect from '../normal/TimeComparisonSelect';
import ValueChangeIcon from '../normal/ValueChangeIcon';

import { majorChangeList } from '../../lib/constants';

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
  }

  componentDidMount() {
  }

  renderMajorChangeTableList() {
    return majorChangeList.map(_ => <TableMajorChangeItem
      {...{..._, ...majorChangeData}}
      renderRow={item => <tr key={item.name}>
        <td><ValueChangeIcon value={item.changeValue} />{item.name}</td>
        <td>{item.totalValue}</td>
        <td>{item.changeValue + '%'}</td>
      </tr>}
    />)
  }

  renderBoxInfoMeasureList() {
    return <BoxInfoMeasureList items={[
      { measurementName: 'Turnover', totalValue: 'EUR 123,59k', changeValue: -5 },
      { measurementName: 'Gross Profit', totalValue: 'EUR 123,59k', changeValue: 5 },
      { measurementName: 'Margin', totalValue: '3%', changeValue: 23 },
    ]} />
  }

  render() {
    return (
      <div className="overview-tab">
        {<TimeComparisonSelect years={['2017', '2018', '2019']} />}
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
  return bindActionCreators({
  }, dispatch);
}

function mapStateToProps(state) {
  const { selectedBaseCurrency, selectedMeasurement } = state;
  return Object.assign({}, { selectedBaseCurrency, selectedMeasurement  });
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
