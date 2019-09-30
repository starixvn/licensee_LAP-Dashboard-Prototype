import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import numberFormat from '../../../../../lib/numberFormat';

//
const data = {
  //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sales',
    type: 'line',
    lineTension: 0,
    data: [51, -20, 40, -35, 60, 37, 105],
    fill: false,
    borderColor: 'rgba(75, 172, 198, 1)',
    backgroundColor: 'rgba(75, 172, 198, 1)',
    pointBorderColor: 'rgba(75, 172, 198, 1)',
    pointBackgroundColor: 'rgba(75, 172, 198, 1)',
    pointHoverBackgroundColor:'rgba(75, 172, 198, 1)',
    pointHoverBorderColor: 'rgba(75, 172, 198, 1)',
    yAxisID: 'y-axis-2'
  },
  {
    type: 'bar',
    label: 'Visitor',
    data: [200, 185, 590, 621, 250, 400, 95],
    fill: false,
    backgroundColor: 'rgba(247,150,70,1)',
    borderColor: 'rgba(247,150,70,0.5)',
    hoverBackgroundColor: 'rgba(247,150,70,1)',
    hoverBorderColor: 'rgba(247,150,70,0.5)',
    yAxisID: 'y-axis-1'
  }]
};

const options = {
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
    display: false
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
          const text = numberFormat.formatDecimal(value);
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
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
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
      }
    ]
  }
};

const plugins = [{
  afterDraw: (chartInstance, easing) => {
    const ctx = chartInstance.chart.ctx;
  }
}];

class MixBarLineChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chart-container">
        <div className="chart-title">
          {this.props.title}
        </div>
        <Bar
          data={data}
          options={options}
          plugins={plugins}
        />
        <div className="chart-footer">
          <span>ABC</span>
        </div>
      </div>
    );
  }
}

export default MixBarLineChart
