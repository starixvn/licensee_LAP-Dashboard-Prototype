import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import numberFormat from '../../../../../lib/numberFormat';

const buildLineChartDataSet = lineChartData => {
  return {
    label: lineChartData.name,
    type: 'line',
    lineTension: 0,
    data: lineChartData.dataSet,
    fill: false,
    borderColor: 'rgba(75, 172, 198, 1)',
    backgroundColor: 'rgba(75, 172, 198, 1)',
    pointBorderColor: 'rgba(75, 172, 198, 1)',
    pointBackgroundColor: 'rgba(75, 172, 198, 1)',
    pointHoverBackgroundColor: 'rgba(75, 172, 198, 1)',
    pointHoverBorderColor: 'rgba(75, 172, 198, 1)',
    yAxisID: 'y-axis-2'
  }
}

const buildBarChartDataSet = barChartData => {
  return {
    type: 'bar',
    label: barChartData.name,
    data: barChartData.dataSet,
    fill: false,
    backgroundColor: 'rgba(247,150,70,1)',
    borderColor: 'rgba(247,150,70,0.5)',
    hoverBackgroundColor: 'rgba(247,150,70,1)',
    hoverBorderColor: 'rgba(247,150,70,0.5)',
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
   /*{
      click: [
        {
          columnIndex: 0,
          callBack: () => { }
        }
      ]

   //}
   // [{ columnIndex: 0, onClick: }]*/
  return {
    onClick: (e, item) => {
      if(item && item.length == 2) {
        if(eventClicks && eventClicks.length > 0) {
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
          display: true,
          gridLines: {
            display: false
          },
          labels: {
            show: true
          },
          labels: labels
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

const plugins = [{
  afterDraw: (chartInstance, easing) => {
    const ctx = chartInstance.chart.ctx;
  }
}];

export default class MixBarLineChart extends Component {
  constructor(props) {
    super(props);
  }

  _renderFooter = () => {
    return <div className="chart-footer">
    </div>
  }

  _renderTitle = () => {
    const { title } = this.props;
    return <div className="chart-title">
      {title}
    </div>;
  }

  _renderChart() {
    const { lineChartData, barChartData, labels } = this.props;
    const data = buildMixChartDataSet({ lineChartData, barChartData });
    const options = buildMixChartOption({ labels, barChartData });
    return <Bar
      data={data}
      options={options}
      plugins={plugins}
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
