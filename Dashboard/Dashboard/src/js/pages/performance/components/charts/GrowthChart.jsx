import React, { Component } from 'react';
import MixBarLineChart from './base/MixBarLineChart';

export default class GrowthChart extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  _renderBackIcon() {
    const { showBackIcon, backToDefaultChart } = this.props;
    return showBackIcon ? <div className="" onClick={backToDefaultChart}>
      <i class="arrow-left"></i>
    </div> : null;
  }

  _renderHeaderChart = () => {
    const { currentMeasuremnent } = this.props;

    const title= `${currentMeasuremnent || ''} Growth` ;

    return <div className="chart-title">
      {this._renderBackIcon()}
      {title}
    </div>;
  }

  render() {
    const { lineChartData, barChartData, labels } = this.props;
    return (
      <React.Fragment>
        <MixBarLineChart header={this._renderHeaderChart}
         lineChartData={lineChartData}
         barChartData={barChartData}
         labels={labels}
        />
      </React.Fragment>
    );
  }
}
