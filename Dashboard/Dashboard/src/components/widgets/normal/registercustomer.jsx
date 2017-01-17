import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';

export default class RegisteredCustomer extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return <WidgetBox title="Registered Customers" widgetName="registered-customer default">
                    <div className="clearfix registered-customer-content">
                        <span className="icon-group-users left"></span>
                        <div className="right">
                            <div className="registered-info">
                                <p className="number">500</p>
                                <p className="text">Total Registered Customers (today)</p>
                            </div>                            
                        </div>
                    </div>
                    <div className="clearfix registered-customer-content dark-bg">
                        
                            <div className="registered-info">
                                <p className="number">400</p>
                                <p className="text">Deposit</p>
                            </div>
                       
                            <div className="registered-info">
                                <p className="number">100</p>
                                <p className="text">None - deposit</p>
                            </div>
                        
                    </div>
              </WidgetBox>;
        
    }   
};