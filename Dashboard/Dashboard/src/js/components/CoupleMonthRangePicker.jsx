import React from 'react';
import MonthRangePicker from './MonthRangePicker';
import { getDistanceBetweenPeriod, addMonths } from '../lib/dateTimeHelper';
import { getCurrentTime } from '../lib/constants';
import languageApi from '../lib/languageApi';
import { langCode } from '../lib/constants'

const _getPreviousPeriod = currentPeriod => {
  const { from } = currentPeriod;
  const distance = getDistanceBetweenPeriod(currentPeriod);

  const prevPeriodTo = {
    month: (from.month - 1) || 12,
    year: from.month - 1 ? from.year : from.year - 1
  }

  let dateTo = new Date(prevPeriodTo.year, prevPeriodTo.month - 1);
  dateTo = addMonths(dateTo, distance);
  const prevPeriodFrom = {
    month: dateTo.getMonth() + 1,
    year:  dateTo.getFullYear()
  }

  return {
    from: prevPeriodFrom,
    to:  prevPeriodTo
  }
}

const _getPreviousYear = currentPeriod => {
  const { from, to } = currentPeriod;

  const prevPeriodFrom = {
    month: from.month,
    year:  from.year - 1
  }
  const prevPeriodTo = {
    month: to.month,
    year: to.year - 1
  }

  return {
    from: prevPeriodFrom,
    to:  prevPeriodTo
  }
}

const _getPeriodByNumberOfLastMonths = (currentTime, numberOfMonth) => {
  const { month, year } = currentTime;

  let date = new Date(year, month - 1);
  date = addMonths(date, -numberOfMonth);
  const from = {
    month: date.getMonth(),
    year: date.getFullYear()
  }

  const to = {
    month: (month - 1) || 12,
    year:  month - 1 ? year : year - 1
  }

  return { from, to }
}

const _previousPeriodQuickSelections = [
  {
    label: "Previous Period",
    onSelect: selectedCurrentPeriod => _getPreviousPeriod(selectedCurrentPeriod)
  },
  {
    label: "Previous Year",
    onSelect: selectedCurrentPeriod => _getPreviousYear(selectedCurrentPeriod)
  }
]

const _currentPeriodQuickSelections = [
  {
    label: "Last Month",
    onSelect: currentTime => _getPeriodByNumberOfLastMonths(currentTime, 1)
  },
  {
    label: "Last 3 months",
    onSelect: currentTime => _getPeriodByNumberOfLastMonths(currentTime, 3)
  },
  {
    label: "Last 6 months",
    onSelect: currentTime => _getPeriodByNumberOfLastMonths(currentTime, 6)
  }
]

export default class CoupleMonthRangePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    const { currentPeriod, previousPeriod, range } = this.props;
    const now = new Date();

    this.state = {
      currentPeriod: currentPeriod || {
        from: {
          year: now.getFullYear(),
          month: now.getMonth()
        },
        to: {
          year: now.getFullYear(),
          month: now.getMonth()
        }
      },
      previousPeriod: previousPeriod ||  {
        from: {
          year:now.getFullYear(),
          month: now.getMonth()
        },
        to: {
          year:now.getFullYear(),
          month: now.getMonth()
        }
      }
    }
  }

  _onChangeRangeCurrentPeriod = selectedRange => {
    const { onChangeRangeOfTwoPeriod } = this.props;
    const periods = {
      currentPeriod: selectedRange,
      previousPeriod: this.state.previousPeriod
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

  _renderCurrentPeriodQuickSelection = () => {
    return  _currentPeriodQuickSelections
          .map((_, index) => <div key={`cp_selection_${index}`} className="quick-selection"
              onClick={() => {
                const currentPeriod = _.onSelect(getCurrentTime());
                this.setState({ currentPeriod })
              }}>{_.label}
          </div>);
  }

  _renderPreviousPeriodQuickSelection = () => {
     return  _previousPeriodQuickSelections
                .map((_, index) => <div key={`pp_selection_${index}`} className="quick-selection"
                    onClick={() => {
                      const previousPeriod = _.onSelect(this.state.currentPeriod);
                      this.setState({ previousPeriod })
                    }}>{_.label}
                 </div>);
  }

  render() {
    const {currentPeriod, previousPeriod } = this.state;

    return (<div className="couple-month-range">
      <div className="month-range-item">
        <div className="label">{languageApi.getRes(langCode, "currerntPeriodPicker")}</div>
        <MonthRangePicker
        // from={currentPeriod.from}
        // to={currentPeriod.to}
         onChangeRange={this._onChangeRangeCurrentPeriod}
         quickSelections={this._renderCurrentPeriodQuickSelection}
         />
      </div>
      <div className="month-range-item">
        <div className="label">{languageApi.getRes(langCode, "previousPeriodPicker")}</div>
        <MonthRangePicker
        // from={previousPeriod.from}
        // to={previousPeriod.to}
        onChangeRange={this._onChangeRangePreviousPeriod}
         quickSelections={this._renderPreviousPeriodQuickSelection} />
      </div>
    </div>);
  }
}

