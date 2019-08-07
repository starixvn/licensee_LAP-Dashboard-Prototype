import React from 'react';

const SummaryRightPanel = React.lazy(() =>
    import(/* webpackChunkName: "summary/summaryRightPanel" */ '../pages/summary/components/SummaryRightPanel'));
const PerformanceRightPanel = React.lazy(() =>
    import(/* webpackChunkName: "performance/performanceRightPanel" */ '../pages/performance/components/PerformanceRightPanel'));

export const tabMenuKey = {
    summary: 'summary',
    performance: 'performance',
}

export const rightPanelList = [
    { key: tabMenuKey.summary, component: SummaryRightPanel },
    { key: tabMenuKey.performance, component: PerformanceRightPanel },
]

export const CurrenyListApiUrl = "GetCurrencyInfo";


export const widgetKey = {
    NormalCustomerBalance: 'n_customer_balance',
    NormalPendingFund: 'n_pending_funds',
    NormalDeposit: 'n_deposit',
    NormalWithdrawal: 'n_withdrawal'
};

export const baseCurrencyList = [
    { CurrencyId: "6", Currency: "EUR" },
    { CurrencyId: "3", Currency: "USD" },
    { CurrencyId: "12", Currency: "GBP" },
    { CurrencyId: "2", Currency: "MYR" },
    { CurrencyId: "13", Currency: "CNY" },
    { CurrencyId: "4", Currency: "THB" },
    { CurrencyId: "15", Currency: "IDR" },
    { CurrencyId: "51", Currency: "INH" }
];

export const defaultBasedCurrency = window.defaultBaseCurrency;