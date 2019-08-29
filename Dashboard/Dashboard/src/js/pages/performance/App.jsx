import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { ActionCreators } from './actions/index'
import { connect } from 'react-redux';
class PerformanceDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            langCode: null,
            wgStatus: null
        }
    }

    componentDidMount() {
        this.props.isSelected && this.props.onChildReturnState(this.state);
        this.props.getCurrencyInfo();
    }

    render() {
        return (
            <h1>Performance Dashboard</h1>
        );
    };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return Object.assign({}, state);
}
export default connect(mapStateToProps, mapDispatchToProps)(PerformanceDashboard)
