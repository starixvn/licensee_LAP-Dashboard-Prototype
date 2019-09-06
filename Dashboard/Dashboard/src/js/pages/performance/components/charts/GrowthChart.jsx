import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MixBarLineChart from './base/MixBarLineChart';

class GrowthChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  componentDidMount() {
  }

  render() {
    const { currentMeasuremnent } = this.props;
    return (
      <React.Fragment>
        <MixBarLineChart title={`${currentMeasuremnent || ''} Growth`} />
      </React.Fragment>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  }, dispatch);
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GrowthChart)
