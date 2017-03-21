import React from 'react';

export default class AutoReload extends React.Component {
    constructor(props) {
        super(props);
        this._onRefresh();
    }

    _onRefresh() {
        if (this.props.refresh) {
            this.props.callbackParent();
            setTimeout(() => this._onRefresh(), this.props.refresh);
        }
    }

    render() {
        return (<span {...this.props}>{this.props.children}</span>);
    }
}