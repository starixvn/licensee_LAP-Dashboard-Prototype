import React from 'react';
import MonthRangePicker, { isPeriodEqual } from './MonthRangePicker';
import { getDistanceBetweenPeriod, getPreviousPeriod, getPreviousYear, getPeriodByNumberOfLastMonths, getPeriodByLastQuarter } from '../lib/dateTimeHelper';
import { getCurrentTime } from '../lib/constants';
import languageApi from '../lib/languageApi';
import { langCode } from '../lib/constants';

const previousPeriodQuickSelections = [
  {
    label: "Previous Period",
    onSelect: selectedCurrentPeriod => getPreviousPeriod(selectedCurrentPeriod)
  },
  {
    label: "Previous Year",
    onSelect: selectedCurrentPeriod => getPreviousYear(selectedCurrentPeriod)
  }
]

const currentPeriodQuickSelections = [
  {
    label: "Last Month",
    onSelect: currentTime => getPeriodByNumberOfLastMonths(currentTime, 1)
  },
  {
    label: "Last Quarter",
    onSelect: currentTime => getPeriodByLastQuarter(currentTime)
  },
  {
    label: "Last 3 months",
    onSelect: currentTime => getPeriodByNumberOfLastMonths(currentTime, 3)
  },
  {
    label: "Last 6 months",
    onSelect: currentTime => getPeriodByNumberOfLastMonths(currentTime, 6)
  }
]

export default class CoupleMonthRangePicker extends React.PureComponent {
  constructor(props) {
    super(props);
    const { currentPeriod, previousPeriod } = this.props;
    this.state = {
      currentPeriod: currentPeriod,
      previousPeriod: previousPeriod
    }
  }

  _onChangeRangeCurrentPeriod = selectedRange => {
    const { onChangeRangeOfTwoPeriod } = this.props;
    const previousPeriod = getPreviousPeriod(selectedRange);
    const periods = {
      currentPeriod: selectedRange,
      previousPeriod
    }

    this.setState(periods, () => onChangeRangeOfTwoPeriod && onChangeRangeOfTwoPeriod(periods));
  }

  _onChangeRangePreviousPeriod = selectedRange => {
    const { onChangeRangeOfTwoPeriod } = this.props;
    const periods = {
      currentPeriod: this.state.currentPeriod,
      previousPeriod: selectedRange
    }
    this.setState(periods, () => onChangeRangeOfTwoPeriod && onChangeRangeOfTwoPeriod(periods));
  }

  _renderCurrentPeriodQuickSelection = self => {
    return currentPeriodQuickSelections
      .map((_, index) => {
        const isSelected = isPeriodEqual(_.onSelect(getCurrentTime()), self.state);
        return <div key={`cp_selection_${index}`} className={`quick-selection ${isSelected ? 'quick-selection-active' : ''}`}
          onClick={() => {
            const currentPeriod = _.onSelect(getCurrentTime());
            self.setState(currentPeriod);
          }}>{_.label}
        </div>
      });
  }

  _renderPreviousPeriodQuickSelection = self => {
    return previousPeriodQuickSelections
      .map((_, index) => {
        const { currentPeriod } = this.state;
        const isSelected = isPeriodEqual(_.onSelect(currentPeriod), self.state);
        return <div key={`pp_selection_${index}`} className={`quick-selection ${isSelected ? 'quick-selection-active' : ''}`}
        onClick={() => {
          const previousPeriod = _.onSelect(currentPeriod);
          self.setState(previousPeriod)
        }}>{_.label}
      </div>
      });
  }

  render() {
    const { currentPeriod, previousPeriod } = this.state;
    const rangeTo = getDistanceBetweenPeriod(currentPeriod) + 1;

    return (<div className="couple-month-range">
      <div className="month-range-item">
        <div className="label">{languageApi.getRes(langCode, "currerntPeriodPicker")}</div>
        <MonthRangePicker
          from={currentPeriod.from}
          to={currentPeriod.to}
          onChangeRange={this._onChangeRangeCurrentPeriod}
          quickSelections={this._renderCurrentPeriodQuickSelection} />
      </div>
      <div className="month-range-item">
        <div className="label">{languageApi.getRes(langCode, "previousPeriodPicker")}</div>
        {<MonthRangePicker
          isDisableTo={true}
          range={rangeTo}
          maxMonthFrom={previousPeriod.from.month + 1}
          maxYearFrom={previousPeriod.from.year}
          from={previousPeriod.from}
          to={previousPeriod.to}
          onChangeRange={this._onChangeRangePreviousPeriod}
          quickSelections={this._renderPreviousPeriodQuickSelection} />}
      </div>
    </div>);
  }
}

