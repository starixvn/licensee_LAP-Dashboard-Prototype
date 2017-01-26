import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut } from 'react-chartjs-2';

import WidgetBox from '../widgetbox';
import {WidgetKey} from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import { WidgetApiUrl } from '../../../config'
import WidgetApi from '../../../Modules/WidgetApi';

export default class Turnover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.options = {};
    }

    fetchData(nextProps) {
        var param = {
            Data: {
                CurrencyId: nextProps.filter.currency,
                BaseCurrency: nextProps.filter.baseCurrency
            },
            Url: WidgetApiUrl.chartTurnover,
            IsCrossSite: true
        };
        WidgetApi.fetchData(param)
            .then((response) => {
                this.setState({
                    data: {
                        labels: [
                            "Red",
                            "Blue",
                            "Yellow"
                        ],
                        datasets: [
                            {
                                data: [300, 50, 100],
                                backgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56"
                                ],
                                hoverBackgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#FFCE56"
                                ]
                            }]
                    }
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
        return <WidgetBox  widgetKey={WidgetKey.chartTurnover} title={LanguageApi.getRes(this.props.langCode,"sportsbook_turnover_month_todate")} widgetName="turnover default">
                <Doughnut ref='chart' data={this.state.data} width={100} height={40} options={this.options} />
                <div className="footer-total">
                    <span>Total turnover: $1,222,919.56</span>
                </div>
            </WidgetBox>
            ;
    }
};