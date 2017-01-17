import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class SportsbookWallet extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title="Sportsbook Wallet" widgetName="sportbook-wallet">
            <span className="number-big">$1.57M</span>
            </WidgetBox>
            ;
    }
};