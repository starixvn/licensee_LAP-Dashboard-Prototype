import React, { PureComponent } from 'react';
import MixBarLineChart from './base/MixBarLineChart';

export default class GrowthChart extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderHeaderChart = () => {
    const { showBackIcon, backToDefaultChart } = this.props;
    return <div className="chart-title">
      {showBackIcon ? <div className="left" onClick={backToDefaultChart}>
        <i className="arrow-left"></i>
        {'Go back'}
      </div> : null}
    </div>;
  }

  render() {
    const { currentMeasuremnent, lineChartData, barChartData, labels } = this.props;

    return (
      <div className="info-zone-container">
        <div className="info-zone-header">
          {`${currentMeasuremnent || ''} Growth`}
          </div>
        <div className="info-zone-body">
        <div className="side-chart left-chart">{`${currentMeasuremnent || ''}(thousand)`}</div>
        <MixBarLineChart
            header={this._renderHeaderChart}
            lineChartData={lineChartData}
            barChartData={barChartData}
            labels={labels}
          />
        <div className="side-chart right-chart">{'Growth rate(%)'}</div>
        </div>
      </div>
    );
  }
}
