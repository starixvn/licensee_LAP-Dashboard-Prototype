import OverviewTab from '../components/tabs/OverviewTab';
import CurrencyTab from '../components/tabs/CurrencyTab';

export const defaultData = {
  measurements: [
    { id: 1, name: 'Turnover' },
    { id: 2, name: 'Gross Profit' },
    { id: 3, name: 'Margin' },
  ]
}

export const tabMenuList = [
  { key: 'overview', name: 'Overview', component: OverviewTab },
  { key: 'currency', name: 'Currency', component: CurrencyTab }
]

export const majorChangeList = [
  {
    title: 'MAJOR CHANGES - By CURRENCY',
    header: ['Currency', 'Turnover', '%CHG'],
    data: []
  },
  {
    title: 'MAJOR CHANGES - By BETTYPES',
    header: ['Bettype', 'Turnover', '%CHG'],
    data: []
  },
  {
    title: 'MAJOR CHANGES - By PLATFORM',
    header: ['Platform', 'Turnover', '%CHG'],
    data: []
  }
]
