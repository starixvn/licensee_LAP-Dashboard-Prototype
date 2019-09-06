import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { connect } from 'react-redux';

import BoxInfoMeasureList from '../normal/BoxInfoMeasureList';
import TableMajorItem from '../normal/TableMajorItem';
import {Bar} from 'react-chartjs-2';


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
            {measurementName: 'Turnover', totalValue: 'EUR 123,59k', changeValue: -5},
            {measurementName: 'Win Loss', totalValue: 'EUR 123,59k', changeValue: 5},
            {measurementName: 'Margin', totalValue: '3%', changeValue: 23},
          ]} />
  }

  render() {
    return (
      <div className="overview-tab">
        {this.renderBoxInfoMeasureList()}
        <div class="table-major-list">
            <TableMajorItem header={['Currency', this.props.selectedMeasurement.name, '%CHG']}
            title={'MAJOR CHANGES - By Currency'}
            data={[{ name: 'MYR', totalValue: 1235, changeValue: '5%' },
            { name: 'THB', totalValue: 1235, changeValue: '5%' },
            { name: 'USD', totalValue: 91231239, changeValue: '-5%' }
          ]}
            renderRow={item => <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.totalValue}</td>
              <td>{item.changeValue}</td>
              </tr>}
            />
            <TableMajorItem header={['Bettype', this.props.selectedMeasurement.name, '%CHG']}
            title={'MAJOR CHANGES - By Bettyes'}
            data={[{ name: 'MYR', totalValue: 1235, changeValue: '5%' },
            { name: 'THB', totalValue: 1235, changeValue: '5%' },
            { name: 'USD', totalValue: 91231239, changeValue: '-5%' }
          ]}
            renderRow={item => <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.totalValue}</td>
              <td>{item.changeValue}</td>
              </tr>}
            />
            <TableMajorItem header={['Platform', this.props.selectedMeasurement.name, '%CHG']}
            title={'MAJOR CHANGES - By Platforms'}
            data={[{ name: 'MYR', totalValue: 1235, changeValue: '5%' },
            { name: 'THB', totalValue: 1235, changeValue: '5%' },
            { name: 'USD', totalValue: 91231239, changeValue: '-5%' }
          ]}
            renderRow={item => <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.totalValue}</td>
              <td>{item.changeValue}</td>
              </tr>}
            />
        </div>
        <div >

        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverviewTab);
