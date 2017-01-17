import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class SportsbookWallet extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title="Sportsbook Wallet" widgetName="sportbook-wallet">
            $ 1.57M
            </WidgetBox>
            ;
    }
};