import { generalService } from '../../../lib/service';

export const getDiffenrenceTableData = data => {
  return {
    title: 'differences between periods',
    header: ['Difference', 'THB', 'KRW', "USD", 'SGD', 'THB', 'Others'],
    data: [{
      "perspectiveName": "Tablet",
      "total": 128728.23,
      "changePercent": 4428620.25
    }, {
      "perspectiveName": "Tablet",
      "total": 128728.23,
      "changePercent": 4428620.25
    }, {
      "perspectiveName": "Tablet",
      "total": 128728.23,
      "changePercent": 4428620.25
    }]
  }
}

export const getDistributionChartData = data => {
  return {

  }
}

export const getFilterDataMonthGrowth = ({ analyticData, selectedPeriod, selectedCurrency }) => {
  const filter = generalService.getFilterDataMonthGrowth({ analyticData, selectedPeriod })
  return {
    ...filter,
    ...{ currencies: [selectedCurrency] }
  }
}
