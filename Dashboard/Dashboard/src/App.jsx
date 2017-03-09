import React from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from './layouts/Default';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { WidgetKey, Wglayouts } from './config';
import LocalStorageHelper from './Modules/LocalStorageHelper';
import WidgetLayout from './Modules/WidgetLayout';

import DepositWg from './components/widgets/normal/deposit';
import OnlineCustomerWg from './components/widgets/chart/onlinecustomer';
import PendingWg from './components/widgets/normal/pendingfunds';
import RegisteredCustomerWg from './components/widgets/normal/registercustomer';
import CustomerBalanceWg from './components/widgets/normal/customerbalance';
import WithdrawalWg from './components/widgets/normal/withdrawal';
import LicenseeWinLossWg from './components/widgets/chart/licenseewl';
import TurnoverWg from './components/widgets/chart/turnover';

window.widgetPermission = [
  'c_turnover',
  'c_licWL',
  'n_deposit',
  'c_online_customer',
  'n_pending_funds',
  'n_reg_customer',
  'n_customer_balance',
  'n_withdrawal'
];

export default class DashboardApp extends React.Component {
  constructor(props) {
    super(props);

    LocalStorageHelper.clearLayoutSettingIfNewVersion();
    const wgStatus = WidgetLayout.getWidgetStatusSettings(window.widgetPermission);
    const userWgStatus = WidgetLayout.mergeWidgetStatusSettingsToUserSettings(wgStatus);
    LocalStorageHelper.saveWidgetStatus(userWgStatus);

    const userWidgetLayouts = WidgetLayout.getWidgetLayoutSettings();

    this.state = {
      langCode: window.dashboardLangCode || 'en',
      refresh: 0,
      selectedFilter: {
        currency: 0,
        baseCurrency: "EUR"
      },
      wgStatus: userWgStatus,
      layouts: userWidgetLayouts
    };

    this._defaultWgStatus = wgStatus;
    this._responsiveReactGridLayout = WidthProvider(Responsive);
  }

  get defaultWgStatus() {
    return this._defaultWgStatus;
  }

  renderWgItem(key) {
    switch (key) {
      case WidgetKey.chartTurnover:
        return <div key={key}><TurnoverWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>
      case WidgetKey.chartLicenseeWL:
        return <div key={key}><LicenseeWinLossWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.normalDeposit:
        return <div key={key}><DepositWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.chartlOnlineCustomer:
        return <div key={key}><OnlineCustomerWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.normalPendingFund:
        return <div key={key}><PendingWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.normalRegisterCustomer:
        return <div key={key}><RegisteredCustomerWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.normalCustomerBalance:
        return <div key={key}><CustomerBalanceWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.normalWithdrawal:
        return <div key={key}><WithdrawalWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>
    }
  }

  onChildChanged(newState) {
    if (newState.action == 'apply') {
      this.setState(pre => ({
        refresh: pre.refresh + 1,
        selectedFilter: newState.filter
      }))
    } else if (newState.items && newState.items.length) {
      let newWidgetStatus = [...this.state.wgStatus];
      let newLayouts = Object.assign({}, this.state.layouts);
      let removedLayouts = LocalStorageHelper.getRemovedWidgetLayout();

      newState.items.forEach(widgetItem => {
        let status = newWidgetStatus.find(w => w.key === widgetItem.key);
        status.enable = widgetItem.enable;

        if (status.enable) {
          const toBeAdded = removedLayouts[widgetItem.key] || WidgetLayout.getWidgetLayoutByKey(Wglayouts, widgetItem.key);
          newLayouts = WidgetLayout.addWidgetToLayout(newLayouts, toBeAdded);
          removedLayouts[widgetItem.key] = null;
        } else {
          const toBeRemoved = WidgetLayout.getWidgetLayoutByKey(newLayouts, widgetItem.key);
          newLayouts = WidgetLayout.removeWidgetFromLayout(newLayouts, widgetItem.key);
          removedLayouts[widgetItem.key] = toBeRemoved;
        }
      });

      this.setState({
        wgStatus: newWidgetStatus,
        layouts: newLayouts
      });
      LocalStorageHelper.saveWidgetStatus(newWidgetStatus);
      LocalStorageHelper.saveWidgetLayout(newLayouts);
      LocalStorageHelper.saveRemovedWidgetLayout(removedLayouts);
    }
  }

  onLayoutChange(layout, layouts) {
    LocalStorageHelper.saveWidgetLayout(layouts);
    this.setState({
        wgStatus: this.state.wgStatus,
        layouts: layouts
      });
  }

  get isTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints
  }

  render() {
    const ResponsiveReactGridLayout = this._responsiveReactGridLayout;
    return <DefaultLayout langCode={ this.state.langCode } initialWgStatus={ this.defaultWgStatus } callbackParent={ (newState) => this.onChildChanged(newState) }>
      <ResponsiveReactGridLayout className="layout" layouts={this.state.layouts} rowHeight={25} onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={!this.isTouchScreen}>

        {this.state.wgStatus.filter(i => i.enable).map((item) => this.renderWgItem(item.key))}

      </ResponsiveReactGridLayout>

           </DefaultLayout>
  };
}

ReactDOM.render(
  <DashboardApp />
  ,
  document.getElementById("dashboad-app")
);