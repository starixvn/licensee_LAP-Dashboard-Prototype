import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layouts/Default';
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import {WidgetKey} from './config';

import DepositWB from './components/widgets/normal/deposit';
import OnlineCustomer from './components/widgets/normal/onlinecustomer';
import PendingWB from './components/widgets/normal/pendingfunds';
import RegisteredCustomer from './components/widgets/normal/registercustomer';
import SportsbookWallet from './components/widgets/normal/sportsbookwallet';
import Withdrawal from './components/widgets/normal/withdrawal';

import LicenseeWinLoss from './components/widgets/chart/licenseewl';
import Turnover from './components/widgets/chart/turnover';

export default class DashboardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layouts: {
        lg:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 6, h: 12 },
        { i: WidgetKey.chartLicenseeWL, x: 6, y: 0, w: 6, h: 12 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 12, w: 6, h: 8,minW:2 },
        { i: WidgetKey.normalOnlineCustomer, x: 6, y: 12, w: 6, h: 8 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 20, w: 3, h: 6},
        { i: WidgetKey.normalPendingFund, x: 3, y: 20, w: 3, h: 6 },
        { i: WidgetKey.normalDeposit, x: 6, y: 20, w: 3, h: 6 },
        { i: WidgetKey.normalWithdrawal, x: 9, y: 20, w: 3, h: 6 }
        ],
        md:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 5, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalOnlineCustomer, x: 4, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalPendingFund, x: 2, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalDeposit, x: 4, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalWithdrawal, x: 6, y: 15, w: 2, h: 4 }],
        sm:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 5, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalOnlineCustomer, x: 4, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalPendingFund, x: 2, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalDeposit, x: 4, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalWithdrawal, x: 6, y: 15, w: 2, h: 4 }],
        xs:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 5, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalOnlineCustomer, x: 4, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalPendingFund, x: 2, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalDeposit, x: 4, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalWithdrawal, x: 6, y: 15, w: 2, h: 4 }],

        xxs:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 5, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 4, y: 0, w: 4, h: 5, minW: 2, maxW: 4 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalOnlineCustomer, x: 4, y: 5, w: 4, h: 2 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalPendingFund, x: 2, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalDeposit, x: 4, y: 15, w: 2, h: 4 },
        { i: WidgetKey.normalWithdrawal, x: 6, y: 15, w: 2, h: 4 }]

      }
    };
  }
  getDefaultLayout() {
    return
  }
  render() {

    return <Layout>
      <ResponsiveReactGridLayout className="layout" layouts={this.state.layouts} rowHeight={25}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}>
        <div key={WidgetKey.chartTurnover}><Turnover /></div>
        <div key={WidgetKey.chartLicenseeWL}><LicenseeWinLoss /></div>
        <div key={WidgetKey.normalRegisterCustomer}><RegisteredCustomer /></div>
        <div key={WidgetKey.normalOnlineCustomer}><OnlineCustomer /></div>
        <div key={WidgetKey.normalSportsbookWallet}><SportsbookWallet /></div>
        <div key={WidgetKey.normalPendingFund}><PendingWB /></div>
        <div key={WidgetKey.normalDeposit}><DepositWB /></div>
        <div key={WidgetKey.normalWithdrawal}><Withdrawal /></div>
      </ResponsiveReactGridLayout>

    </Layout>
  };
};

ReactDOM.render(
  <DashboardApp />
  ,
  document.getElementById("dashboad-app")
);
