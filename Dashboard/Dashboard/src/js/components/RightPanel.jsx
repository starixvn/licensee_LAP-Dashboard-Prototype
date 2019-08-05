import React, { Component, Suspense } from 'react';

import { tabDashBoard } from '../modules/constants';
 import SummaryRightPanel from '../pages/summary/components/SummaryRightPanel';
 import PerformanceRightPanel from '../pages/performance/components/PerformanceRightPanel';

//export const SummaryRightPanel = React.lazy(() =>
//    import(/* webpackChunkName: "summary-right-panel" */ '../pages/summary/components/SummaryRightPanel'));
//export const PerformanceRightPanel = React.lazy(() =>
//    import(/* webpackChunkName: "performance-right-panel" */ '../pages/performance/components/PerformanceRightPanel'));

export default class RightPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHidden: true,
        }
    }

    _togglePanel() {
        this.setState(prevState => ({
            isHidden: !prevState.isHidden
        }));
    }

    render() {
        const isHidden = this.state.isHidden ? '' : ' is-expanded';

        const { selectedMenu, langCode, initialWgStatus, callbackParent } = this.props;
        const isSummaryRightPanel = selectedMenu === tabDashBoard.Summary;
        const isPerformanceRightPanel = selectedMenu === tabDashBoard.Performance;
        return (
            <div className={`dashboard__right-panel${isHidden}`}>
                <div className="right-panel-wrap">
                    <span
                        onClick={(e) => this._togglePanel(e)}
                        className="icon-quickaccess js-icon-quickaccess">
                        <i className="icon-settings"></i>
                    </span>
                    <div className="right-panel-content">
                        {
                            isSummaryRightPanel && initialWgStatus && langCode && (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SummaryRightPanel langCode={langCode} wgs={initialWgStatus} callbackParent={callbackParent} />
                                </Suspense>
                            )
                        }
                        {
                            isPerformanceRightPanel && (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <PerformanceRightPanel callbackParent={callbackParent} />
                                </Suspense>
                            )
                        }
                    </div>
                </div>
                <div className="right-panel-overlay" onClick={(e) => this._togglePanel(e)}></div>
            </div>
        );
    }
}
