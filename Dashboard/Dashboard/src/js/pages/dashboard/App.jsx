import React, { Component, Suspense } from 'react';
import ReactDOM from 'react-dom';

import DefaultLayout from '../../layouts/DefaultLayout';
import SummaryDashboard from '../summary/App';
import PerformanceDashboard from '../performance/App';

//export const SummaryDashboard = React.lazy(() =>
//    import(/* webpackChunkName: "summary-dashboard" */ '../summary/App'));
//export const PerformanceDashboard = React.lazy(() =>
//    import(/* webpackChunkName: "performance-dashboard" */ '../performance/App'));


import { tabDashBoard } from '../../modules/constants';

const summary = tabDashBoard.Summary;
const performance = tabDashBoard.Performance;
export default class DashboardApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newChildState: null,
            selectedMenu: summary,
            langCode: null,
            wgStatus: null
        };
    }

    _handleChangeMenu = (name) => {
        this.setState({ selectedMenu: name });
    }

    onChildReturnState = (childState) => {
        this.setState({ ...childState });
    }

    onRightPanelChanged = (newChildState) => {
        this.setState({ newChildState });
    }

    render() {
        const { selectedMenu, newChildState } = this.state;
        const isSelectedSummary = selectedMenu === summary;
        const isSelectedPerformance = selectedMenu === performance;
        return (
            <div className="dashboard-container">
                <ul>
                    <li>
                        <a className={isSelectedSummary ? "active" : ""} href="javascript:;" onClick={() => this._handleChangeMenu(summary)}>{summary}</a>
                    </li>
                    <li>
                        <a className={isSelectedPerformance ? "active" : ""} href="javascript:;" onClick={() => this._handleChangeMenu(performance)}>{performance}</a>
                    </li>
                </ul>
                <DefaultLayout selectedMenu={selectedMenu} langCode={this.state.langCode} initialWgStatus={this.state.wgStatus}
                    callbackParent={(newChildState) => this.onRightPanelChanged(newChildState)}>
                    {
                        isSelectedSummary && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <SummaryDashboard newState={newChildState} onChildReturnState={(childState) => this.onChildReturnState(childState)} />
                            </Suspense>
                        )
                    }
                    {
                        isSelectedPerformance && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <PerformanceDashboard newState={newChildState} onChildReturnState={(childState) => this.onChildReturnState(childState)} />
                            </Suspense>
                        )
                    }
                </DefaultLayout>
            </div>
        );
    };
}

ReactDOM.render(<DashboardApp />, document.getElementById("dashboard"));