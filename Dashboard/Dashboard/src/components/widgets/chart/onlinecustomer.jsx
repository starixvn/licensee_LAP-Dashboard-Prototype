import React from 'react';
import ReactDOM from 'react-dom';
import { HorizontalBar } from 'react-chartjs-2';

import WidgetBox from '../widgetbox';
import { WidgetKey } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import NumberFormat from '../../../Modules/Number';

export default class OnlineCustomer extends React.Component {
    constructor(props) {
        super(props);
        const fontColor = "#5162BA";
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
                    ctx.fillStyle = fontColor;
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";

                    self.data.datasets.forEach(function (dataset, datasetIndex) {
                        var meta = self.getDatasetMeta(datasetIndex);
                        meta.data.forEach(function (element, elementIndex) {
                            ctx.fillText(NumberFormat.format(dataset.data[elementIndex]), chart.width - 90, element._model.y);
                        });
                    });
                }
            },
            layout: {
                padding: { right: 100, bottom: 20 }
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.5,
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        fontColor: fontColor
                    },
                    gridLines: {
                        display: false
                    }
                }]
            },
            legend: {
                display: false
            }
        };
    }

    fetchData(nextProps) {
        var sampleData = {
            Web: 1111,
            Wap: 2222,
            SmartSite: 3333
        };

        this.setState({
            data: {
                labels: ['WEB', 'WAP', 'SMART'],
                datasets: [{
                    backgroundColor: [
                        'rgb(241, 91, 32)',
                        'rgb(75, 150, 107)',
                        'rgb(61, 165, 250)'
                    ],
                    data: [sampleData.Web, sampleData.Wap, sampleData.SmartSite],
                    stacked: true
                }],
                xLabels: ["1", "2", "3"]
            }
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
        return <WidgetBox widgetKey={WidgetKey.chartlOnlineCustomer} title={LanguageApi.getRes(this.props.langCode, "online_customer")} widgetName="online-customer default">
            <HorizontalBar data={this.state.data} options={this.options} />
        </WidgetBox>;

    }
};