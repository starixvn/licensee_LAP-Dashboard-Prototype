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

  componentDidMount() {
    const { getStyle } = this.props;
    getStyle && this.setState({
      style: getStyle(this.refSelf)
    });
  }

  render() {
    const { title, barChartData, labels } = this.props;
    const { style } = this.state;

    return (
      <div className="info-zone-container" ref={this.refSelf} style={style}>
        <div className="info-zone-header">
          {title}
        </div>
        <div className="info-zone-body">
          <StackedBarChart
            barChartData={barChartData}
            labels={labels}
          />
        </div>
      </div>
    );
  }
}
