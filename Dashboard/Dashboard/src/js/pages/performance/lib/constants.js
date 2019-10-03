import OverviewTab from '../tabs/overview/OverviewTab';
import CurrencyTab from '../tabs/currency/CurrencyTab';
import { getCurrentTime } from '../../../lib/constants';

export const defaultData = {
  measurements: [
    { id: 1, name: 'Turnover' },
    { id: 2, name: 'Gross Profit' },
    { id: 3, name: 'Margin' },
  ],
  getComparePeriods: () => {
    const currentTime = getCurrentTime();
    return {
      currentPeriod: {
        from: currentTime,
        to: currentTime
      },
      previousPeriod: {
        from: currentTime,
        to: currentTime
      }
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
    }
  ]
}


