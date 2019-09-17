import * as types from './types';
import { overviewApi } from '../../../../performance/lib/api'

export const getPerformanceOverviewTotal = filterData => {
    return async (dispatch) => {
        const data = await overviewApi.getTotal(filterData);
        dispatch(setPerformanceOverviewTotal(data));
    }
}

export const setPerformanceOverviewTotal = data => {
    return {
        type: types.SET_PERFORMANCE_OVERVIEW_TOTAL,
        data
    }
}
