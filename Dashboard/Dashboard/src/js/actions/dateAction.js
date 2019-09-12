import * as types from './types';

export const setDateRange =(newData) =>
{
  return {
    type: types.SET_DATE_RANGE,
    data: newData,
   }
}
