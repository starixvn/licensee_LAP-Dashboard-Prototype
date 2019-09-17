import createReducer from '../../../../../lib/createReducer'
import * as types from '../actions/types.js'

export const performanceOverviewTotal = createReducer({}, {
  [types.SET_PERFORMANCE_OVERVIEW_TOTAL](state, action) {
    return action.data;
  }
});
