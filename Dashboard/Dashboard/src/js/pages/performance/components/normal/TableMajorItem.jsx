import React from 'react';

const renderHeader = header => {
  return header.map(_ => <th>{_}</th>)
}

const renderRows = (data, renderRow) => {
  return rows.map(_ => <tr>{renderRow(_)}</tr>);
}

export const TableMajorItem = props => {
  const { header, data, title, renderRow } = props;

  return (
    <table class->
      <tr>{renderHeader(header)}</tr>
      {renderRows(data, renderRow)}
</table>
  );
}

export default React.memo(TableMajorItem);
