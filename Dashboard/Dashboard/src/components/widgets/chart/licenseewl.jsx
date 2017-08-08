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
            data: {},
            total: 0,
            isLoading: true,
            isMounted: false
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
                    const self = this,
                        chart = this.chart,
                        ctx = chart.ctx;

                    ctx.textAlign = "center";
                    ctx.fillStyle = "#555";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";

                    self.data.datasets.forEach(function (dataset, datasetIndex) {
                        const meta = self.getDatasetMeta(datasetIndex);
                        meta.data.forEach(function (element, elementIndex) {
                            const value = dataset.data[elementIndex];
                            const text = NumberFormat.formatDecimal(value);
                            const textWidth = ctx.measureText(text).width;
                            const yOffset = value > 0 ? 6 : -7;
                            ctx.fillText(text, element._model.x - (textWidth / 2), element._model.y - yOffset);
                        });
                    });
                }
            },
            layout: {
                padding: { top: 20, bottom: 50 }
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
                    labelList.push(LanguageApi.getRes(this.props.langCode, item.Key));
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
                                    "#4473C5",
                                    "#7687a8"
                                ]
                            }]
                    },
                    isLoading: false
                })
            })
            .catch(function (error) {
                console.log("error:", error);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isMounted && nextProps.refresh > this.props.refresh) {
            this.setState({ isLoading: true })
            this.fetchData(nextProps)
        }
    }

    componentDidMount() {
        this.setState({ isMounted: true }, () => {
            this.fetchData(this.props)
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }
    
    render() {
        return <WidgetBox callbackParent={this.props.callbackParent} wgItem={this.props.wgItemFromParent} title={LanguageApi.getRes(this.props.langCode, "licensee_winloss_month_todate")} widgetKey={WidgetKey.chartLicenseeWL}
            widgetName="licenseewl default" isLoading={this.state.isLoading}>
            <Bar data={this.state.data} options={this.options} />
            <div className="footer-total">
                <span>{LanguageApi.getRes(this.props.langCode, "total_winloss")}: {NumberFormat.formatCurrency(this.state.total, this.props.filter.baseCurrency)}</span>
            </div>
        </WidgetBox>
            ;
    }
};