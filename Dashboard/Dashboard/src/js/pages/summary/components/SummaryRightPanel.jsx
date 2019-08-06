import React, { Component, Fragment } from 'react';
import languageApi from '../../../modules/languageApi';
import widgetApi from '../../../modules/widgetApi';
import { CurrenyListApiUrl, baseCurrencyList, defaultBasedCurrency } from '../../../modules/constants';

export default class SummaryRightPanel extends Component {
    constructor(props) {
        super(props);

        const basedCurrency = baseCurrencyList.find(x => x.Currency.toLowerCase() === defaultBasedCurrency.toLowerCase());
        const selectedBasedCurrency = basedCurrency ? basedCurrency.CurrencyId : baseCurrencyList[0].CurrencyId;

        this.state = {
            isMounted: false,
            SelectedBaseCurrency: selectedBasedCurrency,
            SelectedCurrency: 0,
            BaseCurrencyList: baseCurrencyList,
            CurrencyList: [],
            wgs: props.wgs ? this._bindWgCheckBox(props.wgs) : []
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isMounted && this.props.wgs !== prevProps.wgs) {
            this.setState({
                wgs: this._bindWgCheckBox(this.props.wgs)
            });
        }
    }

    componentDidMount() {
        this.setState({ isMounted: true }, () => this._fetchData());
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    _bindWgCheckBox(wgs) {
        var arrayToDictionary = {};
        wgs.forEach(x => arrayToDictionary[x.key] = x.enable);

        return arrayToDictionary;
    }

    _fetchData() {
        var param = {
            Url: CurrenyListApiUrl,
            IsCrossSite: false
        };

        widgetApi.fetchData(param)
            .then((response) => {
                response
                    .data
                    .Currency
                    .unshift({ Currency: "All", CurrencyId: "0" });
                this.setState({ isMounted: true, CurrencyList: response.data.Currency })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }

    _applyAction() {
        if (this.state.isMounted) {
            let baseCurrency = baseCurrencyList.find(x =>
                x.CurrencyId == this.state.SelectedBaseCurrency
            );

            this.props.callbackParent({
                action: 'apply',
                filter: {
                    currency: this.state.SelectedCurrency,
                    baseCurrency: baseCurrency ? baseCurrency.Currency : ""
                }
            });
        }
    }

    _getNewStateOnChangeCurrency(selectedCurrency) {
        let newState = { SelectedCurrency: selectedCurrency };

        if (selectedCurrency == "0") {
            return Object.assign({}, newState, {
                SelectedBaseCurrency: baseCurrencyList[0].CurrencyId,
                BaseCurrencyList: baseCurrencyList
            });
        }
        if (baseCurrencyList.find(baseCurrency => baseCurrency.CurrencyId == selectedCurrency)) {
            if (!baseCurrencyList.find(baseCurrency => baseCurrency.CurrencyId == this.state.SelectedBaseCurrency)) {
                newState.SelectedBaseCurrency = selectedCurrency;
            }
            newState.BaseCurrencyList = baseCurrencyList;
            return newState;
        }

        const selectedCurrencyItem = this.state.CurrencyList.find(currency => currency.CurrencyId == selectedCurrency);

        return Object.assign({}, newState, {
            SelectedBaseCurrency: selectedCurrency,
            BaseCurrencyList: baseCurrencyList.concat(selectedCurrencyItem)
        });
    }
    _onChangeCurrencyList(event) {
        var newState = this._getNewStateOnChangeCurrency(event.target.value);

        this.setState(newState);
    }

    _onChangeBaseCurrencyList(event) {
        this.setState({ SelectedBaseCurrency: event.target.value });
    }

    _onCheckWg(key) {
        if (this.state.isMounted) {
            this.props.callbackParent({
                action: 'wgSyncStatus',
                items: [{
                    key: key,
                    enable: !this.state.wgs[key]
                }]
            });
        }
    }

    _onResetLayout() {
        if (this.state.isMounted) {
            this.props.callbackParent({ action: 'reset' });
        }
    }

    render() {
        const { langCode, wgs } = this.props;

        return langCode && wgs && (
            <Fragment>
                <div className="currency">
                    <label className="currency-label">{languageApi.getRes(this.props.langCode, "currency")}</label>
                    <select
                        ref="currencyDropdownList"
                        onChange={(e) => this._onChangeCurrencyList(e)}
                        value={this.state.SelectedCurrency}>
                        {this.state.CurrencyList.map((item, i) => {
                            return <option key={i} value={item.CurrencyId}>{item.Currency}</option>
                        })}
                    </select>
                </div>
                <div className="currency">
                    <label className="currency-label">{languageApi.getRes(this.props.langCode, "Based")}</label>
                    <select
                        ref="baseCurrencyDropdownList"
                        onChange={(e) => this._onChangeBaseCurrencyList(e)}
                        value={this.state.SelectedBaseCurrency}>
                        {this.state.BaseCurrencyList.map((item, i) => {
                            return <option key={i} value={item.CurrencyId}>{item.Currency}</option>
                        })}
                    </select>
                </div>
                <a className="btn-submit" onClick={(e) => this._applyAction(e)} href="#">{languageApi.getRes(this.props.langCode, "apply")}</a>
                <div className="widgets-config">
                    <div className="widgets-title">{languageApi.getRes(this.props.langCode, "Widgets")}</div>
                    {this.props.wgs.map(item => (
                        <p key={item.key} className="widget-item">
                            <input
                                onChange={(e) => this._onCheckWg(item.key)}
                                checked={this.state.wgs[item.key]}
                                className="filled-in"
                                type="checkbox"
                                id={item.key} />
                            <label htmlFor={item.key}>{languageApi.getRes(this.props.langCode, item.key)}</label>
                        </p>
                    ))}
                </div>
                <a className="btn-reset" onClick={() => this._onResetLayout()} href="#">{languageApi.getRes(this.props.langCode, "reset_layout")}</a>
            </Fragment>
        );
    }
}
