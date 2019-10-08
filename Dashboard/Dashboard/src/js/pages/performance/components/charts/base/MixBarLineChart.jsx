import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import numberFormat from '../../../../../lib/numberFormat';

const defaultColorBarChart = '#F1A837';
const defaultColorLineChart = '#F15D21';

const buildLineChartDataSet = lineChartData => {
  return {
    label: lineChartData.name,
    type: 'line',
    lineTension: 0,
    data: lineChartData.dataSet,
    fill: false,
    borderColor: lineChartData.color || defaultColorLineChart,
    backgroundColor: lineChartData.color || defaultColorLineChart,
    pointBorderColor: lineChartData.color || defaultColorLineChart,
    pointBackgroundColor: lineChartData.color || defaultColorLineChart,
    pointHoverBackgroundColor: lineChartData.color || defaultColorLineChart,
    pointHoverBorderColor: lineChartData.color || defaultColorLineChart,
    yAxisID: 'y-axis-2'
  }
}

const buildBarChartDataSet = barChartData => {
  return {
    type: 'bar',
    label: barChartData.name,
    data: barChartData.dataSet,
    fill: false,
    backgroundColor: barChartData.color || defaultColorBarChart,
    borderColor: barChartData.color || defaultColorBarChart,
    hoverBackgroundColor: barChartData.color || defaultColorBarChart,
    hoverBorderColor: barChartData.color || defaultColorBarChart,
    yAxisID: 'y-axis-1'
  }
}

const buildMixChartDataSet = ({ lineChartData, barChartData }) => {
  const lineChartDataSet = buildLineChartDataSet(lineChartData);
  const barChartDataSet = buildBarChartDataSet(barChartData);
  return {
    datasets: [lineChartDataSet, barChartDataSet]
  }
}

const buildMixChartOption = ({ labels, barChartData }) => {
  const events = barChartData.events;
  const eventClicks = events ? events.click : null;
  const barWidthObj = barChartData.dataSet.length > 6 ? { barPercentage: 0.9 } : { barPercentage: 0.4 };

  return {
    onClick: (e, item) => {
      if (item && item.length == 2) {
        if (eventClicks && eventClicks.length > 0) {
          const eventClick = eventClicks.find(_ => _.columnIndex === item[1]._index);
          eventClick && eventClick.callBack && eventClick.callBack();
        }
      }
    },
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    responsive: true,
    elements: {
      line: {
        fill: false
      }
    },
    hover: {
      animationDuration: 0
    },
    legend: {
      display: true,
      position: 'bottom'
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
          const suffix = dataset.type === "line" ? "%" : '';
          const meta = self.getDatasetMeta(datasetIndex);
          meta.data.forEach(function (element, elementIndex) {
            const value = dataset.data[elementIndex];
            const text = numberFormat.formatDecimal(value) + suffix;
            const textWidth = ctx.measureText(text).width;
            const yOffset = value > 0 ? 6 : -7;
            ctx.fillText(text, element._model.x - (textWidth / 2), element._model.y - yOffset);
          });
        });
      }
    },
    scales: {
      xAxes: [
        {
          ...barWidthObj,
          ...{
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            labels: labels
          }
        }
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            display: false
          },
          labels: {
            show: true
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',

          labels: {
            show: true
          }
        }
      ]
    }
  };
}

export default class MixBarLineChart extends Component {
  constructor(props) {
    super(props);
  }

  _renderFooter = () => {
    return <div className="chart-footer">
    </div>
  }

  _renderChart() {
    const { lineChartData, barChartData, labels } = this.props;
    const data = buildMixChartDataSet({ lineChartData, barChartData });
    const options = buildMixChartOption({ labels, barChartData });

    return <Bar
      data={data}
      options={options}
    />
  }

  render() {
    const { header } = this.props;
    return (
      <div className="chart-container">
        {header && header()}
        {this._renderChart()}
        {this._renderFooter()}
      </div>
    );
  }
}
