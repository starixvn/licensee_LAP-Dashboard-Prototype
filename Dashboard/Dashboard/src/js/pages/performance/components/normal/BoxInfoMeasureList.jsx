import React from 'react';
import BoxInfoMeasureItem from './BoxInfoMeasureItem';

export const BoxInfoMeasureList = props => {
  const { items } = props;

  return (
    <div className='box-info-measure-list'>
      {items && items.map(_ => <BoxInfoMeasureItem
          key={'box_info_measure_' + _.measurementName}
          measurement={_.measurementName}
          totalValue={_.totalValue}
          changeValue={_.changeValue}
          />)}
    </div>
  );
}

export default React.memo(BoxInfoMeasureList);
