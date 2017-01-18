import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import widgetApi from '../../../Modules/WidgetApi';
export default class DepositWidget extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        let result=widgetApi.fetchData({});
        return <WidgetBox title="Deposit (Today)" widgetName="deposit">
                <span className="number-big">{result.data}</span>
              </WidgetBox>;
        
    }   
};
