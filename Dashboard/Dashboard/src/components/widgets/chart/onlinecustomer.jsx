import React from 'react';
import ReactDOM from 'react-dom';
import { HorizontalBar } from 'react-chartjs-2';

import WidgetBox from '../widgetbox';
import { WidgetKey } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
export default class OnlineCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.options = {
            tooltips: {
                enabled: false
            },
            hover: {
                animationDuration: 10
            },
            animation: {
                onComplete: () => {
                    var chart = this.refs.chart.chart_instance.chart;
                    var ctx = chart.ctx;
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";
                    var datasets = this.state.data.datasets;

                    datasets.forEach(function (dataset, i) {
                        ctx.font = "13px Arial";
                        ctx.fillStyle = "Black";
                        console.log("dataset", dataset)
                        for(var propertyName in dataset._meta){
                            dataset._meta[propertyName].data.forEach((p, j) => {
                                ctx.fillText(datasets[i].data[j], chart.width - 90, p._model.y);//p._model.x + 10, p._model.y);
                            });
                        }
                    });
                }
            },
            layout: {
                padding: { right: 100 }
            },
            scales: {
                xAxes: [{
                    barPercentage: 0.5,
                    display: false,
                }],
                yAxes: [{
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
                    hoverBackgroundColor: 'rgba(100,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
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
            <HorizontalBar ref='chart' data={this.state.data} width={50} height={8} options={this.options} />
        </WidgetBox>;

    }
};