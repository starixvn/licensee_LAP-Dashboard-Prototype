import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class DepositWidget extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return <WidgetBox title="Deposit (Today)" widgetName="deposit">
                $1000050K
              </WidgetBox>;
        
    }   
};
