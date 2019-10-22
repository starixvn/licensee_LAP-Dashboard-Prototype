import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import numberFormat from '../../../../../lib/numberFormat';

const defaultColorBarChart = ['#2B465B', '#37C2CC', '#F15D21', '#F1A837', '#208E9B', '#4C6375'];

const buildChartDataSet = barChartData => {
  return {
    datasets: barChartData.map((_, index) => {
      return {
        type: 'bar',
        label: _.name,
        data: _.dataSet,
        fill: false,
        backgroundColor: _.color || defaultColorBarChart[index],
        borderColor: _.color || defaultColorBarChart[index],
        hoverBackgroundColor: _.color || defaultColorBarChart[index],
        hoverBorderColor: _.color || defaultColorBarChart[index],
      }
    })
  };
}

const drawTextToTopChart = function() {
  const self = this,
    chart = this.chart,
    ctx = chart.ctx;
  ctx.textAlign = "center";
  ctx.fillStyle = "#FFFFFF";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  self.data.datasets.forEach(function (dataset, datasetIndex) {
    const meta = self.getDatasetMeta(datasetIndex);
    meta.data.forEach(function (element, elementIndex) {
      const value = dataset.data[elementIndex];
      const text = value + '%';
      const textWidth = ctx.measureText(text).width;
      const yOffset = value > 0 ? 10 : -10;
      const xLabel = element._model.x - textWidth/3;
      ctx.fillText(text, xLabel, element._model.y + yOffset);
    });
  });
}

const buildChartOption = ({ labels, barChartData }) => {
  const leftAxisName = barChartData[0].name;

  return {
    tooltips: {
      callbacks: {
          label: function(tooltipItem, data) {
            const dataSet = data.datasets[tooltipItem.datasetIndex];
            if(dataSet.type === 'bar') {
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
          top: 30,
          bottom: 20
      }
    },
    scales: {
      xAxes: [
        {
          ...{ barPercentage: 0.4 },
          ...{
            display: true,
            gridLines: {
              display: false
            },
            labels: {
              show: true
            },
            labels: labels,
            stacked: true
          }
        }
      ],
      yAxes: [
        {
          display: true,
          position: 'left',
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
          },
          stacked: true
        }
      ]
    }
  };
}

export default class StackedBarChart extends Component {
  constructor(props) {
    super(props);
  }

  _renderChart() {
    const { barChartData, labels } = this.props;
    const data = buildChartDataSet(barChartData);
    const options = buildChartOption({ labels, barChartData });
    return <Bar
      data={data}
      options={options}
    />
  }

  render() {
    return (
      <div className="chart-container">
        {this._renderChart()}
      </div>
    );
  }
}
