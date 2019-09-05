import React from 'react';
import TableMajorItem from './TableMajorItem';

export const TableMajorList = props => {
  const { items } = props;

  return (
    <div className='box-info-measure'>
  {items && items.map(_ => <TableMajorItem data={}/>)}
    </div>
  );
}

export default React.memo(TableMajorList);
