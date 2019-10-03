import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';

import DefaultLayout from '../../layouts/DefaultLayout';
import { summary, performance } from './lib/constants';
import TabMenu from './components/TabMenu';

const SummaryDashboard = import(/* webpackChunkName: "summary/summaryDashboard" */ '../summary/index');
const PerformanceDashboard = import(/* webpackChunkName: "performance/performanceDashboard" */ '../performance/index');

const tabMenuList = [
    { key: summary, name: 'Summary', component: React.lazy(() => SummaryDashboard) },
    { key: performance, name: 'Performance', component: React.lazy(() => PerformanceDashboard) },
]

export default class DashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTabMenu: performance,
        };
    }

    onClickTabMenu = (name) => {
        this.setState({ selectedTabMenu: name });
    }

    render() {
        const { selectedTabMenu } = this.state;
        const componentIndex = tabMenuList.findIndex(p => p.key === selectedTabMenu);
        const TabComponent = componentIndex === -1 ? null : tabMenuList[componentIndex].component;

        return (
            <div className="dashboard-container">
                <TabMenu selectedTabMenu={selectedTabMenu} onClickTabMenu={this.onClickTabMenu} tabMenuList={tabMenuList} />
                <DefaultLayout>
                    {
                        TabComponent && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <TabComponent />
                            </Suspense>
                        )
                    }
                </DefaultLayout>
            </div>
        );
    };
}

ReactDOM.render(<DashboardApp />, document.getElementById("dashboard"));
