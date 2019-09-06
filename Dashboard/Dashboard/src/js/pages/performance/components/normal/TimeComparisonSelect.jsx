import React, { Component } from 'react';

export default class TimeComparisonSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    const { years } = this.props;

    return (
      <div className="time-comparison">
        <span>{'Compared with'}</span>
        <a className="btn-submit" href="#">{'Previous Period'}</a>
        <span>{'Same period of'}</span>
        <select
        >
          {years && years.map(_ => <option key={`period_${_}`} value={_}>{_}</option>)}
        </select>
      </div>
    );
  }
}
