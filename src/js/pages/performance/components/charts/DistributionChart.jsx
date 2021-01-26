import React, { PureComponent } from 'react';
import StackedBarChart from './base/StackedBarChart';

export default class DistributionChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      style: {}
    };
    this.refSelf = React.createRef();
  }

  static limitAxisY = {
     max: 100
  }

  componentDidMount() {
    const { getStyle } = this.props;
    getStyle && this.setState({
      style: getStyle(this.refSelf)
    });
  }

  render() {
    const { style } = this.state;
    const { title, distributionData, topDistributions, dataMapper } = this.props;
    const { labels, stackedChartData } = dataMapper(distributionData, topDistributions);

    return (
      <div className="info-zone-container" ref={this.refSelf} style={style}>
        <div className="info-zone-header">
          {title}
        </div>
        <div className="info-zone-body">
          <StackedBarChart
            stackedChartData={stackedChartData}
            labels={labels}
            limitAxisY={DistributionChart.limitAxisY}
          />
        </div>
      </div>
    );
  }
}
