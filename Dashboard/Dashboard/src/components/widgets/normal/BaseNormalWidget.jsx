import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import LanguageApi from '../../../Modules/LanguageApi';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberFormat from '../../../Modules/Number';
import { WidgetApiUrl } from '../../../config'

import { WidgetKey } from '../../../config';
export default class BaseNormalWidget extends React.Component {
    constructor(props, configs) {
        super(props);
        this.state = {
            data: 0
        };

        this.configs = configs;
        // configs = {
        //  Url: "",
        //  TitleKey: "",
        //  WidgetName: ""
        // }
    }

    fetchData(nextProps) {
        var param = {
            Data: {
                CurrencyId: nextProps.filter.currency,
                BaseCurrency: nextProps.filter.baseCurrency
            },
            Url: this.configs.Url,
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
        return <WidgetBox widgetKey={WidgetKey.normalDeposit} title={LanguageApi.getRes(this.props.langCode, this.configs.TitleKey )} widgetName={this.configs.WidgetName}>
            <span className="number-big">{NumberFormat.DecFormat(this.props.filter.baseCurrency, this.state.data.Value)}</span>
        </WidgetBox>;
    }
};
