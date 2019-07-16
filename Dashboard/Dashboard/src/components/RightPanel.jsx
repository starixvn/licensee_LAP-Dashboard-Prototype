import React from 'react';
import ReactDOM from 'react-dom';
import LanguageApi from '../Modules/LanguageApi';
import WidgetApi from '../Modules/WidgetApi';
import { WidgetApiUrl, BaseCurrencyList, defaultBasedCurrency } from '../config';

const _baseCurrencyList = BaseCurrencyList;

export default class RightPanel extends React.Component {

    constructor(props) {
        super(props);

        const basedCurrency = _baseCurrencyList.find(x => x.Currency.toLowerCase() === defaultBasedCurrency.toLowerCase());
        const selectedBasedCurrency = basedCurrency ? basedCurrency.CurrencyId : _baseCurrencyList[0].CurrencyId;

        this.state = {
            isMounted: false,
            isHidden: true,
            SelectedBaseCurrency: selectedBasedCurrency,
            SelectedCurrency: 0,
            BaseCurrencyList: _baseCurrencyList,
            CurrencyList: [],
            wgs: this._bindWgCheckBox(props.wgs)
        };

    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isMounted) {
            this.setState({
                wgs: this._bindWgCheckBox(nextProps.wgs)
            });
        }
    }

    componentDidMount() {
        this.setState({ isMounted: true }, () => {
            this._fetchData(this.props)
        });
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
            Url: WidgetApiUrl.CurrenyList,
            IsCrossSite: false
        };

        WidgetApi.fetchData(param).then((response) => {
            response
                .data
                .Currency
                .unshift({ Currency: "All", CurrencyId: "0" });
            this.setState({ isMounted: true, CurrencyList: response.data.Currency })
        }).catch(function (error) {
            console.log("error:", error);
        });
    }

    _applyAction() {
        if (this.state.isMounted) {
            let baseCurrency = _baseCurrencyList.find(x =>
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

    _togglePanel() {
        this.setState(prevState => ({
            isHidden: !prevState.isHidden
        }));
    }

    _getNewStateOnChangeCurrency(selectedCurrency) {
        let newState = { SelectedCurrency: selectedCurrency };

        if (selectedCurrency == "0") {
            return Object.assign({}, newState, {
                SelectedBaseCurrency: _baseCurrencyList[0].CurrencyId,
                BaseCurrencyList: _baseCurrencyList
            });
        }
        if (_baseCurrencyList.find(baseCurrency => baseCurrency.CurrencyId == selectedCurrency)) {
            if (!_baseCurrencyList.find(baseCurrency => baseCurrency.CurrencyId == this.state.SelectedBaseCurrency)) {
                newState.SelectedBaseCurrency = selectedCurrency;
            }
            newState.BaseCurrencyList = _baseCurrencyList;
            return newState;
        }

        const selectedCurrencyItem = this.state.CurrencyList.find(currency => currency.CurrencyId == selectedCurrency);
       
        return Object.assign({}, newState, {
            SelectedBaseCurrency: selectedCurrency,
            BaseCurrencyList: _baseCurrencyList.concat(selectedCurrencyItem)
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
        const isHidden = this.state.isHidden
            ? ''
            : ' is-expanded';
        return <div className={`dashboard__right-panel${isHidden}`}>
            <div className="right-panel-wrap">
                <span
                    onClick={(e) => this._togglePanel(e)}
                    className="icon-quickaccess js-icon-quickaccess">
                    <i className="icon-settings"></i>
                </span>
                <div className="right-panel-content">
                    <div className="currency">
                        <label className="currency-label">{LanguageApi.getRes(this.props.langCode, "currency")}</label>
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
                        <label className="currency-label">{LanguageApi.getRes(this.props.langCode, "Based")}</label>
                        <select
                            ref="baseCurrencyDropdownList"
                            onChange={(e) => this._onChangeBaseCurrencyList(e)}
                            value={this.state.SelectedBaseCurrency}>
                            {this.state.BaseCurrencyList.map((item, i) => {
                                return <option key={i} value={item.CurrencyId}>{item.Currency}</option>
                            })}
                        </select>
                    </div>
                    <a className="btn-submit" onClick={(e) => this._applyAction(e)} href="#">{LanguageApi.getRes(this.props.langCode, "apply")}</a>
                    <div className="widgets-config">
                        <div className="widgets-title">{LanguageApi.getRes(this.props.langCode, "Widgets")}</div>
                        {this.props.wgs.map(item => (
                            <p key={item.key} className="widget-item">
                                <input
                                    onChange={(e) => this._onCheckWg(item.key)}
                                    checked={this.state.wgs[item.key]}
                                    className="filled-in"
                                    type="checkbox"
                                    id={item.key} />
                                <label htmlFor={item.key}>{LanguageApi.getRes(this.props.langCode, item.key)}</label>
                            </p>
                        ))}
                    </div>
                    <a className="btn-reset" onClick={() => this._onResetLayout()} href="#">{LanguageApi.getRes(this.props.langCode, "reset_layout")}</a>
                </div>
            </div>
            <div className="right-panel-overlay" onClick={(e) => this._togglePanel(e)}></div>
        </div>
    }
}
