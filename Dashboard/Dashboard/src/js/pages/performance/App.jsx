import React, { Component } from 'react';

export default class PerformanceDashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onChildReturnState();
    }

    render() {
        return (
            <h1>Performance Dashboard</h1>
        );
    };
}