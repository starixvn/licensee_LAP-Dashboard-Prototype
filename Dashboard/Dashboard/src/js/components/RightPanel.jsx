import React, { Component, Suspense } from 'react';
import { tabMenuKey } from '../lib/constants';

const SummaryRightPanel = import(/* webpackChunkName: "summary/summaryRightPanel" */ '../pages/summary/components/SummaryRightPanel');
const PerformanceRightPanel = import(/* webpackChunkName: "performance/performanceRightPanel" */ '../pages/performance/components/PerformanceRightPanel');

const rightPanelList = [
    { key: tabMenuKey.summary, component: React.lazy(() => SummaryRightPanel) },
    { key: tabMenuKey.performance, component: React.lazy(() => PerformanceRightPanel) },
]

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

        const { selectedTabMenu, langCode, initialWgStatus, callbackParent } = this.props;
        const componentIndex = rightPanelList.findIndex(p => p.key === selectedTabMenu);
        const RighPanelComponent = componentIndex === -1 ? null : rightPanelList[componentIndex].component;

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
                            RighPanelComponent && (
                                <Suspense fallback={<div>Loading...</div>}>
                                    <RighPanelComponent langCode={langCode} wgs={initialWgStatus} callbackParent={callbackParent} />
                                </Suspense>
                            )
                        }
                        <Suspense fallback={null}>
                            <div hidden={true}>
                                {
                                    rightPanelList.map(item => {
                                        const RerenderComponent = item.key !== selectedTabMenu ? item.component : null;
                                        return RerenderComponent && (
                                            <RerenderComponent langCode={langCode} wgs={initialWgStatus} callbackParent={callbackParent} />
                                        )
                                    })
                                }
                            </div>
                        </Suspense>
                    </div>
                </div>
                <div className="right-panel-overlay" onClick={(e) => this._togglePanel(e)}></div>
            </div>
        );
    }
}
