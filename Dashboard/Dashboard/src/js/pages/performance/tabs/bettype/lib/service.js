import React from 'react';
import { diffenceTableHeader } from './constants';
import { differenceTableTitle } from '../../constants';
import numberFormat from '../../../../../lib/numberFormat';
import ValueChangeIcon from '../../../components/normal/ValueChangeIcon';

const rowDataMapper = [
  data => ({
    value: data.differenceTurnover.differenceDistribution,
    isPercentUnit: true
  }),
  data => ({
    value: data.differenceTurnover.differenceTotal,
    isPercentUnit: false
  }),
  data => ({
    value: data.differenceGrossProfit.differenceDistribution,
    isPercentUnit: true
  }),
  data => ({
    value: data.differenceGrossProfit.differenceTotal,
    isPercentUnit: false
  }),
  data => ({
    value: data.differenceMargin.differenceTotal,
    isPercentUnit: true
  })
]

const renderDiffenrenceTableRow = (rowData, index) => <tr key={`table_comparison_row_${index}_${rowData}`}>
  <td><span>{rowData.name}</span></td>
  {rowData.data.map(_ => {
    return <td>
      {_.isPercentUnit ? <div className="m-b-5"><ValueChangeIcon value={_.value} /><span>{_.value + '%'}</span></div> : null}
      {_.isPercentUnit ? null : numberFormat.formatDecimal(_.value)}
    </td>
  })}
</tr>

export const diffenrenceTableDataMapper = measurementDifferenceData => {
  const rows = measurementDifferenceData.map(_ => ({
    name: _.name,
    data: rowDataMapper.map(__ => __(_))
  }));

  return {
    title: differenceTableTitle,
    headers: diffenceTableHeader,
    data: rows,
    renderRow: renderDiffenrenceTableRow
  }
}
