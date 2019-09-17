import createReducer from '../../../../../lib/createReducer'
import * as types from '../actions/types.js'

export const performanceOverviewTopChange = createReducer({}, {
  [types.SET_PERFORMANCE_OVERVIEW_TOP_CHANGE](state, action) {
    return action.data;
  }
});
