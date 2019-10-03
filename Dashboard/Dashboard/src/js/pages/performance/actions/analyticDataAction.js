import * as types from './types';
import { setLoading } from './loadingAction';
import { factoryApi } from '../lib/api';

export const getAnalyticData = (filterData, tabKey) => {
   return async (dispatch) => {
        dispatch(setLoading(true));
        try {

            const data = await factoryApi[tabKey](filterData);
          dispatch(setAnalyticData(data));
          dispatch(setLoading(false));
        } catch(error) {
          console.log('error', error.message)
        }
        console.log('filter', filterData)
    }
}

export const setAnalyticData = data => {
  return {
    type: types.SET_ANALYTIC_DATA,
    data
  };
}
