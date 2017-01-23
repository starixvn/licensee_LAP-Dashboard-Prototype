import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class RegisteredCustomer extends React.Component{
    constructor(props) {
        super(props);
        
    }

    render() {
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode,"registered_customer")} widgetName="registered-customer default">
                    <div className="clearfix registered-customer-content">
                        <span className="icon-group-users left"></span>
                        <div className="right">
                            <div className="registered-info">
                                <p className="number">500</p>
                                <p className="text">{LanguageApi.getRes(this.props.langCode,"total_registered_cus_today")}</p>
                            </div>                            
                        </div>
                    </div>
                    <div className="clearfix registered-customer-content dark-bg">
                        
                            <div className="registered-info">
                                <div className="center-block">
                                    <p className="number">400</p>
                                    <p className="text">{LanguageApi.getRes(this.props.langCode,"Deposit")}</p>
                                </div>                                
                            </div>
                       
                            <div className="registered-info">
                                <div className="center-block">
                                    <p className="number">100</p>
                                    <p className="text">{LanguageApi.getRes(this.props.langCode,"none_deposit")}</p>
                                </div>                                
                            </div>
                        
                    </div>
              </WidgetBox>;
        
    }   
};