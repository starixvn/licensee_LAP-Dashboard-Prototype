import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../normal/BoxInfoMeasureList';
import TableMajorItem from '../normal/TableMajorItem';
import GrowthChart from '../charts/GrowthChart';
import TimeComparisonSelect from '../normal/TimeComparisonSelect';

class OverviewTab extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  renderMajorTableList() {
    return null;
  }

  renderBoxInfoMeasureList() {
    return <BoxInfoMeasureList items={[
      { measurementName: 'Turnover', totalValue: 'EUR 123,59k', changeValue: -5 },
      { measurementName: 'Win Loss', totalValue: 'EUR 123,59k', changeValue: 5 },
      { measurementName: 'Margin', totalValue: '3%', changeValue: 23 },
    ]}/>
  }

  render() {
    return (
      <div className="overview-tab">
        {<TimeComparisonSelect years={['2017', '2018', '2019']} />}
        {this.renderBoxInfoMeasureList()}
        <div className="table-major-list">
          <TableMajorItem header={['Currency', this.props.selectedMeasurement.name, '%CHG']}
            title={'MAJOR CHANGES - By Currency'}
            data={[{ name: 'MYR', totalValue: 1235, changeValue: 5 },
            { name: 'THB', totalValue: 1235, changeValue: 5 },
            { name: 'USD', totalValue: 91231239, changeValue: -5 },
            { name: 'CNY', totalValue: 91231239, changeValue: -5 },
            { name: 'INH', totalValue: 91231239, changeValue: 5 }
            ]}
            renderRow={item => <tr key={item.name}>
              <td><div className={item.changeValue >= 0 ? "arrow-up" : "arrow-down"}></div>{item.name}</td>
              <td>{item.totalValue}</td>
              <td>{item.changeValue + '%'}</td>
            </tr>}
          />
          <TableMajorItem header={['Bettype', this.props.selectedMeasurement.name, '%CHG']}
            title={'MAJOR CHANGES - By Bettyes'}
            data={[{ name: 'MYR', totalValue: 1235, changeValue: -7 },
            { name: 'THB', totalValue: 1235, changeValue: 5 },
            { name: 'USD', totalValue: 91231239, changeValue: -5 },
            { name: 'CNY', totalValue: 91231239, changeValue: -12 },
            { name: 'INH', totalValue: 91231239, changeValue: 5 }
            ]}
            renderRow={item => <tr key={item.name}>
              <td><div className={item.changeValue >= 0 ? "arrow-up" : "arrow-down"}></div>{item.name}</td>
              <td>{item.totalValue}</td>
              <td>{item.changeValue + '%'}</td>
            </tr>}
          />
          <TableMajorItem header={['Platform', this.props.selectedMeasurement.name, '%CHG']}
            title={'MAJOR CHANGES - By Platforms'}
            data={[{ name: 'MYR', totalValue: 1235, changeValue: 5 },
            { name: 'THB', totalValue: 1235, changeValue: 5 },
            { name: 'USD', totalValue: 91231239, changeValue: 12 },
            { name: 'CNY', totalValue: 91231239, changeValue: -5 },
            { name: 'INH', totalValue: 91231239, changeValue: 5 }
            ]}
            renderRow={item => <tr key={item.name}>
              <td><div className={item.changeValue >= 0 ? "arrow-up" : "arrow-down"}></div>{item.name}</td>
              <td>{item.totalValue}</td>
              <td>{item.changeValue + '%'}</td>
            </tr>}
          />
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
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
