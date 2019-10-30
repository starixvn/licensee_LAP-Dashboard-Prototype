import { MEASUREMENT_ID } from '../../../lib/constants';

export const growthChartConsts = [
  {
    periodName: 'Previous Period',
    periodFieldName: 'previousPeriodTotal',
    periodField: 'previousPeriod',
    identifyFieldName: 'previousPeriodIdentifies'
  },
  {
    periodName: 'Current Period',
    periodFieldName: 'currentPeriodTotal',
    periodField: 'currentPeriod',
    identifyFieldName: 'currentPeriodIdentifies',
    columnColor: '#36A2EB'
  }
]

export const diffenrenceTableRowDataConst = [
  {
    id: MEASUREMENT_ID.TURNOVER,
    name: 'Turnover',
    propertyName: 'differenceTurnover'
  },
  {
    id: MEASUREMENT_ID.GROSS_PROFIT,
    name: 'Gross Profit',
    propertyName: 'differenceGrossProfit'
  },
  {
    id: MEASUREMENT_ID.MARGIN,
    name: 'Margin',
    propertyName: 'differenceMargin'
  }
];
