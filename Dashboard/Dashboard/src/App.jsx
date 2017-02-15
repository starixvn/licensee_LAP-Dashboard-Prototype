import Promise from 'core-js/es6/promise';
import Array from 'core-js/es6/array';
import 'core-js/es6/object';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Default';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { WidgetKey, Wglayouts } from './config';
import WidgetLayout from './Modules/WidgetLayout';
import DepositWg from './components/widgets/normal/deposit';
import OnlineCustomerWg from './components/widgets/chart/onlinecustomer';
import PendingWg from './components/widgets/normal/pendingfunds';
import RegisteredCustomerWg from './components/widgets/normal/registercustomer';
import CustomerBalanceWg from './components/widgets/normal/customerbalance';
import WithdrawalWg from './components/widgets/normal/withdrawal';

import LicenseeWinLossWg from './components/widgets/chart/licenseewl';
import TurnoverWg from './components/widgets/chart/turnover';

export default class DashboardApp extends React.Component {
  constructor(props) {
    super(props);

    WidgetLayout.clearLayoutSettingIfNewVersion();
    const _wgStatus = [
      { key: WidgetKey.chartTurnover, enable: true },
      { key: WidgetKey.chartLicenseeWL, enable: true },
      { key: WidgetKey.normalDeposit, enable: true },
      { key: WidgetKey.chartlOnlineCustomer, enable: true },
      { key: WidgetKey.normalPendingFund, enable: true },
      { key: WidgetKey.normalRegisterCustomer, enable: true },
      { key: WidgetKey.normalCustomerBalance, enable: true },
      { key: WidgetKey.normalWithdrawal, enable: true }
    ];
    var userWgStatus = WidgetLayout.getWidgetStatus()
    if (!userWgStatus) {
      userWgStatus = _wgStatus
      WidgetLayout.saveWidgetStatus(_wgStatus)
    }

    let userWidgetLayouts = WidgetLayout.getWidgetLayout()
    if (!userWidgetLayouts) {
      userWidgetLayouts = this.cloneLayoutConfig()
      WidgetLayout.saveWidgetLayout(userWidgetLayouts)
    }

    this.state = {
      langCode: window.dashboardLangCode || 'en',
      refresh: 0,
      selectedFilter:
      {
        currency: 0,
        baseCurrency: "EUR"
      },
      wgStatus: userWgStatus,
      layouts: userWidgetLayouts
    };

    this._defaultWgStatus = _wgStatus;
  }

  cloneLayoutConfig() {
    return {
      lg: Array.from(Wglayouts.lg),
      md: Array.from(Wglayouts.md),
      sm: Array.from(Wglayouts.sm),
      xs: Array.from(Wglayouts.xs),
      xxs: Array.from(Wglayouts.xxs)
    }
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
  componentDidMount() {
    //setInterval(()=>{this.setState(pre=>({isRefresh:!pre.isRefresh}))},5000) 
  }

  _addWidgetToLayout(widgetKey) {
    const newLayouts = {};

    const lgWidgetItem = Wglayouts.lg.find(w => w.i == widgetKey);
    newLayouts.lg = this.state.layouts.lg.concat(lgWidgetItem);
    const mdWidgetItem = Wglayouts.md.find(w => w.i == widgetKey);
    newLayouts.md = this.state.layouts.md.concat(mdWidgetItem);
    const smWidgetItem = Wglayouts.sm.find(w => w.i == widgetKey);
    newLayouts.sm = this.state.layouts.sm.concat(smWidgetItem);
    const xsWidgetItem = Wglayouts.xs.find(w => w.i == widgetKey);
    newLayouts.xs = this.state.layouts.xs.concat(xsWidgetItem);
    const xxsWidgetItem = Wglayouts.xxs.find(w => w.i == widgetKey);
    newLayouts.xxs = this.state.layouts.xxs.concat(xxsWidgetItem);

    return newLayouts;
  }

  _removeWidgetFromLayout(widgetKey) {
    const newLayouts = {};

    newLayouts.lg = this.state.layouts.lg.filter(w => w.i !== widgetKey);
    newLayouts.md = this.state.layouts.md.filter(w => w.i !== widgetKey);
    newLayouts.sm = this.state.layouts.sm.filter(w => w.i !== widgetKey);
    newLayouts.xs = this.state.layouts.xs.filter(w => w.i !== widgetKey);
    newLayouts.xxs = this.state.layouts.xxs.filter(w => w.i !== widgetKey);

    return newLayouts;
  }

  onChildChanged(newState) {
    if (newState.action == 'apply') {
      this.setState(pre => ({ refresh: pre.refresh + 1, selectedFilter: newState.filter }))
    }
    else {

      let newWidgetStatus = Array.from(this.state.wgStatus);
      let newLayouts = {};
      for (let i = 0; i < newState.items.length; i++) {
        var widgetItem = newState.items[i];
        newWidgetStatus.find(w => w.key == widgetItem.key).enable = widgetItem.enable;
        newLayouts = widgetItem.enable ? this._addWidgetToLayout(widgetItem.key) : this._removeWidgetFromLayout(widgetItem.key)
      }

      this.setState({ wgStatus: newWidgetStatus, layouts: newLayouts });
      WidgetLayout.saveWidgetStatus(newWidgetStatus)
      WidgetLayout.saveWidgetLayout(newLayouts);
    }
  }

  onLayoutChange(layout, layouts) {
    WidgetLayout.saveWidgetLayout(layouts);
  }

  get isTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints
  }

  render() {
    return <Layout langCode={this.state.langCode} initialWgStatus={this.defaultWgStatus} callbackParent={(newState) => this.onChildChanged(newState)}>
      <ResponsiveReactGridLayout className="layout" layouts={this.state.layouts} rowHeight={25} onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        isDraggable={!this.isTouchScreen}>

        {this.state.wgStatus.filter(i => i.enable).map((item) => this.renderWgItem(item.key))}

      </ResponsiveReactGridLayout>

    </Layout>
  };
};

ReactDOM.render(
  <DashboardApp />
  ,
  document.getElementById("dashboad-app")
);