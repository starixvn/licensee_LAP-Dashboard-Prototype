import React from 'react';
import { DateRange } from '@9softstudio/react-datepicker';
import moment from 'moment';
import { datetimeDefaultData } from '../lib/constants';
import datetimeFormat from '../lib/datetimeFormat';

const iconElement = (<span className="oi oi-calendar"></span>);

export default class DateTimePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputDateRef = React.createRef();

    this.dateInfo = {
      fromDate: props.fromDate || moment().clone(),
      toDate: props.toDate || moment().clone(),
      limitedMonthRange:  this.props.limitedMonthRange || datetimeDefaultData.limitedMonthRange,
      format: props.format || datetimeDefaultData.dateFormat
    };

    this.state = {
      fromDate: this.dateInfo.fromDate,
      toDate: this.dateInfo.toDate
    }
  }

  handleChangeDateRange = value => {
    const dateRange = {
       fromDate: value.startDate,
       toDate: value.endDate
    }
    this.setState(dateRange, this.props.onChangeDateRange(datetimeFormat.formatDateRange(dateRange, this.dateInfo.format)));
  }

  render() {
    const dateInfo = this.dateInfo;
    const { fromDate, toDate } = this.state;

    return (
      <React.Fragment>
        <DateRange startDate={fromDate} endDate={toDate}
          minDate={dateInfo.minDate} maxDate={dateInfo.maxDate}
          today={dateInfo.toDate} limitedMonthRange={dateInfo.limitedMonthRange}
          onChange={this.handleChangeDateRange}
          iconElement={iconElement}
          />
      </React.Fragment>
    );
  }
}
