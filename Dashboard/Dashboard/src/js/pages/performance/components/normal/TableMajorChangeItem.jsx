import React from 'react';

const renderHeader = header => {
  return header.map((_, index) => <th key={`table_major_header_${index}`}>{_ + ''}</th>)
}

const renderRows = (data, renderRow) => {
  return data.map((rowData, index) => renderRow(rowData, index));
}

export const TableMajorChangeItem = props => {
  const { header, data, title, renderRow } = props;
  return (
    <div className='table-major'>
      <div className="table-major-title">
        {title}
      </div>
      <table className="table-major-body">
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

export default React.memo(TableMajorChangeItem)
