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

export const getMajorChangeList = measurementId => {
  let measurement = defaultData.measurements.find(_ => _.id === measurementId);
  measurement = measurement || {};
  return [
    {
      key: 'currencyTopChange',
      title: 'MAJOR CHANGES - By CURRENCY',
      header: ['Currency', measurement.name, '%CHG'],
      data: []
    },
    {
      key: 'bettypeTopChange',
      title: 'MAJOR CHANGES - By BETTYPES',
      header: ['Bettype', measurement.name, '%CHG'],
      data: []
    },
    {
      key: 'platformTopChange',
      title: 'MAJOR CHANGES - By PLATFORM',
      header: ['Platform', measurement.name, '%CHG'],
      data: []
    },
    {
      key: 'productTopChange',
      title: 'MAJOR CHANGES - By PRODUCT',
      header: ['Product', measurement.name, '%CHG'],
      data: []
    }
  ]
}

