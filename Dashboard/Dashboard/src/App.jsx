import React from 'react';
import ReactDOM from 'react-dom';

import 'core-js/es6/promise';
import 'core-js/es6/array';
import 'core-js/es6/object';

import DefaultLayout from './layouts/Default';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { WidgetKey, Wglayouts } from './config';
import LocalStorageHelper from './Modules/LocalStorageHelper';
import WidgetLayout from './Modules/WidgetLayout';
import LanguageApi from './Modules/LanguageApi';

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

    LocalStorageHelper.clearLayoutSettingIfNewVersion();

    const langCode = window.dashboardLangCode || 'en';
    const permission = window.widgetPermission;

    if (!permission || !permission.length) {
      alert(LanguageApi.getRes(langCode, 'no_widget_permission'));
    }

    this.state = Object.assign({
      langCode: langCode,
      refresh: 0,
      selectedFilter: {
        currency: 0,
        baseCurrency: "EUR"
      },
      isMounted: false,
    }, this._getLayoutSettings());

    this._responsiveReactGridLayout = WidthProvider(Responsive);
  }

  _renderWgItem(key) {
    const keyToWidget = {
      [WidgetKey.chartTurnover]: TurnoverWg,
      [WidgetKey.chartLicenseeWL]: LicenseeWinLossWg,
      [WidgetKey.normalDeposit]: DepositWg,
      [WidgetKey.chartlOnlineCustomer]: OnlineCustomerWg,
      [WidgetKey.normalPendingFund]: PendingWg,
      [WidgetKey.normalRegisterCustomer]: RegisteredCustomerWg,
      [WidgetKey.normalCustomerBalance]: CustomerBalanceWg,
      [WidgetKey.normalWithdrawal]: WithdrawalWg
    };
    const Widget = keyToWidget[key];
    var itemStatus = this.state.wgStatus.find(x => x.key === key);

    return (<div key={key}>
      <Widget wgItemFromParent={itemStatus} callbackParent={(newState) => this.onChildChanged(newState)} filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} />
    </div>);
  }

  _resetLayout() {
    if (this.state.isMounted) {
      LocalStorageHelper.clearWidgetCache();
      this.setState(this._getLayoutSettings());
    }
  }

  _getLayoutSettings() {
    const wgStatus = WidgetLayout.getWidgetStatusSettings(window.widgetPermission);
    const userWgStatus = WidgetLayout.mergeWidgetStatusSettingsToUserSettings(wgStatus);
    LocalStorageHelper.saveWidgetStatus(userWgStatus);

    const userWidgetLayouts = WidgetLayout.getWidgetLayoutSettings();
    LocalStorageHelper.saveWidgetLayout(userWidgetLayouts);

    return {
      wgStatus: userWgStatus,
      layouts: userWidgetLayouts
    }
  }

  onChildChanged(newState) {
    if (this.state.isMounted && newState.action == 'apply') {
      this.setState(pre => ({
        refresh: pre.refresh + 1,
        selectedFilter: newState.filter
      }))
    } else if (newState.action == 'reset') {
      this._resetLayout();
    } else if (newState.items && newState.items.length) {
      const syncResult = WidgetLayout.syncLayoutWithNewStatus(newState.items, this.state.wgStatus, this.state.layouts);
      this.setState(() => ({
        wgStatus: syncResult.newWidgetStatus,
        layouts: syncResult.newLayouts
      }));
      LocalStorageHelper.saveWidgetStatus(syncResult.newWidgetStatus);
      LocalStorageHelper.saveWidgetLayout(syncResult.newLayouts);
      LocalStorageHelper.saveRemovedWidgetLayout(syncResult.removedLayouts);
    }
  }

  onLayoutChange(layout, layouts) {
    if (this.state.isMounted) {
      LocalStorageHelper.saveWidgetLayout(layouts);
      this.setState({
        wgStatus: this.state.wgStatus,
        layouts: layouts
      });
    }
  }

  get isTouchScreen() {
    return 'ontouchstart' in window || navigator.maxTouchPoints
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  componentWillUnmount() {
    this.setState({ isMounted: false });
  }
  
  render() {
    const ResponsiveReactGridLayout = this._responsiveReactGridLayout;
    return (<DefaultLayout langCode={this.state.langCode} initialWgStatus={this.state.wgStatus} callbackParent={(newState) => this.onChildChanged(newState)}>
      <ResponsiveReactGridLayout className="layout" layouts={this.state.layouts} rowHeight={25} onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} isDraggable={!this.isTouchScreen}>
        {this.state.wgStatus.filter(i => i.enable).map((item) => this._renderWgItem(item.key))}
      </ResponsiveReactGridLayout>
    </DefaultLayout>);
  };
}

ReactDOM.render(<DashboardApp />, document.getElementById("dashboad-app"));