import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import { connect } from 'react-redux';

export class CurrencyTab extends Component {
  constructor(props) {
    super(props);
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
  const {} = ActionCreators;
  return bindActionCreators({

  }, dispatch);
}

function mapStateToProps(state) {
  const { } = state;
  return Object.assign({}

  )
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyTab);
