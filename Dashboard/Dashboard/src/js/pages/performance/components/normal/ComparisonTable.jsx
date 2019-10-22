import React from 'react';

const renderHeader = header => {
  return header.map((_, index) => <th key={`table_comparison_header_${index}`}>{_ + ''}</th>)
}

const renderRows = (data, renderRow) => {
  return data.map((rowData, index) => renderRow(rowData, index));
}

export const ComparisonTable = props => {
  const { header, data, title, renderRow } = props;
  return (
    <div className='table-comparison'>
      <div className="table-comparison-title">
        {title}
      </div>
      <table className="table-comparison-body">
        <thead>
          <tr>{header && renderHeader(header)}</tr>
        </thead>
        <tbody>
          {data && renderRow && renderRows(data, renderRow)}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(ComparisonTable);
