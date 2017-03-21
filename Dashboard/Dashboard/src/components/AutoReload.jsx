import React from 'react';
import LocalStorageHelper from '../Modules/LocalStorageHelper'

export default class AutoReload extends React.Component {
    constructor(props) {
        super(props);
        const countdowns = LocalStorageHelper.getWidgetReloadCountdown();
        let countdown = countdowns[this.props.dataKey];

        if (!countdown) {
            countdown = this.props.defaultCountdown;
        }

        this.state = {
            countdown: countdown,
            currentCountdown: countdown
        };

    }

    componentDidMount() {
        if (this.state.countdown > 0) {
            this._startTimer();
        }
    }

    componentWillUnmount() {
        this._stopTimer();
    }

    _onTick() {
        let countdown = this.state.currentCountdown;

        if (countdown === 0) {
            this.props.reloadCallback();
            countdown = this.state.countdown;
        } else {
            countdown--;
        }

        this.setState({
            currentCountdown: countdown
        });
    }

    _startTimer() {
        this.timerId = setInterval(() => this._onTick(), 1000);
    }

    _stopTimer() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }

    render() {
        return (<span>{this.state.currentCountdown}s</span>);
    }
}