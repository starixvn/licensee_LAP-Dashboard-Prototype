import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';

import DefaultLayout from '../../layouts/DefaultLayout';
import { summary, performance } from './modules/constants';
import TabMenu from './components/TabMenu';

const SummaryDashboard = import(/* webpackChunkName: "summary/summaryDashboard" */ '../summary/App');
const PerformanceDashboard = import(/* webpackChunkName: "performance/performanceDashboard" */ '../performance/App');

const Summary = React.lazy(() => SummaryDashboard);
const Performance = React.lazy(() => PerformanceDashboard)

const tabMenuList = [
    { key: summary, name: 'Summary', component: React.lazy(() => SummaryDashboard) },
    { key: performance, name: 'Performance', component: React.lazy(() => PerformanceDashboard) },
]

export default class DashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newChildState: null,
            selectedTabMenu: performance,
            childState: {
                langCode: null,
                wgStatus: null
            }
        };
    }

    onClickTabMenu = (name) => {
        this.setState({ selectedTabMenu: name });
    }

    onChildReturnState = (childState) => {
        this.setState({ childState });
    }

    onRightPanelChanged = (newChildState) => {
        this.setState({ newChildState });
    }

    render() {
        const { selectedTabMenu, newChildState, childState } = this.state;
        const componentIndex = tabMenuList.findIndex(p => p.key === selectedTabMenu);
        const TabComponent = componentIndex === -1 ? null : tabMenuList[componentIndex].component;

        return (
            <div className="dashboard-container">
                <TabMenu selectedTabMenu={selectedTabMenu} onClickTabMenu={this.onClickTabMenu} tabMenuList={tabMenuList} />

                <DefaultLayout selectedTabMenu={selectedTabMenu} langCode={childState.langCode} initialWgStatus={childState.wgStatus}
                    callbackParent={this.onRightPanelChanged}>
                    {
                        TabComponent && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <TabComponent newState={newChildState} onChildReturnState={this.onChildReturnState} isSelected={true} />
                            </Suspense>
                        )
                    }
                    <Suspense fallback={null}>
                        <div hidden={true}>
                            {
                                tabMenuList.map(item => {
                                    const RerenderComponent = item.key !== selectedTabMenu ? item.component : null;
                                    return RerenderComponent && (
                                        <RerenderComponent newState={newChildState} onChildReturnState={this.onChildReturnState} isSelected={false} />
                                    )
                                })
                            }
                        </div>
                    </Suspense>
                </DefaultLayout>
            </div>
        );
    };
}

ReactDOM.render(<DashboardApp />, document.getElementById("dashboard"));