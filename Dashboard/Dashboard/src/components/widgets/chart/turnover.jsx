import React from 'react';
import ReactDOM from 'react-dom';
import { Doughnut, Chart } from 'react-chartjs-2';
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
            total: 0,
            isLoading: true,
            isMounted: false
        };

        this.options = {
            legend: { display: false, custom: true, id: 'custom-legend' },
            maintainAspectRatio: false,
            tooltips: { enabled: false },
            layout: { padding: { top: 10, bottom: 50, right: 130 } },
            hover: { animationDuration: 0 },
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
                    ctx.save();
                    ctx.shadowColor = "black";
                    ctx.shadowBlur = 3;
                    var chartCircumference = chart.config.options.circumference;
                    self.data.datasets.forEach((dataset, datasetIndex) => {
                        var meta = self.getDatasetMeta(datasetIndex);

                        meta.data.forEach((element, index) => {
                            var segmentPercent = element._model.circumference / chartCircumference * 100;
                            var position = element.tooltipPosition();
                            if (element._model.circumference > 0) {
                                var label = segmentPercent < 1 ? "<1" : segmentPercent.toFixed(0);
                                ctx.fillText(label + '%', position.x, position.y);
                            }
                        });
                    });

                    ctx.restore();
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
                                    "#4473C5"
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
        return <WidgetBox callbackParent={this.props.callbackParent} wgItem={this.props.wgItemFromParent} widgetKey={WidgetKey.chartTurnover} title={LanguageApi.getRes(this.props.langCode, "turnover_byplatform_month_todate")}
            widgetName="turnover default" isLoading={this.state.isLoading}>
            <Doughnut data={this.state.data} options={this.options} />
            <div id="custom-legend"></div>
            <div className="footer-total">
                <span>{LanguageApi.getRes(this.props.langCode, "total_turnover")}: {NumberFormat.formatCurrency(this.state.total, this.props.filter.baseCurrency)} </span>
            </div>
        </WidgetBox>
            ;
    }
};

Chart.plugins.register({
    afterUpdate: function (chartInstance) {
        const options = chartInstance.options;
        const data = chartInstance.data;
        if (options.legend && options.legend.custom && data.datasets.length) {
            const legendOptions = data.labels.map((text, i) => ({
                text: text,
                index: i,
                value: data.datasets[0].data[i],
                color: data.datasets[0].backgroundColor[i]
            }));

            const customLegendElement = document.getElementById(options.legend.id);
            if (!customLegendElement) return;

            const globalDefault = Chart.defaults.global;

            ReactDOM.render((<table style={{
                position: 'absolute',
                top: 10,
                right: 10,
                border: 0,
                fontSize: globalDefault.defaultFontSize,
                fontStyle: globalDefault.defaultFontStyle,
                fontFamily: globalDefault.defaultFontFamily
            }}>
                <tbody>
                    {legendOptions.map(x => (<tr key={x.index}>
                        <td style={{ padding: '1px 10px 1px 1px' }}><span style={{
                            backgroundColor: x.color,
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            marginRight: 3,
                            borderRadius: '50%',
                            verticalAlign: 'middle'
                        }}></span><span style={{ verticalAlign: 'middle' }}>{x.text}</span></td>
                        <td style={{ textAlign: 'right' }}><span style={{ verticalAlign: 'middle' }}>{x.value.toFixed(2)}</span></td>
                    </tr>))}
                </tbody>
            </table>), customLegendElement);
        }
    }
});