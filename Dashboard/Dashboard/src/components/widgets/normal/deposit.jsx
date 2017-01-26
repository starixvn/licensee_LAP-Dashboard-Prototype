import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import LanguageApi from '../../../Modules/LanguageApi';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberFormat from '../../../Modules/Number';
import { WidgetApiUrl } from '../../../config'

import { WidgetKey } from '../../../config';
export default class DepositWidget extends React.Component {
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
            Url: WidgetApiUrl.normalDeposit,
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
        return <WidgetBox widgetKey={WidgetKey.normalDeposit} title={LanguageApi.getRes(this.props.langCode, "deposit_today")} widgetName="deposit">
            <span className="number-big">{NumberFormat.DecFormat(this.props.filter.baseCurrency, this.state.data.Value)}</span>
        </WidgetBox>;
    }
};
