import React, { Component } from 'react';
import { langCode } from '../../../../lib/constants';
import languageApi from '../../../../lib/languageApi';

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
        <span>{languageApi.getRes(langCode, "comparedWith")}</span>
        <a className="btn-submit" href="#">{languageApi.getRes(langCode, "previousPeriod")}</a>
        <span>{languageApi.getRes(langCode, "samePeriod")}</span>
        <select
        >
          {years && years.map(_ => <option key={`period_${_}`} value={_}>{_}</option>)}
        </select>
      </div>
    );
  }
}
