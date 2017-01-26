import React from 'react';
import ReactDOM from 'react-dom';

import NumberFormat from '../../../Modules/Number';
import WidgetBox from '../widgetbox';
import WidgetApi from '../../../Modules/WidgetApi';
import { WidgetKey } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import { WidgetApiUrl } from '../../../config'

export default class Withdrawal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: 0
        }
    }

    fetchData(nextProps) {
        var param = {
            Data: {
                CurrencyId: nextProps.filter.currency,
                BaseCurrency: nextProps.filter.baseCurrency
            },
            Url: WidgetApiUrl.normalWithdrawal,
            IsCrossSite: true
        };
        WidgetApi.fetchData(param)
            .then((response) => {
                this.setState({
                    data: response.data
                })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh > this.props.refresh) {
            this.fetchData(nextProps)
        }
    }
    componentDidMount() {
        this.fetchData(this.props)
    }
    render() {
        return <WidgetBox widgetKey={WidgetKey.normalWithdrawal} title={LanguageApi.getRes(this.props.langCode, "withdrawal_today")} widgetName="withdrawal">
            <span className="number-big">{NumberFormat.DecFormat(this.props.filter.baseCurrency, this.state.data.Value)}</span>
        </WidgetBox>
            ;
    }
};