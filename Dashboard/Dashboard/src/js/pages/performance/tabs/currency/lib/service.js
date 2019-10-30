import { generalService } from '../../../lib/service';
import { diffenrenceTableRowDataConst } from './constants';

export const getDiffenrenceTableData = data => {
  const header = [
    'Difference',
    ...data.map(_ => _.name)
  ];
  const rows = diffenrenceTableRowDataConst.map(_ => ({
    id: _.id,
    name: _.name,
    data: data.map(__ => __[_.propertyName])
  }));

  return {
    title: 'differences between periods',
    header,
    data: rows
  }
}

export const getDistributionChartData = data => {
  const labels = data.map(_ => _.name);
  const currentPeriodDistributions = data[1].distributions;
  const stackedChartData = currentPeriodDistributions.map(_ => {
    return {
      name: _.name,
      dataSet: getDistributionDataSet(data, _.name)
    }
  })
  return {
    labels,
    stackedChartData,
  }
}

export const getOverallChartData = data => {
  const labels = data.map(_ => _.name);
  const barChartData = [{
    dataSet: data.map(_ => _.total)
  }];
  const title = 'Overall Margin Growth';
  return {
    labels,
    barChartData,
    title
  }
}

export const getFilterDataMonthGrowth = ({ analyticData, selectedPeriod, selectedCurrency }) => {
  const filter = generalService.getFilterDataMonthGrowth({ analyticData, selectedPeriod })
  return {
    ...filter,
    ...{ currencies: selectedCurrency.identifies.map(_ => _.name) }
  }
}

const getDistributionDataSet = (data, distributionName) => {
  const dataSet = data.map(__ => {
    const distribution = __.distributions.find(distribution => distribution.name === distributionName);
    return distribution.percent
  })
  return dataSet;
}
