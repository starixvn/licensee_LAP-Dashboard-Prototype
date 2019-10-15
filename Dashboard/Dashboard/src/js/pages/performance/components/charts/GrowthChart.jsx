import React, { PureComponent } from 'react';
import MixBarLineChart from './base/MixBarLineChart';

export default class GrowthChart extends PureComponent {
  constructor(props) {
    super(props);
    this.refSelf = React.createRef();
  }

  _renderHeaderChart = () => {
    const { showBackIcon, backToDefaultChart } = this.props;
    return <div className="chart-title">
      {showBackIcon ? <div className="back-icon" onClick={backToDefaultChart}>
        <i className="arrow-left"></i>
        {'Go back'}
      </div> : null}
    </div>;
  }

  render() {
    const { currentMeasuremnent, lineChartData, barChartData, labels, getStyle } = this.props;

    return (
      <div className="info-zone-container" ref={this.refSelf} style={getStyle ? getStyle(this.refSelf) : {}}>
        <div className="info-zone-header">
          {`${currentMeasuremnent || ''} Growth`}
          </div>
        <div className="info-zone-body">
        <MixBarLineChart
            header={this._renderHeaderChart}
            lineChartData={lineChartData}
            barChartData={barChartData}
            labels={labels}
          />
        </div>
      </div>
    );
  }
}
