import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberFormat from '../../../Modules/Number';
import { WidgetApiUrl } from '../../../config'

export default class SportsbookWallet extends React.Component {

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
            Url: WidgetApiUrl.normalSportsbookWallet,
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
        return <WidgetBox  widgetKey={WidgetKey.normalSportsbookWallet} title={LanguageApi.getRes(this.props.langCode,"sportsbook_wallet")} widgetName="sportbook-wallet">
            <span className="number-big">{NumberFormat.DecFormat(this.props.filter.baseCurrency, this.state.data.Value)}</span>
            </WidgetBox>
            ;
    }
};