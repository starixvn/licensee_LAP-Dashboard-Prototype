
import React from 'react';
import { generalService } from '../lib/service';
import { differenceTableTitle } from './constants';
import numberFormat from '../../../lib/numberFormat';
import ValueChangeIcon from '../components/normal/ValueChangeIcon';
import languageApi from '../../../lib/languageApi';
import { rowDataMapper } from './constants';

export const distributionChartDataMapper = (distributionData, topDistributions, displayNameMapper = null) => {
  const labels = distributionData.map(_ => _.name + '  ' + numberFormat.nFormatter(_.total));
  const stackedChartData = topDistributions.map(_ => {
    return {
      name: displayNameMapper ? displayNameMapper(_) : _.displayName,
      dataSet: getDistributionDataSet(distributionData, _.displayId)
    }
  })
  return {
    labels,
    stackedChartData
  }
}

export const overallChartDataMapper = overallData => {
  const labels = overallData.map(_ => _.name);
  const barChartData = [{
    dataSet: overallData.map(_ => _.total)
  }];
  return {
    labels,
    barChartData
  }
}

export const getFilterDataMonthGrowth = ({ analyticData, selectedPeriod, selectedCurrency }) => {
  const filter = generalService.getFilterDataMonthGrowth({ analyticData, selectedPeriod })
  return {
    ...filter,
    ...{ currencies: selectedCurrency.distributions.map(_ => _.name) }
  }
}

const getDistributionDataSet = (data, distributionId) => {
  const dataSet = data.map(__ => {
    const distribution = __.distributions.find(distribution => distribution.id === distributionId);
    return distribution.percent
  })
  return dataSet;
}

 const getDifferenceTableHeader = tabKey => [
  [
    { name: languageApi.getDefaultRes(tabKey), rowSpan: 2 },
    ...[
     { name:  languageApi.getDefaultRes('turnover'), colSpan: 2 },
     { name:  languageApi.getDefaultRes('gross_profit'), colSpan: 2 },
     { name: `${languageApi.getDefaultRes('margin')} %`, rowSpan: 2 },
   ]
 ],
 [
   { name: '%' },
   { name: languageApi.getDefaultRes('value') },
   { name: '%' },
   { name: languageApi.getDefaultRes('value') },
 ]
];

const renderDiffenrenceTableRow = (rowData, index) => <tr key={`table_comparison_row_${index}_${rowData}`}>
  <td><span>{rowData.name}</span></td>
  {rowData.data.map(_ => {
    return <td>
      {_.isPercentUnit ? <div className="m-b-5"><ValueChangeIcon value={_.value} /><span>{_.value + '%'}</span></div> : null}
      {_.isPercentUnit ? null : numberFormat.formatDecimal(_.value)}
    </td>
  })}
</tr>

export const differenceTableDataMapper = (measurementDifferenceData, tabKey, displayNameMapper = null) => {
  const rows = measurementDifferenceData.map(_ => ({
    name: displayNameMapper ? displayNameMapper(_) : _.name,
    data: rowDataMapper.map(__ => __(_))
  }));
  const headers = getDifferenceTableHeader(tabKey);

  return {
    title: differenceTableTitle,
    headers,
    data: rows,
    renderRow: renderDiffenrenceTableRow
  }
}

export const calculateBarWidthOfGrowthChart = numberOfColumn => {
  if(numberOfColumn < 6) {
    return { barPercentage: 0.6, categoryPercentage: 0.5 }
  }
  if(numberOfColumn < 11) {
    return  { barPercentage: 0.7, categoryPercentage: 0.6 }
  }
  return  { barPercentage: 0.9, categoryPercentage: 0.8 }
}
