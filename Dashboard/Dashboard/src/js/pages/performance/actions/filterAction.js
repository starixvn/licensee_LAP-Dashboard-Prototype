import * as types from './types';

export const setMeasurement = (newData) =>
{
  return {
    type: types.SET_MEASUREMENT,
    data: newData
  }
}
