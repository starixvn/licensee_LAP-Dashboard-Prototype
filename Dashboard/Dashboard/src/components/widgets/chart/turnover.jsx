import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut } from 'react-chartjs-2';

import WidgetBox from '../widgetbox';
import { WidgetKey } from '../../../config';
import LanguageApi from '../../../Modules/LanguageApi';
import { WidgetApiUrl } from '../../../config'
import WidgetApi from '../../../Modules/WidgetApi';

export default class Turnover extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };

        this.options = {
            hover: {
                animationDuration: 0
            },
            animation: {
                onComplete: function () {
                    var self = this,
                        chart = this.chart,
                        ctx = chart.ctx;

                    ctx.font = '13px Arial';
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#fff";
                    self.data.datasets.forEach((dataset, datasetIndex) => {
                        var meta = self.getDatasetMeta(datasetIndex),
                            total = 0, //total values to compute fraction
                            labelxy = [],
                            offset = Math.PI / 2, //start sector from top
                            radius,
                            centerx,
                            centery,
                            lastend = 0; //prev arc's end line: starting with 0

                        for (var value of dataset.data) 
                        { 
                            total += value; 
                        }

                        meta.data.forEach((element, index) => {
                            radius = 0.9 * element._model.outerRadius - element._model.innerRadius;
                            centerx = element._model.x;
                            centery = element._model.y;
                            var thispart = dataset.data[index],
                                arcsector = Math.PI * (2 * thispart / total);
                            if (element.hasValue() && dataset.data[index] > 0) {
                                labelxy.push(lastend + arcsector / 2 + Math.PI + offset);
                            }
                            else {
                                labelxy.push(-1);
                            }
                            lastend += arcsector;
                        });

                        var lradius = radius * 1.9;
                        for (var idx in labelxy) {
                            if (labelxy[idx] === -1) continue;
                            var langle = labelxy[idx],
                                dx = centerx + lradius * Math.cos(langle),
                                dy = centery + lradius * Math.sin(langle),
                                val = Math.round(dataset.data[idx] / total * 100);
                            ctx.fillText(val + '%', dx, dy);
                        }
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
                    labelList.push(item.Name);
                    dataList.push(item.Value);
                }

                this.setState({
                    data: {
                        labels: labelList,
                        datasets: [
                            {
                                data: dataList,
                                labels: "aaâ",
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
            <Doughnut data={this.state.data} width={100} height={30} options={this.options} />
            <div className="footer-total">
                <span>Total turnover: $1,222,919.56</span>
            </div>
        </WidgetBox>
            ;
    }
};