import React from 'react';
import { DateRange } from '@9softstudio/react-datepicker';
import moment from 'moment';

const iconElement = (<span className="oi oi-calendar"></span>);

export default class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.inputDateRef = React.createRef();
    this.now = new Date();

    this.dateInfo = {
      fromDate: moment().clone(),
      toDate: moment().clone(),
      minDate: '03/15/2000',
      maxDate: '12/30/2030',
      limitedMonthRange: 3
    };

    this.state = {
      fromDate: this.dateInfo.fromDate,
      toDate: this.dateInfo.toDate,
      singleDateValue: `${this.now.getMonth() + 1}/${this.now.getDate()}/${this.now.getFullYear()}`,
      isEnableSingleDate: true
    }
  }

  handleChangeDateRange = (date, isValidMonthRange = true) => {
    this.setState({ fromDate: date.startDate, toDate: date.endDate });

  }

  handleChangeDate = (date) => {
    this.setState({ singleDateValue: date });
  }

  handleClickChangeDate = () => {
    this.setState({ singleDateValue: this.inputDateRef.current.value });
  }

  handleToggle = () => {
    this.setState((prevState) => {
      return {
        isEnableSingleDate: !prevState.isEnableSingleDate
      }
    })
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
