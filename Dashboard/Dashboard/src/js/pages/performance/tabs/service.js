
import React from 'react';
import { generalService } from '../lib/service';
import { diffenrenceTableRowDataConst, differenceTableTitle } from './constants';
import numberFormat from '../../../lib/numberFormat';
import ValueChangeIcon from '../components/normal/ValueChangeIcon';
import { MEASUREMENT_ID } from '../lib/constants';
import languageApi from '../../../lib/languageApi';

export const differenceTableDataMapper = (measurementDifferenceData, displayNameMapper = null) => {
  const headers = [[
    { name: languageApi.getDefaultRes('difference') },
    ...measurementDifferenceData.map(_ => ({ name: displayNameMapper ? displayNameMapper(_) : _.name }))
  ]];
  const rows = diffenrenceTableRowDataConst.map(_ => ({
    id: _.id,
    name: _.name,
    data: measurementDifferenceData.map(__ => __[_.propertyName])
  }));

  return {
    title: differenceTableTitle,
    headers,
    data: rows,
    renderRow: renderDiffenrenceTableRow
  }
}

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

const renderDiffenrenceTableRow = (rowData, index) => <tr key={`table_comparison_row_${index}_${rowData}`}>
  <td><span>{rowData.name}</span></td>
  {rowData.data.map(_ => {
    const differenceDistribution = rowData.id === MEASUREMENT_ID.MARGIN ? _.differenceTotal : _.differenceDistribution;
    const differenceTotal = rowData.id === MEASUREMENT_ID.MARGIN ? null : numberFormat.formatDecimal(_.differenceTotal);
    return <td>
      <div className="m-b-5"><ValueChangeIcon value={differenceDistribution} /><span>{differenceDistribution + '%'}</span></div>
      {differenceTotal}
    </td>
  })}
</tr>
