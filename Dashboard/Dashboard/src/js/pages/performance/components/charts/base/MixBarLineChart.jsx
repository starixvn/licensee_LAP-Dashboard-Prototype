import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import numberFormat from '../../../../../lib/numberFormat';

const defaultColorBarChart = ['#F1A837', '#36A2EB'];
const defaultColorLineChart = '#690499';

const buildLineChartDataSet = lineChartData => {
  return {
    label: lineChartData.name,
    type: 'line',
    lineTension: 0,
    pointRadius: 2,
    borderWidth: 2,
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
  return barChartData.map((_, index) => {
    return {
      type: 'bar',
      label: _.name,
      data: _.dataSet,
      hidden: _.hidden === undefined ? false : _.hidden,
      fill: false,
      backgroundColor: _.color || defaultColorBarChart[index],
      borderColor: _.color || defaultColorBarChart[index],
      hoverBackgroundColor: _.color || defaultColorBarChart[index],
      hoverBorderColor: _.color || defaultColorBarChart[index],
      yAxisID: 'y-axis-1'
    }
  });
}

const buildMixChartDataSet = ({ lineChartData, barChartData }) => {
  const lineChartDataSet = buildLineChartDataSet(lineChartData);
  const barChartDataSet = buildBarChartDataSet(barChartData);
  return {
    datasets: [lineChartDataSet, ...barChartDataSet]
  }
}

const drawTextToTopChart = function () {
  const self = this,
    chart = this.chart,
    ctx = chart.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#555";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  self.data.datasets.forEach(function (dataset, datasetIndex) {
    const isLineChart = dataset.type === "line" ? true : false;
    const meta = self.getDatasetMeta(datasetIndex);
    meta.data.forEach(function (element, elementIndex) {
      const value = dataset.data[elementIndex];
      const text = isLineChart ? value + '%' : numberFormat.nFormatter(value);
      const yOffset = value > 0 ? 6 : -7;
      const xLabel = element._model.x - (isLineChart ? 0 : element._model.width / 2);
      ctx.fillText(text, xLabel, element._model.y - yOffset);
    });
  });
}

const buildMixChartOption = ({ labels, barChartData, leftAxisName, rightAxisName }) => {
  const barWidthObj = barChartData[0].dataSet.length >= 6 ? { barPercentage: 0.9, categoryPercentage: 0.5 } : { barPercentage: 0.4, categoryPercentage: 0.5 };
  return {
    onClick: function (e, item) {
      const activeElement = this.getElementAtEvent(e);
      if (activeElement && activeElement.length > 0 && activeElement[0]._datasetIndex) {
        const datasetIndex = activeElement[0]._datasetIndex - 1;
        const events = barChartData[datasetIndex].events;
        const eventClicks = events ? events.click : null;
        if (eventClicks && eventClicks.length > 0) {
          const colIndex = item[0]._index;
          const eventClick = eventClicks.find(_ => _.columnIndex === colIndex);
          eventClick && eventClick.callBack && eventClick.callBack();
        }
      }
    },
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          const dataSet = data.datasets[tooltipItem.datasetIndex];
          if (dataSet.type === 'bar') {
            return numberFormat.formatDecimal(dataSet.data[tooltipItem.index]);
          }
          return tooltipItem.value;
        }
      }
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
      position: 'bottom',
      labels: {
        filter: function (item) {
          return !item.hidden;
        },
        usePointStyle: true,
        boxWidth: 8,
        padding: 20
      },
      onClick: e => e.stopPropagation()
    },
    animation: {
      onComplete: drawTextToTopChart
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20
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
          labels: {
            show: true
          },
          scaleLabel: {
            display: true,
            fontSize: 13,
            fontFamily: "'Roboto'",
            labelString: leftAxisName
          },
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return numberFormat.nFormatter(value);
            }
          }
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          labels: {
            show: true
          },
          gridLines: {
            display: false
          },
          scaleLabel: {
            display: true,
            labelString: rightAxisName
          },
          ticks: {
            beginAtZero: true
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

  _renderChart() {
    const { lineChartData, barChartData, labels, leftAxisName, rightAxisName} = this.props;
    const data = buildMixChartDataSet({ lineChartData, barChartData });
    const options = buildMixChartOption({ labels, barChartData, leftAxisName, rightAxisName });

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
      </div>
    );
  }
}
