import React from 'react';
import ReactDOM from 'react-dom';

import WidgetBox from '../widgetbox';
import LanguageApi from '../../../Modules/LanguageApi';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberFormat from '../../../Modules/Number';
import AutoReload from '../../AutoReload';

export default class BaseNormalWidget extends React.Component {
    constructor(props, configs) {
        super(props);

        this.state = {
            data: 0,
            isLoading: true
        };

        this.configs = configs;
        // configs = {
        //  Url: "",
        //  TitleKey: "",
        //  WidgetName: "",
        //  WidgetKey: ""
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
                    data: response.data,
                    isLoading: false
                })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.refresh > this.props.refresh) {
            this._loadData(nextProps);
        }
    }

    componentDidMount() {
        this.fetchData(this.props)
    }

    _autoReload() {
        this._loadData(this.props);
    }

    _loadData(nextProps){
        this.setState({ isLoading: true });
        this.fetchData(nextProps);
    }

    render() {
        return <WidgetBox callbackParent={this.props.callbackParent} wgItem={this.props.wgItemFromParent} widgetKey={this.configs.WidgetKey} title={LanguageApi.getRes(this.props.langCode, this.configs.TitleKey)}
            widgetName={this.configs.WidgetName} isLoading={this.state.isLoading}>
            <div className="center-block">
                <AutoReload className="number-big"
                    callbackParent={() => this._autoReload()}
                    refresh={this.props.autoReload}>{NumberFormat.formatCurrency(this.state.data, this.props.filter.baseCurrency)}</AutoReload>
            </div>
        </WidgetBox>;
    }
};
