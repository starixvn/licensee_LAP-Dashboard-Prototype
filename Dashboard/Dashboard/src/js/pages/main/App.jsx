import React from 'react';
import ReactDOM from 'react-dom';
import { Responsive, WidthProvider } from 'react-grid-layout';
import DefaultLayout from '../../layouts/DefaultLayout';

import 'core-js/es6/promise';
import 'core-js/es6/array';
import 'core-js/es6/object';

import Turnover from '../chart/turnover/Turnover';
import OnlineCustomer from '../chart/online-customer/OnlineCustomer';
import LicenseeWinLoss from '../chart/licensee-win-loss/LicenseeWinLoss';

import Deposit from '../normal/deposit/Deposit';
import Withdrawal from '../normal/withdrawal/Withdrawal';
import PendingFunds from '../normal/pending-funds/PendingFunds';
import CustomerBalance from '../normal/customer-balance/CustomerBalance';
import RegisteredCustomer from '../normal/registered-customer/RegisteredCustomer';

import widgetLayout from '../../modules/services/widgetLayout';
import languageApi from '../../modules/services/languageApi';
import { widgetKey, defaultBasedCurrency } from '../../modules/constants';
import localStorageHelper from '../../modules/services/localStorageHelper';

export default class DashboardApp extends React.Component {
    constructor(props) {
        super(props);

        localStorageHelper.clearLayoutSettingIfNewVersion();

        const langCode = window.dashboardLangCode || 'en';
        const permission = window.widgetPermission;

        if (!permission || !permission.length) {
            alert(languageApi.getRes(langCode, 'no_widget_permission'));
        }

        this.state = Object.assign({
            langCode: langCode,
            refresh: 0,
            selectedFilter: {
                currency: 0,
                baseCurrency: defaultBasedCurrency
            },
            isMounted: false,
        }, this._getLayoutSettings());

        this._responsiveReactGridLayout = WidthProvider(Responsive);
    }

    _renderWgItem(key) {
        const keyToWidget = {
            [widgetKey.ChartTurnover]: Turnover,
            [widgetKey.ChartLicenseeWL]: LicenseeWinLoss,
            [widgetKey.NormalDeposit]: Deposit,
            [widgetKey.ChartlOnlineCustomer]: OnlineCustomer,
            [widgetKey.NormalPendingFund]: PendingFunds,
            [widgetKey.NormalRegisterCustomer]: RegisteredCustomer,
            [widgetKey.NormalCustomerBalance]: CustomerBalance,
            [widgetKey.NormalWithdrawal]: Withdrawal
        };
        const Widget = keyToWidget[key];
        var itemStatus = this.state.wgStatus.find(x => x.key === key);

        return (<div key={key}>
            <Widget wgItemFromParent={itemStatus} callbackParent={(newState) => this.onChildChanged(newState)} filter={this.state.selectedFilter} refresh={this.state.refresh} langCode={this.state.langCode} />
        </div>);
    }

    _resetLayout() {
        if (this.state.isMounted) {
            localStorageHelper.clearWidgetCache();
            this.setState(this._getLayoutSettings());
        }
    }

    _getLayoutSettings() {
        const wgStatus = widgetLayout.getWidgetStatusSettings(window.widgetPermission);
        const userWgStatus = widgetLayout.mergeWidgetStatusSettingsToUserSettings(wgStatus);
        localStorageHelper.saveWidgetStatus(userWgStatus);

        const userWidgetLayouts = widgetLayout.getWidgetLayoutSettings();
        localStorageHelper.saveWidgetLayout(userWidgetLayouts);

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
            const syncResult = widgetLayout.syncLayoutWithNewStatus(newState.items, this.state.wgStatus, this.state.layouts);
            this.setState(() => ({
                wgStatus: syncResult.newWidgetStatus,
                layouts: syncResult.newLayouts
            }));
            localStorageHelper.saveWidgetStatus(syncResult.newWidgetStatus);
            localStorageHelper.saveWidgetLayout(syncResult.newLayouts);
            localStorageHelper.saveRemovedWidgetLayout(syncResult.removedLayouts);
        }
    }

    onLayoutChange(layout, layouts) {
        if (this.state.isMounted) {
            localStorageHelper.saveWidgetLayout(layouts);
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
        return (
            <DefaultLayout langCode={this.state.langCode} initialWgStatus={this.state.wgStatus} callbackParent={(newState) => this.onChildChanged(newState)}>
                <ResponsiveReactGridLayout className="layout" layouts={this.state.layouts} rowHeight={25} onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} isDraggable={!this.isTouchScreen}>
                    {this.state.wgStatus.filter(i => i.enable).map((item) => this._renderWgItem(item.key))}
                </ResponsiveReactGridLayout>
            </DefaultLayout>
        );
    };
}

ReactDOM.render(<DashboardApp />, document.getElementById("dashboad-app"));