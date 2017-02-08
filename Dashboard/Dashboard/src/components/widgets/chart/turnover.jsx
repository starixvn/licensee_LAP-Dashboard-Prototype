import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut } from 'react-chartjs-2';
import WidgetBox from '../widgetbox';
import { WidgetKey } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import { WidgetApiUrl } from '../../../config';
import WidgetApi from '../../../Modules/WidgetApi';
import NumberFormat from '../../../Modules/Number';

export default class Turnover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            total: 0
        };
        
       
        this.options = {
            legend: {
                display: true,
                position: 'right',
                labels: {
                    boxWidth: 20,
                    usePointStyle: true,
                    padding: 20
                }
            },
            maintainAspectRatio: false,
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var label = data.labels[tooltipItem.index];
                        var currentValue = dataset.data[tooltipItem.index];
                        return label + ": " + NumberFormat.format(currentValue);
                    }
                }
            },
            layout: {
                padding: { top: 10, bottom: 50 }
            },
            hover: {
                animationDuration: 0
            },
            animation: {
                onComplete: function (e) {
                    var self = this,
                        chart = this.chart,
                        ctx = chart.ctx;

                    var chartSize = Math.min(chart.width, chart.height);
                    if (chartSize < 100) {
                        return;
                    }

                    ctx.textAlign = "center";
                    ctx.fillStyle = "#fff";

                    var chartCircumference = chart.config.options.circumference;
                    self.data.datasets.forEach((dataset, datasetIndex) => {
                        var meta = self.getDatasetMeta(datasetIndex);

                        meta.data.forEach((element, index) => {
                            var segmentLabel = element._model.circumference / chartCircumference * 100;
                            var position = element.tooltipPosition();
                            if (element._model.circumference > 0) {
                                ctx.fillText(segmentLabel.toFixed(0) + '%', position.x, position.y);
                            }
                        });
                    });
                }
            }
        };
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
                var labelList = [], dataList = [];

                for (var item of response.data.Data) {
                    labelList.push(item.Key);
                    dataList.push(item.Value);
                }

                this.setState({
                    total: response.data.Total,
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
        return <WidgetBox widgetKey={WidgetKey.chartTurnover} title={LanguageApi.getRes(this.props.langCode, "sportsbook_turnover_month_todate")} widgetName="turnover default">
            <Doughnut data={this.state.data} options={this.options} />
            <div className="footer-total">
                <span>Total turnover: {NumberFormat.formatCurrency(this.state.total, this.props.filter.baseCurrency)} </span>
            </div>
        </WidgetBox>
            ;
    }
};