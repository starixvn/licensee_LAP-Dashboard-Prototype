import React from 'react';
import { tabMenuKey } from '../../../modules/constants'

const SummaryDashboard = React.lazy(() =>
    import(/* webpackChunkName: "summary/summaryDashboard" */ '../../summary/App'));
const PerformanceDashboard = React.lazy(() =>
    import(/* webpackChunkName: "performance/performanceDashboard" */ '../../performance/App'));

export const tabMenuList = [
    { key: tabMenuKey.summary, name: 'Summary', component: SummaryDashboard },
    { key: tabMenuKey.performance, name: 'Performance', component: PerformanceDashboard },
]