import React from 'react';
import ReactDOM from 'react-dom';
import { Bar } from 'react-chartjs-2';

import WidgetBox from '../widgetbox';
import { WidgetKey } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import { WidgetApiUrl } from '../../../config';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberFormat from '../../../Modules/Number';

export default class LicenseeWinLoss extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.options = {
            maintainAspectRatio: false,
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 0
            },
            animation: {
                onComplete: function () {
                    var self = this,
                        chart = this.chart,
                        ctx = chart.ctx;

                    ctx.textAlign = "center";
                    ctx.fillStyle = "#555";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";

                    self.data.datasets.forEach(function (dataset, datasetIndex) {
                        var meta = self.getDatasetMeta(datasetIndex);
                        meta.data.forEach(function (element, elementIndex) {
                            var text = NumberFormat.format(dataset.data[elementIndex]);
                            var textWidth = ctx.measureText(text).width;
                            ctx.fillText(text, element._model.x - (textWidth / 2), element._model.y - 5);
                        });
                    });
                }
            },
            layout: {
                padding: { top: 50, bottom: 50 }
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    ticks: {
                        callback: function (value, index, values) {
                            return NumberFormat.format(value);
                        }
                    }
                }]
            },
            legend: {
                display: false
            }
        };
    }

    fetchData(nextProps) {
        var param = {
            Data: {
                CurrencyId: nextProps.filter.currency,
                BaseCurrency: nextProps.filter.baseCurrency
            },
            Url: WidgetApiUrl.chartLicenseeWL,
            IsCrossSite: true
        };
        WidgetApi.fetchData(param)
            .then((response) => {
                var labelList = [], dataList = [];

                for (var item of response.data.Data) {
                    labelList.push(item.Name);
                    dataList.push(item.Value);
                }

                this.setState({
                    data: {
                        labels: labelList,
                        datasets: [
                            {
                                data: dataList,
                                backgroundColor: [
                                    "#35A1FB",
                                    "#4B966B",
                                    "#4C6375",
                                    "#D9544F",
                                    "#4473C5"
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
        return <WidgetBox title={LanguageApi.getRes(this.props.langCode, "licensee_winloss_month_todate")} widgetKey={WidgetKey.chartLicenseeWL} widgetName="licenseewl default">
            <Bar data={this.state.data} options={this.options} />
            <div className="footer-total">
                <span>Total turnover: $1,222,919.56</span>
            </div>
        </WidgetBox>
            ;
    }
};