import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class RegisteredCustomer extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return <WidgetBox title="Registered Customers" widgetName="registered-customer default">
                    Registered Customers Content
              </WidgetBox>;
        
    }   
};