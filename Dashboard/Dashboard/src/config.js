export const WidgetKey = {
    chartTurnover: 'c_turnover',
    chartLicenseeWL: 'c_licWL',
    normalRegisterCustomer: 'n_reg_customer',
    chartlOnlineCustomer: 'c_online_customer',
    normalSportsbookWallet: 'n_sb_wl',
    normalPendingFund: 'n_pending_funds',
    normalDeposit: 'n_deposit',
    normalWithdrawal: 'n_withdrawal'
};

export const WidgetApiUrl = {
    chartTurnover: '/api/TurnoverByPlatform/GetData',
    chartLicenseeWL: 'c-licWL',
    normalRegisterCustomer: 'GetRegisteredCustomers',
    chartlOnlineCustomer: 'n-online-customer',
    normalSportsbookWallet: '/api/SportsbookWallet/GetData',
    normalPendingFund: '/api/PendingFund/GetData',
    normalDeposit: '/api/TodayDeposit/GetData',
    normalWithdrawal: '/api/TodayWithdrawal/GetData',
    CurrenyList:"/api/Dashboard/GetCurrencyList"
};

export const Wglayouts = {
    lg: [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 6, h: 11, isResizable: true },
        { i: WidgetKey.chartLicenseeWL, x: 6, y: 0, w: 6, h: 11 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 11, w: 6, h: 6, minW: 2 },
        { i: WidgetKey.chartlOnlineCustomer, x: 6, y: 11, w: 6, h: 6 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 17, w: 3, h: 6 },
        { i: WidgetKey.normalPendingFund, x: 3, y: 17, w: 3, h: 6 },
        { i: WidgetKey.normalDeposit, x: 6, y: 17, w: 3, h: 6 },
        { i: WidgetKey.normalWithdrawal, x: 9, y: 17, w: 3, h: 6 }
    ],
    md: [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 5, h: 10 },
        { i: WidgetKey.chartLicenseeWL, x: 5, y: 0, w: 5, h: 10 },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 10, w: 5, h: 6, minW: 4, minH: 6 },
        { i: WidgetKey.chartlOnlineCustomer, x: 5, y: 10, w: 5, h: 6, minW: 4, minH: 6 },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 16, w: 5, h: 4, minW: 3, minH: 3 },
        { i: WidgetKey.normalPendingFund, x: 5, y: 16, w: 5, h: 4, minW: 3, minH: 3 },
        { i: WidgetKey.normalDeposit, x: 0, y: 20, w: 5, h: 4, minW: 3, minH: 3 },
        { i: WidgetKey.normalWithdrawal, x: 5, y: 20, w: 5, h: 4, minW: 3, minH: 3 }
    ],
    sm: [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 3, h: 8, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 3, y: 0, w: 3, h: 8, static: true },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 8, w: 3, h: 6, static: true },
        { i: WidgetKey.chartlOnlineCustomer, x: 3, y: 8, w: 3, h: 6, static: true },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 14, w: 3, h: 3, static: true },
        { i: WidgetKey.normalPendingFund, x: 3, y: 14, w: 3, h: 3, static: true },
        { i: WidgetKey.normalDeposit, x: 0, y: 17, w: 3, h: 3, static: true },
        { i: WidgetKey.normalWithdrawal, x: 3, y: 17, w: 3, h: 3, static: true }
    ],
    xs: [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 8, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 0, y: 8, w: 4, h: 8, static: true },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 16, w: 4, h: 6, static: true },
        { i: WidgetKey.chartlOnlineCustomer, x: 0, y: 22, w: 4, h: 6, static: true },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 28, w: 4, h: 3, static: true },
        { i: WidgetKey.normalPendingFund, x: 0, y: 31, w: 4, h: 3, static: true },
        { i: WidgetKey.normalDeposit, x: 0, y: 34, w: 4, h: 3, static: true },
        { i: WidgetKey.normalWithdrawal, x: 0, y: 37, w: 4, h: 3, static: true }
    ],

    xxs: [{ i: WidgetKey.chartTurnover, x: 0, y: 0, w: 4, h: 8, static: true },
        { i: WidgetKey.chartLicenseeWL, x: 0, y: 8, w: 4, h: 8, static: true },
        { i: WidgetKey.normalRegisterCustomer, x: 0, y: 16, w: 4, h: 6, static: true },
        { i: WidgetKey.chartlOnlineCustomer, x: 0, y: 22, w: 4, h: 6, static: true },
        { i: WidgetKey.normalSportsbookWallet, x: 0, y: 28, w: 4, h: 3, static: true },
        { i: WidgetKey.normalPendingFund, x: 0, y: 31, w: 4, h: 3, static: true },
        { i: WidgetKey.normalDeposit, x: 0, y: 31, w: 4, h: 3, static: true },
        { i: WidgetKey.normalWithdrawal, x: 0, y: 37, w: 4, h: 3, static: true }
    ]

}