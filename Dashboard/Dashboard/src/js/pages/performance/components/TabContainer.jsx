import React, { Suspense } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { connect } from 'react-redux';
import { tabMenuList } from '../lib/constants';
import TabMenu from '../../dashboard/components/TabMenu';

class TabContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _onClickTabMenu = tabKey => {
    this.props.setCurrentTab(tabKey);
  }

  _getCurrentTab() {
    const { selectedTabKey } = this.props;
    const item = tabMenuList.find(_ => _.key === selectedTabKey);
    return item ? item.component : null;
  }

  render() {
    const CurrentTab = this._getCurrentTab();
    const { selectedTabKey } = this.props;
    return (
      <div className="tab-container">
        <TabMenu selectedTabMenu={selectedTabKey} onClickTabMenu={this._onClickTabMenu} tabMenuList={tabMenuList} />
        {CurrentTab && <CurrentTab />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const { setCurrentTab } = ActionCreators;
  return bindActionCreators({
    setCurrentTab
  }, dispatch);
}

function mapStateToProps(state) {
  const { currentChildTabKey } = state;
  return Object.assign({}, {
    selectedTabKey: currentChildTabKey
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);
