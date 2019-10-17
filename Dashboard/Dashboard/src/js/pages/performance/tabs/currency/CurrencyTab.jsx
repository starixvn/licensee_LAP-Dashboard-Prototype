import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { setAnalyticData } from '../../actions/analyticDataAction';
import { connect } from 'react-redux';

export class CurrencyTab extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setAnalyticData({});
  }

  render() {
    return (
      <div>
        Currency Tab
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setAnalyticData
  }, dispatch);
}

function mapStateToProps(state) {
  const {} = state;
  return Object.assign({}

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTab);
