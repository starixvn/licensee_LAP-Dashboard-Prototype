
import { datetimeDefaultData } from './constants';

export default class datetimeFormat {
  static formatDateDefault(momentObj) {
    return formatDate(momentObj, datetimeDefaultData.dateFormat);
  }

  static formatDate(momentObj, format) {
    return momentObj.format(format);
  }

  static formatDateRange(dateRange, format) {
    format = format || datetimeDefaultData.dateFormat;
    return {
      fromDate: datetimeFormat.formatDate(dateRange.fromDate, format),
      toDate: datetimeFormat.formatDate(dateRange.toDate, format),
    };
  }
}
