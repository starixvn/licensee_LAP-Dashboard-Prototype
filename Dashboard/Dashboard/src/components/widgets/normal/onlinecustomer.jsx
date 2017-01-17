import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class OnlineCustomer extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return <WidgetBox title="Online Customers" widgetName="online-customer default">
                    Online Customers Content
              </WidgetBox>;
        
    }   
};