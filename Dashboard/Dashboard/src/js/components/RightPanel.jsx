import React, { Component, Suspense } from 'react';
import { rightPanelList } from '../modules/constants';

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
                    </div>
                </div>
                <div className="right-panel-overlay" onClick={(e) => this._togglePanel(e)}></div>
            </div>
        );
    }
}
