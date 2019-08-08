import React, { Component } from 'react';

export default class PerformanceDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            langCode: null,
            wgStatus: null
        }
    }

    componentDidMount() {
        this.props.isSelected && this.props.onChildReturnState(this.state);
    }

    render() {
        return (
            <h1>Performance Dashboard</h1>
        );
    };
}