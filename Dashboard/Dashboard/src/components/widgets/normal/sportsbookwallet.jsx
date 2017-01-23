import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class SportsbookWallet extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,"sportsbook_wallet")} widgetName="sportbook-wallet">
            <span className="number-big">$1.57M</span>
            </WidgetBox>
            ;
    }
};