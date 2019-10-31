import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setAnalyticData } from '../../actions/analyticDataAction';

class ProductTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPeriodGrowthDataType: true,
      selectedDrillDownColumn: 0,
      selectedDrillDownColumnName: ''
    };
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  render() {

    return <div>
      {'Product tab'}
    </div>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {
    setAnalyticData
  }), dispatch);
}

function mapStateToProps(state) {
  const { analyticData } = state;
  return Object.assign({}, {
    analyticData
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductTab);
