import { MEASUREMENT_ID } from '../lib/constants';
import languageApi from '../../../lib/languageApi';

export const differenceTableTitle = languageApi.getDefaultRes('difference_table_title');

export const growthChartConsts = [
  {
    periodName: languageApi.getDefaultRes('previous_period'),
    periodFieldName: 'previousPeriodTotal',
    periodField: 'previousPeriod',
    distributionFieldName: 'previousPeriodDistributions'
  },
  {
    periodName: languageApi.getDefaultRes('current_period'),
    periodFieldName: 'currentPeriodTotal',
    periodField: 'currentPeriod',
    distributionFieldName: 'currentPeriodDistributions',
    columnColor: '#36A2EB'
  }
]

export const diffenrenceTableRowDataConst = [
  {
    id: MEASUREMENT_ID.TURNOVER,
    name: languageApi.getDefaultRes('turnover'),
    propertyName: 'differenceTurnover'
  },
  {
    id: MEASUREMENT_ID.GROSS_PROFIT,
    name: languageApi.getDefaultRes('gross_profit'),
    propertyName: 'differenceGrossProfit'
  },
  {
    id: MEASUREMENT_ID.MARGIN,
    name: languageApi.getDefaultRes('margin'),
    propertyName: 'differenceMargin'
  }
];
