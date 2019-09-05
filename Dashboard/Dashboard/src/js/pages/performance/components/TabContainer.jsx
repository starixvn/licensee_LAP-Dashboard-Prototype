import React, { Component, Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
import { tabMenuList } from '../lib/constants';
import TabMenu from '../../dashboard/components/TabMenu';

class TabContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabKey: tabMenuList[0].key
    };
  }

  componentDidMount() {
  }

  onClickTabMenu = (tabKey) => {
    this.setState({
      selectedTabKey: tabKey
    })
  }

  getCurrentTab() {
    const item = tabMenuList.find(_ => _.key === this.state.selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this.getCurrentTab();
    const { selectedTabKey }  = this.state;
    return (
      <div className="tab-container">
        <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={this.onClickTabMenu} tabMenuList={tabMenuList} />
        {CurrentTab && <CurrentTab />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getCurrencyInfo: ActionCreators.getCurrencyInfo,
    setBaseCurrency: ActionCreators.setBaseCurrency,
    setMeasurement: ActionCreators.setMeasurement
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    selectedBaseCurrency: state.selectedBaseCurrency,
    selectedMeasurement: state.selectedMeasurement,
    currencyInfo: state.currencyInfo,
    measurements: state.measurements
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
