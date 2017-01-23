import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class OnlineCustomer extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,"online_customer")} widgetName="online-customer default">
                    Online Customers Content
              </WidgetBox>;
        
    }   
};