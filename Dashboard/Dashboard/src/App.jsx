import Promise from 'core-js/es6/promise';
import Array from 'core-js/es6/array'
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Default';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import { WidgetKey, Wglayouts } from './config';
import WidgetApi from './Modules/WidgetApi';
import DepositWg from './components/widgets/normal/deposit';
import OnlineCustomerWg from './components/widgets/chart/onlinecustomer';
import PendingWg from './components/widgets/normal/pendingfunds';
import RegisteredCustomerWg from './components/widgets/normal/registercustomer';
import SportsbookWalletWg from './components/widgets/normal/sportsbookwallet';
import WithdrawalWg from './components/widgets/normal/withdrawal';

import LicenseeWinLossWg from './components/widgets/chart/licenseewl';
import TurnoverWg from './components/widgets/chart/turnover';

export default class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
    const _wgStatus = [
      { key: WidgetKey.chartTurnover, enable: true },
      { key: WidgetKey.chartLicenseeWL, enable: true },
      { key: WidgetKey.normalDeposit, enable: true },
      { key: WidgetKey.chartlOnlineCustomer, enable: true },
      { key: WidgetKey.normalPendingFund, enable: true },
      { key: WidgetKey.normalRegisterCustomer, enable: true },
      { key: WidgetKey.normalSportsbookWallet, enable: true },
      { key: WidgetKey.normalWithdrawal, enable: true }
    ];
    var userWgStatus = WidgetApi.getWgStatus()
    if (!userWgStatus) {
      userWgStatus = _wgStatus
      WidgetApi.saveWgStatus(_wgStatus)
    }

    this.state = {
      langCode: 'en',
      refresh: 0,
      selectedFilter:
      {
        currency: "ALL",
        baseCurrency: "EUR"
      },
      wgStatus: userWgStatus

    };

    this._defaultWgStatus = _wgStatus;
  }


  get defaultWgStatus() {
    return this._defaultWgStatus;
  }
  get layouts() {
    return Wglayouts;
  }
  emptyWg(key) {
    return <div key={key}></div>

  }
  renderWgItem(key, enable) {
    if (!enable) {
      return this.emptyWg(key)
    }

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

      case WidgetKey.normalSportsbookWallet:
        return <div key={key}><SportsbookWalletWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      case WidgetKey.normalWithdrawal:
        return <div key={key}><WithdrawalWg filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} /></div>

      default:
        return this.emptyWg(key)
    }
  }
  componentDidMount() {
    //setInterval(()=>{this.setState(pre=>({isRefresh:!pre.isRefresh}))},5000) 
  }

  onChildChanged(newState) {

    if (newState.action == 'apply') {
      this.setState(pre => ({ refresh: pre.refresh + 1 }))
    }
    else {
      var newWgs = this.state.wgStatus;
      for (var i = 0; i < newState.items.length; i++) {
        var index = this.state.wgStatus.findIndex(x => x.key == newState.items[i].key);
        newWgs[index].enable = newState.items[i].enable
      }
      this.setState({ wgStatus: newWgs });
      WidgetApi.saveWgStatus(this.state.wgStatus)
    }

  }

  render() {

    return <Layout langCode={this.state.langCode} initialWgStatus={this.defaultWgStatus} callbackParent={(newState) => this.onChildChanged(newState)}>
      <ResponsiveReactGridLayout className="layout" layouts={this.layouts} rowHeight={25}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>

        {this.state.wgStatus.map((item) => {
          return this.renderWgItem(item.key, item.enable)

        })}

      </ResponsiveReactGridLayout>

    </Layout>
  };
};

ReactDOM.render(
  <DashboardApp />
  ,
  document.getElementById("dashboad-app")
);
