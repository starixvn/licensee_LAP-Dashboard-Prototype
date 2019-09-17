import React, { PureComponent } from 'react';
import { langCode } from '../../../../lib/constants';
import languageApi from '../../../../lib/languageApi';
import { ComparisonType } from '../../lib/constants';

export default class TimeComparisonSelect extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  _onChangeComparison = (value, type) => {
    const { onChangeComparison } = this.props;
    onChangeComparison && onChangeComparison({ type, value });
  }

  _getRangeYears() {
    const { selectedDateRange } = this.props;
    return [
      2018,
      2017,
      2016
    ]
  }

  render() {
    const { selectedComparison } = this.props;
    const rangeYears = this._getRangeYears();

    return (
      <div className="time-comparison">
        <span>{languageApi.getRes(langCode, "comparedWith")}</span>
        <a className="btn-submit" href="#" onClick={e => this._onChangeComparison(null, ComparisonType.PREVIOUS_PERIOD)}>{languageApi.getRes(langCode, "previousPeriod")}</a>
        <span>{languageApi.getRes(langCode, "samePeriod")}</span>
        <select
          onChange={e => this._onChangeComparison(e.target.value, ComparisonType.SAME_PERIOD)}
          value={selectedComparison.value || rangeYears[0]}
        >
          {rangeYears && rangeYears.map(_ => <option key={`period_${_}`} value={_} >{_}</option>)}
        </select>
      </div>
    );
  }
}
