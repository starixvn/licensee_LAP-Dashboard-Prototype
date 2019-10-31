import { getCurrentTime } from '../../../lib/constants';
import { getPeriodByNumberOfLastMonths, getPreviousPeriod } from '../../../lib/dateTimeHelper';

export const MEASUREMENT_ID = {
  'TURNOVER': 1,
  'GROSS_PROFIT': 2,
  'MARGIN': 3
}

export const defaultData = {
  measurements: [
    { id: MEASUREMENT_ID.TURNOVER, name: 'Turnover' },
    { id: MEASUREMENT_ID.GROSS_PROFIT, name: 'Gross Profit' },
    { id: MEASUREMENT_ID.MARGIN, name: 'Margin' },
  ],
  getComparePeriods: () => {
    const currentPeriod = getPeriodByNumberOfLastMonths(getCurrentTime(), 3);
    const previousPeriod = getPreviousPeriod(currentPeriod);
    return {
      currentPeriod,
      previousPeriod
    }
  }
}

export const tabMenuKey = {
  overview: 'overview',
  currency: 'currency',
  product: 'product',
  bettype: 'bettype',
  platform: 'platform'
}
