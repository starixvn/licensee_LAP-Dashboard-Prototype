import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class Withdrawal extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return <WidgetBox  widgetKey={WidgetKey.normalWithdrawal} title={LanguageApi.getRes(this.props.langCode,"withdrawal_today")} widgetName="withdrawal">
            <span className="number-big">$500k</span>
            </WidgetBox>
            ;
    }
};