import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class LicenseeWinLoss extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title="Licensee Win Loss (month to date)" widgetName="licenseewl default">
                Licensee Win Loss Content
            </WidgetBox>
            ;
    }
};