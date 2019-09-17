import * as types from './types';
import { overviewApi } from '../../../../performance/lib/api'

export const getPerformanceOverviewTopChange = filterData => {
    return async (dispatch) => {
        const data = await overviewApi.getTopChange(filterData);
        dispatch(setPerformanceOverviewTopChange(data));
    }
}

export const setPerformanceOverviewTopChange = data => {
    return {
        type: types.SET_PERFORMANCE_OVERVIEW_TOP_CHANGE,
        data
    }
}
