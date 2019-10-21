import OverviewTab from '../tabs/overview/OverviewTab';
import CurrencyTab from '../tabs/currency/CurrencyTab';
import { getCurrentTime } from '../../../lib/constants';
import { getPeriodByNumberOfLastMonths, getPreviousPeriod } from '../../../lib/dateTimeHelper';

export const defaultData = {
  measurements: [
    { id: 1, name: 'Turnover' },
    { id: 2, name: 'Gross Profit' },
    { id: 3, name: 'Margin' },
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
  currency: 'currency'
}

export const tabMenuList = [
  { key: tabMenuKey.overview, name: 'Overview', component: OverviewTab },
  { key: tabMenuKey.currency, name: 'Currency', component: CurrencyTab }
]
