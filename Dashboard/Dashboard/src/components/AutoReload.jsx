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
            currentCountdown: countdown,
            isShowSelection: false
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

    _onCounterClick() {
        this.setState({ isShowSelection: !this.state.isShowSelection });
    }

    _onSelectCounterValue(value) {
        this.setState({
            isShowSelection: false,
            countdown: value,
            currentCountdown: value
        });

        const countdowns = LocalStorageHelper.getWidgetReloadCountdown();
        countdowns[this.props.dataKey] = value;
        LocalStorageHelper.saveWidgetReloadCountdown(countdowns);
    }

    _renderCountdownSelection() {
        return (<ul className="dropdown-timer" style={{
            display: (this.state.isShowSelection ? '' : 'none'),
            //position: 'absolute', top: 0, right: 22
        }}>{(this.props.countdownValues || []).map(value => (<li onClick={() => this._onSelectCounterValue(value)}>{value}</li>))}</ul>);
    }

    render() {
        return (<div className="btn-refresh right" style={{
            //position: 'absolute', top: 0, right: 22
        }}>
            <i className="icon-refresh"></i>
            <span onClick={() => this._onCounterClick()}>{this.state.currentCountdown}s</span>
            {this._renderCountdownSelection()}
        </div>);
    }
}