import React from 'react';

const renderHeader = header => {
  return header.map(_ => <th>{_ + ''}</th>)
}

const renderRows = (data, renderRow) => {
  return data.map(rowData => renderRow(rowData));
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
