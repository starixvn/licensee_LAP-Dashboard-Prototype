import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import { WidgetKey, WidgetApiUrl } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import WidgetApi from '../../../Modules/WidgetApi';

export default class RegisteredCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deposit: 0,
            noneDeposit: 0,
            isMounted:false
        }
    }
    fetchData(nextProps) {
        var param = {
            Data: {
                CurrencyId: nextProps.filter.currency,
                BaseCurrency: nextProps.filter.baseCurrency
            },
            Url: WidgetApiUrl.normalRegisterCustomer,
            IsCrossSite: false
        };
        WidgetApi.fetchData(param)
            .then((response) => {
                this.setState({
                deposit: response.data.Deposit,
                noneDeposit:response.data.NoneDeposit
                })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }
    componentWillReceiveProps(nextProps) {
        if(this.isMounted)
        {
            if (nextProps.refresh > this.props.refresh) {
                this.fetchData(nextProps)
            }
        }
    }
    componentDidMount() {
        this.setState({isMounted:true})
        this.fetchData(this.props)
    }
    render() {
        return <WidgetBox widgetKey={WidgetKey.normalRegisterCustomer} title={LanguageApi.getRes(this.props.langCode, "registered_customer")} widgetName="registered-customer default">
            <div className="clearfix registered-customer-content">
                <span className="icon-group-users left"></span>
                <div className="right">
                    <div className="registered-info">
                        <p className="number">{this.state.deposit + this.state.noneDeposit}</p>
                        <p className="text">{LanguageApi.getRes(this.props.langCode, "total_registered_cus_today")}</p>
                    </div>
                </div>
            </div>
            <div className="clearfix registered-customer-content dark-bg">

                <div className="registered-info">
                    <div className="center-block">
                        <p className="number">{this.state.deposit}</p>
                        <p className="text">{LanguageApi.getRes(this.props.langCode, "deposit")}</p>
                    </div>
                </div>

                <div className="registered-info">
                    <div className="center-block">
                        <p className="number">{this.state.noneDeposit}</p>
                        <p className="text">{LanguageApi.getRes(this.props.langCode, "none_deposit")}</p>
                    </div>
                </div>

            </div>
        </WidgetBox>;

    }
};