export const WidgetKey = {
    chartTurnover: 'c_turnover',
    chartLicenseeWL: 'c_licWL',
    normalRegisterCustomer: 'n_reg-customer',
    normalOnlineCustomer: 'n_online-customer',
    normalSportsbookWallet: 'n_sb_wl',
    normalPendingFund: 'n_pending_funds',
    normalDeposit: 'n_deposit',
    normalWithdrawal: 'n_withdrawal'
};

export const WidgetApiUrl=
{
    chartTurnover: '10.18.200.209:8003/V1/api/tunveroverbyplarform',
    chartLicenseeWL: 'c-licWL',
    normalRegisterCustomer: 'n-reg-customer',
    normalOnlineCustomer: 'n-online-customer',
    normalSportsbookWallet: 'n-sb-wl',
    normalPendingFund: 'n-pending-funds',
    normalDeposit: 'n-deposit',
    normalWithdrawal: 'n-withdrawal'
};

export const Wglayouts=

 {
        lg:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 6, h: 12  },
        { i: WidgetKey.chartLicenseeWL, x: 6, y: 0, w: 6, h: 12 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 12, w: 6, h: 8, minW:2 },
        { i: WidgetKey.normalOnlineCustomer, x: 6, y: 12, w: 6, h: 8 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 20, w: 3, h: 6},
        { i: WidgetKey.normalPendingFund, x: 3, y: 20, w: 3, h: 6 },
        { i: WidgetKey.normalDeposit, x: 6, y: 20, w: 3, h: 6 },
        { i: WidgetKey.normalWithdrawal, x: 9, y: 20, w: 3, h: 6 }
        ],
        md:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 5, h: 10 },
        { i: WidgetKey.chartLicenseeWL, x: 5, y: 0, w: 5, h: 10 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 10, w: 5, h: 6, minW:4, minH: 6 },
        { i: WidgetKey.normalOnlineCustomer, x: 5, y: 10, w: 5, h: 6, minW:4, minH: 6 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 16, w: 5, h: 4, minW: 3, minH: 3},
        { i: WidgetKey.normalPendingFund, x: 5, y: 16, w: 5, h: 4, minW: 3, minH: 3 },
        { i: WidgetKey.normalDeposit, x: 0, y: 20, w: 5, h: 4, minW: 3, minH: 3 },
        { i: WidgetKey.normalWithdrawal, x: 5, y: 20, w: 5, h: 4, minW: 3, minH: 3 }],
        sm:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 3, h: 8, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 3, y: 0, w: 3, h: 8, static: true },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 8, w: 3, h: 6, static: true },
        { i: WidgetKey.normalOnlineCustomer, x: 3, y: 8, w: 3, h: 6, static: true },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 14, w: 3, h: 3, static: true },
        { i: WidgetKey.normalPendingFund, x: 3, y: 14, w: 3, h: 3, static: true },
        { i: WidgetKey.normalDeposit, x: 0, y: 17, w: 3, h: 3, static: true },
        { i: WidgetKey.normalWithdrawal, x: 3, y: 17, w: 3, h: 3, static: true }],
        xs:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 8, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 0, y: 8, w: 4, h: 8, static: true },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 16, w: 4, h: 6, static: true },
        { i: WidgetKey.normalOnlineCustomer, x: 0, y: 22, w: 4, h: 6, static: true },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 28, w: 2, h: 3, static: true },
        { i: WidgetKey.normalPendingFund, x: 0, y: 31, w: 4, h: 3, static: true },
        { i: WidgetKey.normalDeposit, x: 0, y: 34, w: 4, h: 3, static: true },
        { i: WidgetKey.normalWithdrawal, x: 0, y: 37, w: 4, h: 3, static: true }],

        xxs:
        [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 8, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 0, y: 8, w: 4, h: 8, static: true },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 16, w: 4, h: 6, static: true },
        { i: WidgetKey.normalOnlineCustomer, x: 0, y: 22, w: 4, h: 6, static: true },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 28, w: 4, h: 3, static: true },
        { i: WidgetKey.normalPendingFund, x: 0, y: 31, w: 4, h: 3, static: true },
        { i: WidgetKey.normalDeposit, x: 0, y: 31, w: 4, h: 3, static: true },
        { i: WidgetKey.normalWithdrawal, x: 0, y: 37, w: 4, h: 3, static: true }]

      }
