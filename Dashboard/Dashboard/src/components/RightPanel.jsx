import React from 'react';
import ReactDOM from 'react-dom';
import LanguageApi from '../Modules/LanguageApi';
import WidgetApi from '../Modules/WidgetApi';
import WidgetLayout from '../Modules/WidgetLayout';
import { WidgetApiUrl } from '../config'

export default class RightPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isMounted: false,
            isHidden: true,
            SelectedBaseCurrency: 'EUR',
            SelectedCurrency: 0,
            BaseCurrencyList: [],
            CurrencyList: [],
            wgs: this.bindWgCheckBox(props.wgs)
        };
    };

    get selectedFilter() {
        return {
            currency: this.state.SelectedCurrency,
            baseCurrency: this.state.SelectedBaseCurrency
        }
    }
    bindWgCheckBox(wgs) {
        var _tempWgs = {};
        wgs.map((x) => { _tempWgs[x.key] = x.enable; })
        return _tempWgs;
    }
    _fetchData() {
        var param = {
            Url: WidgetApiUrl.CurrenyList,
            IsCrossSite: true
        };
        WidgetApi.fetchData(param)
            .then((response) => {
                response.data.CurrencyList.unshift({ Key: "All", Value: "0" });
                this.setState({
                    isMounted: true,
                    CurrencyList: response.data.CurrencyList,
                    BaseCurrencyList: response.data.BaseCurrencyList
                })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }
    componentDidMount() {
        this.setState({
            isMounted: true
        })
        this._fetchData()

    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
    applyAction() {
        if (this.state.isMounted) {
            return this.props.callbackParent({ action: 'apply', filter: this.selectedFilter });
        }
    }
    onChangeCurrencyList(event) {
        this.setState({
            SelectedCurrency: event.target.value
        });
    }
    onChangeBaseCurrencyList(event) {
        this.setState({
            SelectedBaseCurrency: event.target.value
        });
    }
    onCheckWg(key) {
        if (this.state.isMounted) {
            var temp = this.state.wgs;
            temp[key] = !temp[key];
            this.setState({ wgs: temp })
            return this.props.callbackParent({ action: 'wgSyncStatus', items: [{ key: key, enable: this.state.wgs[key] }] });
        }
    }
    togglePanel() {
        if (this.state.isHidden) {
            var currentWgStatus = WidgetLayout.getWidgetStatus()
            var isUpdated = false;
            var diffWgs = []
            for (var i = 0; i < this.props.wgs.length; i++) {
                if (this.props.wgs[i].enable != currentWgStatus[i].enable) {
                    isUpdated = true;
                    diffWgs.push(currentWgStatus[i])
                }
            }

            if (isUpdated) {
                this.props.callbackParent({ action: 'wgSyncStatus', items: diffWgs });
                this.setState({ wgs: this.bindWgCheckBox(currentWgStatus) })
            }
        }

        this.setState(prevState => ({
            isHidden: !prevState.isHidden
        }));
    };
    render() {
        const isHidden = this.state.isHidden;
        return <div className={isHidden ? 'dashboard__right-panel' : 'dashboard__right-panel is-expanded'} >
            <div className="right-panel-wrap">

                <span onClick={(e) => this.togglePanel(e)} className="icon-quickaccess js-icon-quickaccess">
                    <i className="icon-settings"></i>
                </span>
                <div className="right-panel-content" >

                    <div className="currency">
                        <label className="currency-label">{LanguageApi.getRes(this.props.langCode, "currency")}</label>
                        <select onChange={(e) => this.onChangeCurrencyList(e)} value={this.state.SelectedCurrency}>
                            {
                                this.state.CurrencyList.map((item, i) => {
                                    return <option key={i} value={item.Value}>{item.Key}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="currency">
                        <label className="currency-label">{LanguageApi.getRes(this.props.langCode, "Based")}</label>
                        <select onChange={(e) => this.onChangeBaseCurrencyList(e)} value={this.state.SelectedBaseCurrency}>
                            {
                                this.state.BaseCurrencyList.map((item, i) => {
                                    return <option key={i} value={item}>{item}</option>
                                })
                            }
                        </select>
                    </div>

                    <a className="btn-submit" onClick={(e) => this.applyAction(e)} href="#">{LanguageApi.getRes(this.props.langCode, "apply")}</a>

                    <div className="widgets-config">

                        <div className="widgets-title">{LanguageApi.getRes(this.props.langCode, "Widgets")}</div>

                        {
                            this.props.wgs.map(item => {
                                return <p key={item.key} className="widget-item">
                                    <input onChange={(e) => this.onCheckWg(item.key)} checked={this.state.wgs[item.key]} className="filled-in" type="checkbox" id={item.key} />
                                    <label htmlFor={item.key}>{LanguageApi.getRes(this.props.langCode, item.key)}</label>
                                </p>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="right-panel-overlay" onClick={(e) => this.togglePanel(e)}></div>
        </div>
    }
};
