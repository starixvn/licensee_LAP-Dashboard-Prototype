import React from 'react';
import RightPanel from '../components/RightPanel';

export default class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectedMenu, langCode, initialWgStatus, callbackParent } = this.props;
        return (
            <div className="dashboard__container">
                <RightPanel selectedMenu={selectedMenu} langCode={langCode} initialWgStatus={initialWgStatus} callbackParent={callbackParent} />
                {this.props.children}
            </div>
        );
    }
}
