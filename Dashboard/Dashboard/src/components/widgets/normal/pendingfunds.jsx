import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class PendingFundsWidget extends React.Component{
  
    constructor(props) {
        super(props);
      
    }
    render() {
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,"pending_funds")} widgetName="pending-fund">
                <span className="number-big">$1000050K</span>
            </WidgetBox>
        ;
}
};
