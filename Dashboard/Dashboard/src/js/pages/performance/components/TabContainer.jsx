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

  _onClickTabMenu = (tabKey) => {
    this.setState({
      selectedTabKey: tabKey
    })
  }

  _getCurrentTab() {
    const item = tabMenuList.find(_ => _.key === this.state.selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this._getCurrentTab();
    const { selectedTabKey } = this.state;
    return (
      <div className="tab-container">
        <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={this._onClickTabMenu} tabMenuList={tabMenuList} />
        {CurrentTab && <CurrentTab />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({
    ActionCreators
  }, dispatch);
}

function mapStateToProps(state) {
  const { ...rest } = state;
  return Object.assign({}, rest);
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer)
